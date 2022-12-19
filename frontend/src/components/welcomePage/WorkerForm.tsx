import React from 'react';
import '../../styles/welcomePage/workerForm.scss'
import {  TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

function WorkerForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [borderError, setBorderError] = React.useState('white')
  const [infoHover, setInfoHover] = React.useState('0')

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  interface userProject {
    projectName: string, 
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

  const handleMouseOver = () => {
    setInfoHover('0.9');
  };

  const handleMouseOut = () => {
    setInfoHover('0');
  };

  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      email: '',
      password: '',
    },
    onSubmit: (values: userProject) => {
      if(!validateEmail(values.email)){
        const id = uuidv4();
        const person = {
          id: id,
          projectName: values.projectName,
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
    formik.values.projectName = ''
    formik.values.description = ''
    formik.values.email = ''
    formik.values.password = ''
  } 

  return (
   <div className='worker__div'>
        <form onSubmit={formik.handleSubmit} className='worker__form'>
          <FormControl color='primary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }}>
            <OutlinedInput id='projectName' name='projectName' value={formik.values.projectName} onChange={formik.handleChange} placeholder="Your name" />
          </FormControl>
          <div className='description__box'>
              <TextField
              id="outlined-basic 1"
              name='description'
              label="Description"
              variant="outlined"
              color='primary'
              multiline
              rows={4}
              sx={{width: '300px', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}
              value={formik.values.description} 
              onChange={formik.handleChange}
              />
              <InfoOutlinedIcon onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={{color: 'white', opacity: '0.6'}}/>
          </div>
        <FormControl color='primary' sx={{ width: '30ch', margin: '10px', backgroundColor:'white', borderRadius:'5px',border: (borderError === 'white') ? 0 :`1px solid ${borderError}` }}>
            <OutlinedInput id='email 2' name='email' value={formik.values.email} onChange={formik.handleChange} placeholder={(borderError === 'white') ? 'Email' : 'Invalid Email!'} />
        </FormControl>
        <FormControl color='primary' sx={{ width: '25ch', margin: '10px',backgroundColor:'white', borderRadius:'5px' }}>
          <OutlinedInput
              // id="outlined-adornment-password"
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
        <Button type='submit' onClick={handleReset} sx={{width:'120px', margin: '10px'}} color="primary" variant="contained" size="large">Register</Button>
        </form>
        <div className='popup__box' style={{opacity: infoHover}}>
              <span>
                Descriprion is where you will tell about the project.
                Make sure to mention technologies you will be using, 
                as well as expectations reagarding your future coworkers
              </span>
        </div>
   </div>
  );
}

export default WorkerForm;