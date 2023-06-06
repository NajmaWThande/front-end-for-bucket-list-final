import * as React from 'react'
import { dataURL, headers } from '../Global'

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

const Item = ({item, onHandleDelete, onHandleEditItem}) => {
    let markedComplete = item.complete;

    const handleDelete = () => {
        fetch (`${dataURL}/${item.id}`, {
            method: 'DELETE'
        })
        .then(res => red.json())
        .then(data => onHandleDelete(data.id))
        .catch(err => console.log(err))
    }

    
    }
    
    export default Item



