import React from 'react'
import {Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

const Homepage = () => {
  return (    
      <Card sx={{display: 'flex', flexWrap: 'wrap', maxWidth: 600, ml: 50, borderColor: "primary.main"}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5"  component="div" >
          “I do believe it’s time for another adventure.”
          </Typography>          
        </CardContent>
        <CardMedia
          component="img"
          height="400"
          image="https://news.microsoft.com/wp-content/uploads/prod/sites/382/2020/10/GettyImages-1166906300.jpg"
          alt="Northern Lights"
        />
      </CardActionArea>
    </Card>    
  )
}

export default Homepage