import React from 'react'
import { Button, Box, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { dataURL } from '../Global'


const DeleteCategoryForm = ({categories, onHandleDeleteCategory}) => {
    const navigate = useNavigate()

    const handleClick = (e) => {        
        fetch(dataURL+'/categories/'+e.target.name, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            onHandleDeleteCategory(data.id)
            navigate('/')
        })
        .catch(err => console.log(err))        
    }

    const deleteCategoryButtons = categories.map(category => <Button variant="outlined" size="large" color="error" key={category.id} name={category.name} onClick={handleClick} > X - {category.name.toUpperCase()}</Button>) 
 
    return (
        <Box  sx={{display: 'block', maxWidth: 600,  ml: 50, mb: 1, mt: 1}}>
            <Stack direction="row" spacing='auto'>
                {deleteCategoryButtons}
            </Stack>   
        </Box>
  )
}

export default DeleteCategoryForm