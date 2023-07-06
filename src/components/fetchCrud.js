export const getToken = () => {
  const token = sessionStorage.getItem('token');
  return token;
};

const baseUrl = 'http://localhost:3001';

// Fetches all categories and their items

export const fetchUserById = async (id) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};


export const fetchCategories = async () => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Fetches a specific category and its items by category name
export const fetchCategoryByName = async (name) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/categories/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Creates a new category
export const createCategory = async (category) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  const data = await response.json();
  return data;
};

// Updates a category
export const updateCategory = async (name, category) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/categories/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  });
  const data = await response.json();
  return data;
};

// Deletes a category
export const deleteCategory = async (name) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/categories/${name}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Fetches all items
export const fetchItems = async () => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Fetches a specific item by item ID
export const fetchItemById = async (id) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

// Creates a new item
export const createItem = async (item) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

// Updates an item
export const updateItem = async (id, item) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data;
};

// Deletes an item

export const deleteItem = async (id) => {
  const token = getToken();
  const response = await fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};