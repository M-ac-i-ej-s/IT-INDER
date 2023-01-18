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
import {setCookie} from '../../../services/cookie-fun'
import Loader from '../../reusableComponents/Loader'
 
function ExplorePage() {
  const matchStyle = useAppSelector(state => state.explore.matchStyle);
  const render = useAppSelector(state => state.explore.render);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState({})
  const [userTile, setUserTile] = useState({});
  const [loading, setLoading] = useState(false)

  const getAllUsers = async () => {
    await axios
          .get('http://localhost:3001/users/', {
            headers: authHeader(),
          })
          .then((response) => {
            const user = response.data.Users;
            setUserTile(user);
            setTileUserActive(user._id);
            setLoading(true)
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
          .catch((error) => {
              console.log(error);
          });
  }

  const firstTime = async () => {
    await axios
          .put('http://localhost:3001/users/firstTime', {
            headers:authHeader(),
          })
          .then(() => {
            console.log('done')
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const like = async (id) => {
    await axios
          .put(
            'http://localhost:3001/users/like',
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
            console.log('action is complete')
            likedFun()
          })
          .catch((error) => {
              console.log(error);
          });
  }

  const dislike = async (action, id) => {
    await axios
          .put(
            'http://localhost:3001/users/dislike',
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
            console.log('action is complete')
            nextFunction()
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
            setUser(user[0]);
            setCookie('id',user[0]._id,7)
          })
          .catch((error) => {
              console.log(error);
          });
  }

  useEffect(() => {
    getAllUsers()
    getUser();
  },[])

  const nextFunction = async () => {
     getAllUsers()
  }

  const likedFun = (): void => {
    /* eslint-disable */
     /* @ts-ignore */
    console.log(userTile.likes)
      /* @ts-ignore */
    console.log(user.likes) 
      /* @ts-ignore */
    if(userTile.likes.includes(user._id)){
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

  return (
   <div className='center__block'>
    { /* eslint-disable */ }
      {/* @ts-ignore */}
      <Tile loading={loading} dislikeFun={dislike} likeFun={like} name={userTile ? userTile.name : ''} description={userTile ? userTile.description : ''} languages={userTile ? userTile.languages : ['']} id={userTile ? userTile._id : ''}/>
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
