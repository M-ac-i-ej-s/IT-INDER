import React from 'react';
import '../../styles/welcomePage/managerDescription.scss'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function ManagerDescription() {

  const arrayOfQuotes: string[] = [
    'Create your project now!', 
    'Assemble your team of dreams!', 
    'Look for the best coders!', 
    'Make your dream website come to life!', 
    'Never your game was closer to be finished!'
  ]
  return (

   <div className='manager_description__div'>
        {arrayOfQuotes.map((el: string, index: number) => {
            return (
            <div className='quote__item' key={index}>
                <DoneOutlineIcon color='secondary' fontSize='large'/>
                <span style={{fontSize:'35px', padding:'10px 0 10px 10px'}}>{el}</span>
            </div>)
        })}
   </div>
  );
}

export default ManagerDescription;
