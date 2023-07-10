import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  createItem,
  updateItem,
  deleteItem,
  fetchUserById,
} from './FetchCrud';

function BucketListPage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [completedBy, setCompletedBy] = useState('');
  const [userData, setUserData] = useState('');
  const storedUserId = sessionStorage.getItem('userId');
  const [approachingItems, setApproachingItems] = useState([]);

  useEffect(() => {
    if (storedUserId) {
      fetchCategories()
        .then((categoriesData) => {
          const modifiedCategories = categoriesData.map((category) => ({
            ...category,
            name: category.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
          }));

          setCategories(modifiedCategories);

          return fetchUserById(storedUserId);
        })
        .then((userData) => {
          setUserData(userData);
          const sortedItems = sortItems(userData.items);
          setItems(sortedItems);

          const uniqueCategoryIds = [...new Set(sortedItems.map((item) => item.category_id))];
          const selectedCategoryData = categories.filter((category) =>
            uniqueCategoryIds.includes(category.id)
          );

          setSelectedCategory(selectedCategoryData);
          const today = new Date();
          const approachingItems = sortedItems.filter((item) => {
            const completedAtDate = new Date(item.completed_at);
            const timeDiff = completedAtDate.getTime() - today.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff <= 7; 
          });
          setApproachingItems(approachingItems);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const sortItems = (items) => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if (a.completed && !b.completed) {
        return -1; // a comes before b
      } else if (!a.completed && b.completed) {
        return 1; // b comes before a
      }
      return 0; // no change in order
    });
    return sortedItems;
  };

  const handleCreateItem = () => {
    const newItem = {
      name: itemName,
      category_id: itemCategory,
      user_id: storedUserId,
      completed: false,
      completed_by: completedBy,
    };
    createItem(newItem)
      .then((data) => {
        setItems([...items, data]);
        setItemName('');
        setItemCategory('');
        setCompletedBy('');
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateItem = (id, completed) => {
    const updatedItem = {
      completed: !completed,
    };

    updateItem(id, updatedItem)
      .then((data) => {
        fetchUserById(storedUserId)
          .then((userData) => {
            const sortedItems = sortItems(userData.items);
            setItems(sortedItems);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        fetchUserById(storedUserId)
          .then((userData) => {
            const sortedItems = sortItems(userData.items);
            setItems(sortedItems);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryClick = (categoryId) => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    const filteredItems = items.filter((item) => item.category_id === categoryId);
    setSelectedCategory({ ...selectedCategory, items: filteredItems });
  };

  const calculateCountdown = (completedAt) => {
    const today = new Date();
    const completedAtDate = new Date(completedAt);
    const timeDiff = completedAtDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? `${daysDiff} days left` : 'Completed';
  };
  return (
    <div className="container">
      <h1>Welcome to your Bucket List!</h1>
      <div className="row">
        <div className="col-3">
          <h3>Categories</h3>
          <ul className="list-group">
            {categories.map((category) => (
              <h4
                key={category.id}
                className={`list-group-item-success ${
                  selectedCategory && selectedCategory.id === category.id ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </h4>
            ))}
          </ul>
        </div>
        <div className="col-9">
          {selectedCategory && (
            <div>
              <h2>{selectedCategory.name}</h2>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Completed By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!selectedCategory || !selectedCategory.items ? (
                    items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.completed_by}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-primary mr-2"
                              onClick={() => handleUpdateItem(item.id, item.completed)}
                            >
                              {item.completed ? 'Incomplete' : 'Complete'}
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    selectedCategory.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.completed_by}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              className="btn btn-primary mr-2"
                              onClick={() => handleUpdateItem(item.id, item.completed)}
                            >
                              {item.completed ? 'Incomplete' : 'Complete'}
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {approachingItems.map((item) => (
      <div key={item.id}>
        <p>{item.name}</p>
        <p>Countdown: {calculateCountdown(item.completed_at)}</p>
      </div>
    ))}
              <div>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Completed By"
                  value={completedBy}
                  onChange={(e) => setCompletedBy(e.target.value)}
                />
                <select
                  className="form-select"
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary" onClick={handleCreateItem}>
                  Add Item
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BucketListPage;