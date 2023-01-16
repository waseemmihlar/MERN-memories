import React from 'react'
import {TextField,Grid,InputAdornment,IconButton} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function input({name,half,handlechange,label,autofocus,type,handleshowPassword}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
        name={name}
        onChange={handlechange}
        required
        fullWidth
        variant='outlined'
        label={label}
        autoFocus={autofocus}
        type={type}
        InputProps={name==='password'? {
            endAdornment:(
                <InputAdornment position='end'>
                    <IconButton onClick={handleshowPassword}>
                        {type==='password'?<Visibility />:<VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            )
        }:null}
        />

    </Grid>
   
  )
}

export default input
