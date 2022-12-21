import React from 'react';
import '../../styles/loginPage/loginForm.scss'
import { FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import {Link} from 'react-router-dom'

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [borderError, setBorderError] = React.useState('white')

  interface user {
    email: string,
    password: string,
  } 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validateEmail = (email: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return true 
    } else {
      return false
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values: user) => {
      if(!validateEmail(values.email)){
        console.log(values.email)
      } else {
        handleReset()
        setBorderError('red')
      }
    },
  });

  const handleReset = (): void => {
    formik.values.email = ''
    formik.values.password = ''
  } 

  return (
   <div>
        <form className='form__login' onSubmit={formik.handleSubmit} action="">
            <FormControl color='secondary' sx={{ width: '30ch', margin: '10px', backgroundColor:'white', borderRadius:'5px', border: (borderError === 'white') ? 0 :`1px solid ${borderError}` }}>
                <OutlinedInput id='email 1' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder={(borderError === 'white') ? 'Email' : 'Invalid Email or password!'} />
            </FormControl>
            <FormControl color='secondary' sx={{ width: '25ch', margin: '10px',backgroundColor:'white', borderRadius:'5px' }}>
                <OutlinedInput
                id='password 2'
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
                />
            </FormControl>
            <Link className='link__login' to='/home/explore'>
              <Button sx={{width: '100px' , margin: '10px', textDecoration: 'none'}} type='submit' color="secondary" variant="contained" size="large">Log in</Button>
            </Link>
        </form>
   </div>
  );
}

export default LoginForm;
