import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage';
import NewItemForm from './components/NewItemForm';
import NewCategoryForm from './components/NewCategoryForm';
import CategoryList from './components/CategoryList';
import { dataURL } from './Global';
import DeleteCategoryForm from './components/DeleteCategoryForm';

const App = () => {  
  const [list, setList] = React.useState([]);
  const [allCategories, setAllCategories] = React.useState([]);
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = React.useState(false);

  React.useEffect(() => {
    document.title = "Bucket List | Home";
    
    fetch(dataURL)
    .then(res => res.json())
    .then(data => setList(data))
    .catch(err => console.log(err))

    fetch(dataURL+`/categories`)
    .then(res => res.json())
    .then(data => setAllCategories(data))
    .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    let newList = list.filter(item => item.id !== id);
    setList(newList);
  }

  const handleEdit = (updatedItem) => {
    let newList = list.map(item => item.id === updatedItem.id ? updatedItem : item);
    setList(newList);
  }

  const handleAddItem = (newItem) => {
    let newList = [...list, newItem];
    setList(newList);
  }

  const handleAddCategory = (newCategory) => {
    let newAllCategories = [...allCategories, newCategory];
    setAllCategories(newAllCategories);
    setIsAddingCategory(false);
  }

    const handleDeleteCategory = (id) => {
    let newAllCategories = allCategories.filter(category => category.id !== id);
    setAllCategories(newAllCategories);
    setIsDeletingCategory(false)
  }

  const categoryRoutes = allCategories.map(category => <Route key={category.id} path={`/${category.name}`} element={<CategoryList  list={list} category={category} onHandleDelete={handleDelete} onHandleEditItem={handleEdit}/>} />);
  
  return (
    <div className="App">
      <Router>
        <Header 
        categories={allCategories}  
        setIsAddingCategory={setIsAddingCategory} 
        setIsDeletingCategory={setIsDeletingCategory} 
        isDeletingCategory={isDeletingCategory}
        />
        {isAddingCategory ? <NewCategoryForm  categories={allCategories} onHandleAddCategory={handleAddCategory} onSetIsAddingCategory={setIsAddingCategory}/> : null}
        {isDeletingCategory ? <DeleteCategoryForm categories={allCategories} onHandleDeleteCategory={handleDeleteCategory} /> : null}
        <NewItemForm onHandleAddItem={handleAddItem} categories={allCategories}/>
        <Routes>
          <Route path="/" element={<Homepage  />} />
          {categoryRoutes}      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
