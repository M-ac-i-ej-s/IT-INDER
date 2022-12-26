import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import '../../../styles/mainPage/editPage.scss'

function EditPage() {
  return (
    <div>
      <div className='buttonsGroup__div'>
        <Button variant='contained' color='secondary'>Edit</Button>
        <Button variant='contained' color='secondary'>Preview</Button>
      </div>
    </div>
  );
}

export default EditPage;
