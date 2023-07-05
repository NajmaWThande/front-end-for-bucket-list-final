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
} from './fetchCrud';

function BucketListPage() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories and items on component mount
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));

    fetchItems()
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  const handleCreateCategory = (category) => {
    createCategory(category)
      .then((data) => {
        setCategories([...categories, data]);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateCategory = (name, category) => {
    updateCategory(name, category)
      .then((data) => {
        const updatedCategories = categories.map((c) =>
          c.name === name ? data : c
        );
        setCategories(updatedCategories);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteCategory = (name) => {
    deleteCategory(name)
      .then(() => {
        const updatedCategories = categories.filter((c) => c.name !== name);
        setCategories(updatedCategories);
      })
      .catch((error) => console.log(error));
  };

  const handleCreateItem = (item) => {
    createItem(item)
      .then((data) => {
        setItems([...items, data]);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateItem = (id, item) => {
    updateItem(id, item)
      .then((data) => {
        const updatedItems = items.map((i) => (i.id === id ? data : i));
        setItems(updatedItems);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        const updatedItems = items.filter((i) => i.id !== id);
        setItems(updatedItems);
      })
      .catch((error) => console.log(error));
  };

  const handleCategoryClick = (name) => {
    fetchCategoryByName(name)
      .then((data) => setSelectedCategory(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Categories</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary mr-2"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      View Items
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteCategory(category.name)}
                    >
                      Delete
                    </button>
                 ```
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const categoryName = e.target.elements.categoryName.value;
                handleCreateCategory({ name: categoryName });
                e.target.reset();
              }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  name="categoryName"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <h2>Items</h2>
          {selectedCategory ? (
            <>
              <h3>{selectedCategory.name}</h3>
              {selectedCategory.items.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCategory.items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-success mr-2"
                            onClick={() =>
                              handleUpdateItem(item.id, {
                                completed: !item.completed,
                              })
                            }
                          >
                            {item.completed ? 'Uncheck' : 'Check'}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No items found.</p>
              )}
              <div className="mt-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const itemName = e.target.elements.itemName.value;
                    handleCreateItem({
                      name: itemName,
                      category_id: selectedCategory.id,
                    });
                    e.target.reset();
                  }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter item name"
                      name="itemName"
                      required
                    />
                    <button type="submit" className="btn btn-primary">
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p>Please select a category to view its items.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BucketListPage;
