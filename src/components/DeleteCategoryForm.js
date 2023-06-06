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