mport React from 'react'
import { dataURL, headers } from '../Global'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const SubmitButton = styled(Button)({
  backgroundColor: 'paper',
  color: 'white',
  fontSize: '1.5rem',
  border: '1px solid white',
  height: 56,
  width: 100,
})