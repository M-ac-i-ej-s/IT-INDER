import React, {useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {  TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import { useFormik } from 'formik';
import {
  UPDATE
} from './profileSlice';
import '../../../styles/mainPage/editPage.scss'
import '../../../styles/welcomePage/managerForm.scss'

function EditPage() {
  const user = useAppSelector(state => state.profile.user);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true)
  const [infoHover, setInfoHover] = React.useState('0')
  const [languages, setLanguages] = React.useState(user.languages.map(el => { return {value: el, label: el} }))

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

  const handleMouseOver = () => {
    setInfoHover('0.9');
  };

  const handleMouseOut = () => {
    setInfoHover('0');
  };

  const handleMultiChange = (e) => {
    setLanguages(e)
  }

  const formik = useFormik({
    initialValues: {
      description: user.description,
    },
    onSubmit: (value: {description: string}) => {
      console.log(value.description)
      dispatch(UPDATE(value.description))
    },
  });

  return (
    <div>
      <div className='buttonsGroup__div'>
        <Button variant={show ? 'contained' : 'outlined'} onClick={() => setShow(!show)} color='secondary'>Edit</Button>
        <Button variant={show ? 'outlined' : 'contained'} onClick={() => setShow(!show)} color='secondary'>Preview</Button>
      </div>
      <div style={{display: show ? 'none' : 'block'}} className='tile__block edit'>
        <div>
          <span className='what__span'>Name: </span>
          <span className='name__span'>{user.name}</span>
        </div>
          <span className='what__span'>Description: </span>
          <span className='description__span'>
            {formik.values.description}
          </span>
          <p className='what__span'>languages: </p>
                <span className='description__span'>
                {languages.map(el => {
                        return <span key={el.value}>{el.label}</span>
                })}
          </span>
        </div>
        <div className='edit__box' style={{display: show ? 'block' : 'none'}}>
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
              <CreatableSelect className='lang__select' isMulti options={options} onChange={handleMultiChange} value={languages}/>
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
        </div>
    </div>
  );
}

export default EditPage;
