import React from 'react';
import '../../styles/welcomePage/workerDescription.scss'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function WorkerDescription() {

  const arrayOfQuotes: string[] = ['Create project with someone now!', 'Create project with someone now!', 'Create project with someone now!', 'Create project with someone now!', 'Create project with someone now!']
  return (

   <div className='worker_description__div'>
        {arrayOfQuotes.map((el: string, index: number) => {
            return (
            <div className='quote__item' key={index}>
                <span style={{fontSize:'35px', padding:'10px 10px 10px 0'}}>{el}</span>
                <DoneOutlineIcon color='primary' fontSize='large'/>
            </div>)
        })}
   </div>
  );
}

export default WorkerDescription;
