import React, { useEffect, useState } from 'react';
import {
  fetchCategories,
  fetchCategoryByName,
  fetchItems,
  createCategory,
  updateCategory,
  deleteCategory,
  createItem,
  updateItem,
  deleteItem,
  fetchUserById,
} from './fetchCrud';

function BucketListPage({userId}) {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    console.log(userId)
  
    if (userId) {
      fetchUserById(userId)
        .then((userData) => {
            console.log(userData)
          return Promise.all([
            fetchCategories(),
            fetchItems(),
            fetchCategoryByName(userData.category),
          ]);
        })
        .then(([categoriesData, itemsData, selectedCategoryData]) => {
          setCategories(categoriesData);
          setItems(itemsData);
          setSelectedCategory(selectedCategoryData);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  

  const handleCreateItem = () => {
    const newItem = {
      name: itemName,
      category: itemCategory,
    };

    createItem(newItem)
      .then((data) => {
        setItems([...items, data]);
        setItemName('');
        setItemCategory('');
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateItem = (id, newName) => {
    const updatedItem = {
      name: newName,
    };

    updateItem(id, updatedItem)
      .then((data) => {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, name: data.name } : item
        );
        setItems(updatedItems);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
      })
      .catch((error) => console.log(error));
  };

  const handleCreateCategory = (category) => {
    createCategory(category)
      .then((data) => {
        setCategories([...categories, data]);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateCategory = (name, updatedCategory) => {
    updateCategory(name, updatedCategory)
      .then((data) => {
        const updatedCategories = categories.map((category) =>
          category.name === name ? data : category
        );
        setCategories(updatedCategories);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteCategory = (name) => {
    deleteCategory(name)
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category.name !== name
        );
        setCategories(updatedCategories);
        setSelectedCategory(null);
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryClick = (name) => {
    fetchCategoryByName(name)
      .then((data) => setSelectedCategory(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1>Welcome to your Bucket List!</h1>
      <div className="row">
       {categories.map((category) => (
          <div key={category.id} className="col">
            <h2>{category.name}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((item) => item.categoryId === category.id)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            handleUpdateItem(item.id, {
                              completed: !item.completed,
                            })
                          }
                        >
                          {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="btn btn-success"
              onClick={() =>
                handleCreateItem({ name: '', description: '', categoryId: category.id })
              }
            >
              Add Item
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BucketListPage;
