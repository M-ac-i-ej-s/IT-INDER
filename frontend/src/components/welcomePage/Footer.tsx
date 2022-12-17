import React from 'react';
import '../../styles/welcomePage/footer.scss'

function Footer() {
  return (
   <div className='footer__div'>
        <img className='ug__img' src={require('../../assets/Logo-UG-nowe.png')} alt="" />
        <div>
            <span>This is a project for 2nd semester of CS at University of Gdansk</span>
            <span>Maciej Słupianek&#174;</span>
        </div>
   </div>
  );
}

export default Footer;
