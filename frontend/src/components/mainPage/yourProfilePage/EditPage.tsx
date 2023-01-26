import React, {useState, useEffect} from 'react';
import CreatableSelect from 'react-select/creatable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {  TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import { useFormik } from 'formik';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import {Link} from 'react-router-dom'
import authHeader from '../../../services/auth-header';
import axios from 'axios'
import {
  SETLANGUAGES,
  SETDESCRIPTION,
  SETNAME
} from './profileSlice';
import '../../../styles/mainPage/editPage.scss'
import '../../../styles/welcomePage/managerForm.scss'
import '../../../styles/mainPage/tile.scss'
import Loader from '../../reusableComponents/Loader';
import Swal from 'sweetalert2'

function EditPage() {
  const languages = useAppSelector(state => state.profile.languages);
  const description = useAppSelector(state => state.profile.description);
  const name = useAppSelector(state => state.profile.name);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true)
  const [infoHover, setInfoHover] = useState('0')
  const [loading, setLoading] = useState(false)

  const getUser = async () => {
    await axios
          .get('https://localhost:3001/users/you', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.User;
            dispatch(SETLANGUAGES(user[0].languages.map(el => {return {value: el, label: el}})))
            dispatch(SETDESCRIPTION(user[0].description))
            formik.values.description = user[0].description
            dispatch(SETNAME(user[0].name))
            setLoading(true)
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(() => {
    getUser()
  },[])

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
    { value: 'go', label: 'GO' }, 
    { value: 'csharp', label: 'C#' },
    { value: 'scala', label: 'Scala' },
]

  const handleMouseOver = () => {
    setInfoHover('0.9');
  };

  const handleMouseOut = () => {
    setInfoHover('0');
  };

  const handleMultiChange = (e) => {
    console.log(e)
    dispatch(SETLANGUAGES(e))
  }

  const edit = async (languages, description) => {
    await axios
          .put(
            'https://localhost:3001/users/edit',
            {
              languages: languages,
              description: description
            },
            {
              headers: {
                ...authHeader(),
                'content-type': 'application/json',
              },              
            }
          )
          .then(() => {
            console.log('user is updated')
            Swal.fire({
              icon: 'success',
              title: 'You updated your profile!',
              showConfirmButton: false,
              timer: 1500
            })
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const labelTovalue = (language) => {
    let label = '';
    options.forEach(el => {
        if(language === el.label){
            label = el.value
        }
    })
    if(label === 'go'){
        return <i className={`devicon-${label}-original-wordmark colored`}></i>
    } else if (label === ''){
        return <QuestionMarkIcon/>
    }
    return <i className={`devicon-${label}-plain colored`}></i>
  }

  const formik = useFormik({
    initialValues: {
      description: description,
    },
    onSubmit: (value) => {
      /* eslint-disable */
     /* @ts-ignore */
      edit(languages.map(el => { return el.label }), value.description)
    },
  });

  return (
    <div>
      <div className='left__background'></div>
      <div className='right__background'></div>
      <div className='buttonsGroup__div'>
        <div className='buttonsGroup_inside__div'>
          <Button className='button__edit' variant={show ? 'contained' : 'outlined'} onClick={() => setShow(!show)} color='secondary'>Edit</Button>
          <Button className='button__edit' variant={show ? 'outlined' : 'contained'} onClick={() => setShow(!show)} color='secondary'>Preview</Button>
        </div>
      </div>
      <div style={{display: show ? 'none' : 'block'}} className='tile__block edit'>
        <div>
            <div className='name__div'>
                        <span className='name__span'>{name}</span>
            </div>
            <div className='description__div'>
              <span className='description__span'>
                {formik.values.description}
              </span>
            </div>
            <div className='languages__div'>
                {languages && languages.map(el => {
                    return (
                        <div key={el.value}>
                            {labelTovalue(el.label)}
                            <span className='language__span'>{el.label}</span>
                        </div>
                        )
                    })}
            </div>
          </div>
        </div>
        <div className='edit__box' style={{display: show ? 'block' : 'none'}}>
          {loading ?
          <form onSubmit={formik.handleSubmit}>
            <div className='description__box'> 
                <TextField
                id="outlined-basic 2"
                name='description'
                label="Description"
                variant="outlined"
                color='secondary'
                multiline
                rows={4}
                inputProps={{ maxLength: 250 }}
                value={formik.values.description} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{width: '300px', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}
              />
              <InfoOutlinedIcon onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} sx={{color: 'purple', opacity: '0.6', position: 'absolute'}}/>
            </div>
            { /* eslint-disable */ }
            <div className='lang__div'>
              {/* @ts-ignore */}
              <CreatableSelect classNamePrefix='mySelect' className='lang__select' isMulti options={options} onChange={handleMultiChange} value={languages} isOptionDisabled={() => languages.length >= 6}/>
            </div>
            { /* eslint-enable */ }
            <div className='popup__box' style={{opacity: infoHover}}>
                  <span>
                    Descriprion is where you will tell about the project.
                    Make sure to mention technologies you will be using, 
                    as well as expectations reagarding your future coworkers
                  </span>
            </div>
            <Button type='submit' className='safe__button' variant='contained' color='secondary'>Safe</Button>
          </form>
          : <Loader/>
        }
        </div>
        <Link className='goBack_edit__button' to='/home/profile'>
          <Fab className='goBack_edit__button' aria-label="settings" sx={{color:'grey'}}>
              <KeyboardReturnIcon/>
          </Fab>
        </Link>
    </div>
  );
}

export default EditPage;
