import React, {useState, useEffect} from 'react';
import '../../../styles/mainPage/tile.scss'
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes, {InferProps} from 'prop-types';
import Loader from '../../reusableComponents/Loader'

function Tile({loading,name, description,languages, likeFun, dislikeFun, id}: InferProps<typeof Tile.propTypes>) {
    const [tileStyle, setTileStyle] = useState({transform:'', left:''})     

  return (
    <div>
        <div style={tileStyle} className='tile__block'>
            {(name !== '' && loading) ? 
            <div>
                <div>
                    <span className='what__span'>Name: </span>
                    <span className='name__span'>{name}</span>
                </div>
                <span className='what__span'>Description: </span>
                <span className='description__span'>
                {description}
                </span>
                <p className='what__span'>languages: </p>
                <span className='description__span'>
                {languages && languages.map(el => {
                        return <span key={el}>{el}</span>
                })}
                </span>
            </div>
            : (loading && name=='') ?
            <span className='error__span'>
                The list ended :&#40;
            </span>
            : 
            <div className='loader__div'>
                <Loader/>
            </div>
        }
        </div>
        <div className='buttons__div'>
            { /* eslint-disable */ }
            {/* @ts-ignore */}
            <IconButton onClick={() => dislikeFun('dislike',id)} onMouseEnter={() => setTileStyle({transform:'rotate(-10deg)', left: '-200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#d93416'}}>
                <ThumbDownIcon sx={{fontSize: '60px'}}/>
            </IconButton>
            {/* @ts-ignore */}
            <IconButton onClick={() => likeFun(id)} onMouseEnter={() => setTileStyle({transform:'rotate(10deg)', left: '200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#3fcc59'}}>
                <FavoriteIcon sx={{fontSize: '60px'}}/>
            </IconButton>
            { /* eslint-enable */ }
        </div>
    </div>
  );
}

Tile.propTypes = {
    loading: PropTypes.bool,
    name: PropTypes.string,
    description: PropTypes.string,
    likeFun: PropTypes.func,
    dislikeFun: PropTypes.func,
    languages: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string
}

export default Tile;
