import React from 'react';
import '../../styles/welcomePage/managerForm.scss'
import {  TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

function ManagerForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [borderError, setBorderError] = React.useState('white')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  interface user {
    name: string,
    description: string,
    email: string,
    password: string,
  }

  const validateEmail = (email: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true 
    } else {
      return false
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      email: '',
      password: '',
    },
    onSubmit: (values: user) => {
      if(!validateEmail(values.email)){
        const id = uuidv4();
        const person = {
          id: id,
          projectName: values.name,
          description: values.description,
          email: values.email,
          password: values.password,
        };
        console.log(person)
      } else {
        setBorderError('red')
      }
    },
  });

  const handleReset = (): void => {
    formik.values.name = ''
    formik.values.description = ''
    formik.values.email = ''
    formik.values.password = ''
  } 

  return (
   <div className='manager__div'>
        <form className='manager__form' onSubmit={formik.handleSubmit}>
          <FormControl color='secondary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }} >
            <OutlinedInput id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Project's name" />
          </FormControl>
          <TextField
          id="outlined-basic 2"
          name='description'
          label="Description"
          variant="outlined"
          color='secondary'
          multiline
          rows={4}
          value={formik.values.description} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          sx={{width: '300px', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}
        />
        <FormControl color='secondary' sx={{ width: '30ch', margin: '10px', backgroundColor:'white', borderRadius:'5px', border: (borderError === 'white') ? 0 :`1px solid ${borderError}` }}>
            <OutlinedInput id='email 1' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={(borderError === 'white') ? 'Email' : 'Invalid Email!'} />
        </FormControl>
        <FormControl color='secondary' sx={{ width: '25ch', margin: '10px',backgroundColor:'white', borderRadius:'5px' }}>
          <OutlinedInput
              // id="outlined-adornment-password"
              id='password 1'
              name='password'
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
              value={formik.values.password} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
        </FormControl>
        <Button type='submit' sx={{width:'120px', margin: '10px'}} onClick={handleReset} color="secondary" variant="contained" size="large">Register</Button>
        </form>
   </div>
  );
}

export default ManagerForm;
