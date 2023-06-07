import React from 'react'
import Item from './item'
import {Box, List, Grid, Typography} from '@mui/material';

const CategoryList = ({category, onHandleDelete, onHandleEditItem, list}) => {
    const items = list.filter(item => item.category_id === category.id);              
    
    const findColor = () => {
        if (category.name === 'lifestyle') {
         return 'secondary.light'
        } else if (category.name === 'travel') {
          return 'primary.light'
        } else {
          return 'success.light'
        }
    }

    const listItems = items.map(item => <Item key= {item.id} item ={item} onHandleDelete={onHandleDelete} onHandleEditItem={onHandleEditItem}/>)

  return (
    <Box sx={{display: 'flex', flexWrap: 'wrap', maxWidth: 600, backgroundColor: findColor(), ml: 50, mb: 1 }}>
      <Grid >
        <Typography sx={{ ml: 10, mt: 4, mb: 4, color: "background.paper"}} variant="h3" component="div">
          {category.name.toUpperCase()}
        </Typography>
        <List sx={{ ml: 10, mb: 10, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
          {items.length !== 0 ? listItems : <Typography  variant="p" component="div">No Items in this category yet</Typography>}
        </List>        
      </Grid>
    </Box>
  )
}

export default CategoryList