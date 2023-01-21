import React, {useContext} from 'react';
import CreatableSelect from 'react-select/creatable';
import '../../styles/welcomePage/workerForm.scss'
import {  TextField, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormik } from 'formik';
import { register } from '../../services/auth.service';
import {useNavigate} from 'react-router-dom'
import authHeader from '../../services/auth-header';

function WorkerForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [borderError, setBorderError] = React.useState('white')
  const [infoHover, setInfoHover] = React.useState('0')
  const [languages, setLanguages] = React.useState([])
  const navigate = useNavigate();

  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'react', label: 'React' },
    { value: 'angularjs', label: 'Angular' },
    { value: 'vuejs', label: 'Vue' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'cplusplus', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'mysql', label: 'SQL' },
    { value: 'go', label: 'GO' }, // wordmark
    { value: 'csharp', label: 'C#' },
    { value: 'scala', label: 'Scala' },
]

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMultiChange = (e) => {
    setLanguages(e)
  }

  interface userProject {
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
    onSubmit: (values: userProject, { setSubmitting }) => {
      if(!validateEmail(values.email)){
        register('programmer',values.name, values.description, languages.map(el => el.label), values.email, values.password)
                .then(() => {
                    navigate('/login');
                    setSubmitting(false);
                    authHeader();
                })
                .catch(() => {
                    setBorderError('red')
                });
      } else {
        setBorderError('red')
      }
      handleReset()
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
   <div className='worker__div'>
        <form onSubmit={formik.handleSubmit} className='worker__form'>
          <FormControl color='primary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }}>
            <OutlinedInput id='name 1' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder="Your name" inputProps={{ maxLength: 10 }} />
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
          { /* eslint-disable */ }
          {/* @ts-ignore */}
          <CreatableSelect classNamePrefix="mySelect" className='lang__select' isMulti options={options} onChange={handleMultiChange} value={languages} isOptionDisabled={() => languages.length >= 6}/>
          { /* eslint-enable */ }
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
          <Button type='submit' sx={{width:'120px', margin: '10px'}} color="primary" variant="contained" size="large">Register</Button>
        </form>
        <div className='popup__box1' style={{opacity: infoHover}}>
              <span>
                Descriprion is where you will tell about yourself.
                Make sure to mention technologies you&#x27;re finding most instresting, 
                as well as expectations reagarding your future project
              </span>
        </div>
   </div>
  );
}

export default WorkerForm;
