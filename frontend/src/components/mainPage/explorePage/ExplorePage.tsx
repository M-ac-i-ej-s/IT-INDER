import React, {useState, useEffect} from 'react';
import Tile from './Tile'
import axios from 'axios'
import '../../../styles/mainPage/explorePage.scss'
import authHeader from '../../../services/auth-header';
import { useAppSelector, useAppDispatch } from '../mainPageApp/hooks'
import {
  SETLEFT,
  SETRENDER
} from './exploreSlice';
 
function ExplorePage() {
  const matchStyle = useAppSelector(state => state.explore.matchStyle);
  const render = useAppSelector(state => state.explore.render);
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userTile, setUserTile] = useState({});

  const getAllUsers = async () => {
    await axios
          .get('http://localhost:3001/users/', {
            headers: authHeader(),
          })
          .then((response) => {
            const users = response.data.Users;
            setUsers(users);
            setUserTile(users[0]);
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
            setUser(user);
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
    // dispatch(LIKED(id));
     /* @ts-ignore */
    if(userTile.likes.includes(user.id)){
      /* eslint-enable */
      dispatch(SETRENDER(true))
      dispatch(SETLEFT('0px'))
      document.documentElement.style.setProperty('--pointerEvents','auto')
      document.documentElement.style.setProperty('--bodyColor','rgb(0, 0, 0, 0.5)' )
      setTimeout(() => {
        dispatch(SETLEFT('3250px'))
        document.documentElement.style.setProperty('--bodyColor','rgb(0, 0, 0, 0)' )
        setTimeout(() => {
          nextFunction()
          document.documentElement.style.setProperty('--pointerEvents','none')
          dispatch(SETRENDER(false))
          dispatch(SETLEFT('-3250px'))
          setTimeout(() => {
            dispatch(SETRENDER(true))
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
    // dispatch(DISLIKED(id));
    /* eslint-enable */
    nextFunction()
  }

  return (
   <div className='center__block'>
    { /* eslint-disable */ }
    {/* @ts-ignore */}
      <Tile dislikeFun={dislikedFun} likeFun={likedFun} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''} languages={userTile ? userTile.languages : ['']} id={userTile ? userTile.id : ''}/>
      { /* eslint-enable */ }
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
