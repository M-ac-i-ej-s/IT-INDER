import React, {useState} from 'react';
import Tile from './Tile'
import '../../../styles/mainPage/explorePage.scss'
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import {
  LIKED,
  DISLIKED
} from './exploreSlice';

function ExplorePage() {
  const users = useAppSelector(state => state.explore.users)
  const user = useAppSelector(state => state.explore.user)
  const [userTile, setUserTile] = useState(users[0])

  const nextFunction = (): void => {
    if(userTile === undefined){
      return 
    }
    const index = users.indexOf(userTile)
    setUserTile(users[index+1])
  }

  return (
   <div className='center__block'>
    <Tile nextFun={nextFunction} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''}/>
   </div>
  );
}

export default ExplorePage;
