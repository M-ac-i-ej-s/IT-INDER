import React from 'react';
import CreatableSelect from 'react-select/creatable';
import '../../styles/welcomePage/managerForm.scss'
import {  TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormik } from 'formik';
import { register } from '../../services/auth.service';
import {useNavigate} from 'react-router-dom'
import authHeader from '../../services/auth-header';

function ManagerForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [borderError, setBorderError] = React.useState('white')
  const [infoHover, setInfoHover] = React.useState('0')
  const [languages, setLanguages] = React.useState([])
  const navigate = useNavigate();

  const options = [
    { value: 'javaScript', label: 'javaScript' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'c++', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'sql', label: 'SQL' },
    { value: 'go', label: 'GO' },
    { value: 'c#', label: 'C#' },
    { value: 'scala', label: 'Scala' },
  ]

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMultiChange = (e) => {
    setLanguages(e)
  }

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

  const handleMouseOver = () => {
    setInfoHover('0.9');
  };

  const handleMouseOut = () => {
    setInfoHover('0');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      email: '',
      password: '',
    },
    onSubmit: (values: user, { setSubmitting }) => {
      if(!validateEmail(values.email)){
        register('project',values.name, values.description, languages.map(el => el.label), values.email, values.password)
                .then(() => {
                    navigate('/login');
                    setSubmitting(false);
                    authHeader();
                })
                .catch(() => {
                    setBorderError('red')
                });
        handleReset()
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
    setLanguages([])
  } 

  return (
   <div className='manager__div'>
        <form className='manager__form' onSubmit={formik.handleSubmit}>
          <FormControl color='secondary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }} >
            <OutlinedInput id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Project's name" />
          </FormControl>
          <div className='description__box'> 
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
           <InfoOutlinedIcon onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={{color: 'white', opacity: '0.6'}}/>
          </div>
          { /* eslint-disable */ }
          {/* @ts-ignore */}
          <CreatableSelect className='lang__select' isMulti options={options} onChange={handleMultiChange} value={languages}/>;
          { /* eslint-enable */ }
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
        <Button type='submit' sx={{width:'120px', margin: '10px'}} color="secondary" variant="contained" size="large">Register</Button>
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

export default ManagerForm;
