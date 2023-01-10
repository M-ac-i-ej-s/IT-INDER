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
  const [matchStyle, setMatchStyle] = useState({left:'-2250px'});
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
      setMatchStyle({left:'0px' })
      document.documentElement.style.setProperty('--bodyColor','rgb(0, 0, 0, 0.3)' )
      setTimeout(() => {
        setMatchStyle({left:'2250px' })
        document.documentElement.style.setProperty('--bodyColor','#fdfcfc' )
        setTimeout(() => {
          setMatchStyle({ left:'-2250px'})
        }, 2000)
      },2500)
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
      <div style={matchStyle} className='sign__div'>
        <p  className='sign__p its'>IT&apos;S A</p>
        <p  className='sign__p match'>MATCH !</p>
      </div>
   </div>
  );
}

export default ExplorePage;
