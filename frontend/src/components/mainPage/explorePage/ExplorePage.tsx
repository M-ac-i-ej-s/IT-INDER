import React, {useState} from 'react';
import Tile from './Tile'
import '../../../styles/mainPage/explorePage.scss'
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import {
  LIKED,
  DISLIKED
} from './exploreSlice';

function ExplorePage() {
  const users = useAppSelector(state => state.explore.users);
  const user = useAppSelector(state => state.explore.user);
  const dispatch = useAppDispatch();
  const [opacity, setOpacity] = useState(0);
  const [userTile, setUserTile] = useState(users[0]);

  const nextFunction = (): void => {
    if(userTile === undefined){
      return 
    }
    const index = users.indexOf(userTile)
    setUserTile(users[index+1])
  }

  const likedFun = (id: string): void => {
    /* eslint-disable */
    /* @ts-ignore */
    dispatch(LIKED(id));
    /* eslint-enable */
    if(userTile.likes.includes(user.id)){
      setOpacity(1)
      setTimeout(() => {
        setOpacity(0)
      },750)
    }
    nextFunction()
  }

  const dislikedFun = (id: string): void => {
    /* eslint-disable */
    /* @ts-ignore */
    dispatch(DISLIKED(id));
    /* eslint-enable */
    nextFunction()
  }

  return (
   <div className='center__block'>
      <Tile dislikeFun={dislikedFun} likeFun={likedFun} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''} id={userTile ? userTile.id : ''}/>
      <span style={{opacity: opacity}} className='sign__span'>IT&apos;S A MATCH !</span>
   </div>
  );
}

export default ExplorePage;
