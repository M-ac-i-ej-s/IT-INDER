import React, {useState, useEffect} from 'react';
import Tile from './Tile'
import axios from 'axios'
import '../../../styles/mainPage/explorePage.scss'
import authHeader from '../../../services/auth-header';
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import {
  LIKED,
  DISLIKED,
  LOADUSERS,
  SETUSER
} from './exploreSlice';
 
function ExplorePage() {
  const users = useAppSelector(state => state.explore.users);
  const user = useAppSelector(state => state.explore.user);
  const dispatch = useAppDispatch();
  const [matchStyle, setMatchStyle] = useState({left:'-3250px'});
  const [userTile, setUserTile] = useState(users[0]);
  const [render, setRender] = useState(true)

  const getAllUsers = async () => {
    await axios
          .get('http://localhost:3001/users/', {
            headers: authHeader(),
          })
          .then((response) => {
            const users = response.data.Users;
            dispatch(LOADUSERS(users));
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const getUser = async () => {
    await axios
          .get('http://localhost:3001/users/you', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.User;
            dispatch(SETUSER(user));
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(() => {
    getAllUsers();
    getUser();
  },[])

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
      setRender(true)
      setMatchStyle({left:'0px' })
      document.documentElement.style.setProperty('--pointerEvents','auto')
      document.documentElement.style.setProperty('--bodyColor','rgb(0, 0, 0, 0.5)' )
      setTimeout(() => {
        setMatchStyle({left:'3250px' })
        document.documentElement.style.setProperty('--bodyColor','rgb(0, 0, 0, 0)' )
        setTimeout(() => {
          nextFunction()
          document.documentElement.style.setProperty('--pointerEvents','none')
          setRender(false)
          setMatchStyle({ left:'-3250px'})
          setTimeout(() => {
            setRender(true)
          },500)
        },1000)
      },2500)
    } else {
      nextFunction()
    }
  }
// correct version
  const dislikedFun = (id: string): void => {
    /* eslint-disable */
    /* @ts-ignore */
    dispatch(DISLIKED(id));
    /* eslint-enable */
    nextFunction()
  }

  return (
   <div className='center__block'>
      <Tile dislikeFun={dislikedFun} likeFun={likedFun} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''} languages={userTile ? userTile.languages : ['']} id={userTile ? userTile.id : ''}/>
        {render &&
          <div style={matchStyle} className='sign__div'>
            <p className='sign__p its'>IT&apos;S A</p>
            <p className='sign__p match'>MATCH !</p>
          </div>
        }
   </div>
  );
}

export default ExplorePage;
