import React from 'react';
import '../../styles/welcomePage/workerForm.scss'
import {  TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function WorkerForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
   <div className='worker__div'>
        <form className='worker__form'>
          <FormControl color='secondary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }}>
            <OutlinedInput placeholder="Project's name" />
          </FormControl>
          <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          color='secondary'
          multiline
          rows={4}
          sx={{width: '300px', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}
        />
        <FormControl color='secondary' sx={{ width: '30ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }}>
            <OutlinedInput placeholder="Email" />
        </FormControl>
        <FormControl color='secondary' sx={{ width: '25ch', margin: '10px',backgroundColor:'white', borderRadius:'5px' }}>
          <OutlinedInput
              // id="outlined-adornment-password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
        </FormControl>
        <Button sx={{width:'120px', margin: '10px'}} color="primary" variant="contained" size="large">Register</Button>
        </form>
   </div>
  );
}

export default WorkerForm;
