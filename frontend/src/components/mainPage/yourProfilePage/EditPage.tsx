import React, {useState} from 'react';
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

  const handleMouseOver = () => {
    setInfoHover('0.9');
  };

  const handleMouseOut = () => {
    setInfoHover('0');
  };

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
