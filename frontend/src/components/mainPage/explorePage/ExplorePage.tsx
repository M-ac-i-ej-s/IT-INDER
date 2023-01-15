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
  const [user, setUser] = useState({})
  const [userTile, setUserTile] = useState({});

  const getAllUsers = async () => {
    await axios
          .get('http://localhost:3001/users/', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.Users;
            setUserTile(user);
            setTileUserActive(user._id)
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const setTileUserActive = async (id) => {
    await axios
          .put('http://localhost:3001/users/active', 
          {
            id: id
          },
          {
            headers: {
              ...authHeader(),
              'content-type': 'application/json',
            },              
          }
          )
          .then((response) => {
            console.log(id)
            console.log('is setted correctly')
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const likeOrDislike = async (action, id) => {
    await axios
          .put(
            'http://localhost:3001/users/decision',
            {
              action: action,
              id: id
            },
            {
              headers: {
                ...authHeader(),
                'content-type': 'application/json',
              },              
            }
          )
          .then((response) => {
            console.log('action is complete')
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
            console.log(user)
            setUser(user);
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(() => {
    /* eslint-disable */
     /* @ts-ignore */
    getAllUsers()
    /* eslint-enable */
    getUser();
  },[])

  const nextFunction = async () => {
    /* eslint-disable */
     /* @ts-ignore */
     getAllUsers()
     /* eslint-enable */
  }

  const likedFun = (id: string): void => {
    /* eslint-disable */
    /* @ts-ignore */
    likeOrDislike('like', id)
     /* @ts-ignore */
    if(userTile.likes.includes(user._id)){
      /* @ts-ignore */
      likeOrDislike('match', id)
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
    likeOrDislike('dislike', id).then(() => nextFunction())
    /* eslint-enable */
  }

  return (
   <div className='center__block'>
    { /* eslint-disable */ }
    {/* @ts-ignore */}
      <Tile dislikeFun={dislikedFun} likeFun={likedFun} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''} languages={userTile ? userTile.languages : ['']} id={userTile ? userTile._id : ''}/>
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
