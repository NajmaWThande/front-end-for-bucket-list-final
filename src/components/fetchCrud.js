// Fetches all categories and their items
export const fetchCategories = async () => {
    const response = await fetch('/categories');
    const data = await response.json();
    return data;
  };
  
  // Fetches a specific category and its items by category name
  export const fetchCategoryByName = async (name) => {
    const response = await fetch(`/categories/${name}`);
    const data = await response.json();
    return data;
  };
  
  // Creates a new category
  export const createCategory = async (category) => {
    const response = await fetch('/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  };
  
  // Updates a category
  export const updateCategory = async (name, category) => {
    const response = await fetch(`/categories/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  };
  
  // Deletes a category
  export const deleteCategory = async (name) => {
    const response = await fetch(`/categories/${name}`, {
      method: 'DELETE',
    });
    return response;
  };
  
  // Fetches all items
  export const fetchItems = async () => {
    const response = await fetch('/items');
    const data = await response.json();
    return data;
  };
  
  // Fetches a specific item by item ID
  export const fetchItemById = async (id) => {
    const response = await fetch(`/items/${id}`);
    const data = await response.json();
    return data;
  };
  
  // Creates a new item
  export const createItem = async (item) => {
    const response = await fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
  };
  
  // Updates an item
  export const updateItem = async (id, item) => {
    const response = await fetch(`/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    return data;
  };
  
  // Deletes an item
  export const deleteItem = async (id) => {
    const response = await fetch(`/items/${id}`, {
      method: 'DELETE',
    });
    return response;
  };