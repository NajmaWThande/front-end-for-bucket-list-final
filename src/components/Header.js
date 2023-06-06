import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Box, Button, Stack } from '@mui/material'
const Header = ({categories, setIsAddingCategory, setIsDeletingCategory, isDeletingCategory}) => {
    const navigate = useNavigate();
    
    const handleClickNavigate = (e) => {
        if (e.target.name === 'home'){
            navigate('/')
            document.title = "Bucket List | Home";
        } else{
            navigate(`/${e.target.name}`)
            document.title = `Bucket List | ${e.target.name}`
        }
    }
    const handleClickAdd = () => {
        setIsAddingCategory(true)
    }

    const handleClickDelete=()=>{
        setIsDeletingCategory(!isDeletingCategory)
    }
  
    const categoryButtons = categories.map(category => <Button variant="contained" size="large" key={category.id} name={category.name} onClick={handleClickNavigate} >{category.name.toUpperCase()}</Button>) 
    
    return (
        <Box  sx={{display: 'block', maxWidth: 600,  ml: 50, mb: 1, mt: 1}}>
            <Stack direction="row" spacing='auto'>
                <Button variant="contained" size="large" name="home" onClick={handleClickNavigate} >Home</Button>
                {categoryButtons}
                <Button variant="outlined" size="small" name="add" onClick={handleClickAdd} >+</Button>
            </Stack>
                <Button variant="text" size="large" color="error" name="delete" onClick={handleClickDelete}>
                    {isDeletingCategory ? "No-No Cancel!" : "Want to remove a category from the list? Click here!"}
                </Button>
        </Box>
    )
}

export default Header;