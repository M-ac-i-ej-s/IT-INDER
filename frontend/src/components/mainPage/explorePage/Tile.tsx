import React, {useState} from 'react';
import '../../../styles/mainPage/tile.scss'
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes, {InferProps} from 'prop-types';

function Tile({name, description, nextFun}: InferProps<typeof Tile.propTypes>) {
    const [tileStyle, setTileStyle] = useState({transform:'', left:''})     

  return (
    <div>
        <div style={tileStyle} className='tile__block'>
            {name !== '' ? 
            <div>
                <div>
                    <span className='what__span'>Name: </span>
                    <span className='name__span'>{name}</span>
                </div>
                <span className='what__span'>Description: </span>
                <span className='description__span'>
                {description}
                </span>
            </div>
            : 
            <span className='error__span'>
                The list ended :&#40;
            </span>
        }
        </div>
        <div className='buttons__div'>
            { /* eslint-disable */ }
            {/* @ts-ignore */}
            <IconButton onClick={nextFun} onMouseEnter={() => setTileStyle({transform:'rotate(-10deg)', left: '-200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#d93416'}}>
                <ThumbDownIcon sx={{fontSize: '60px'}}/>
            </IconButton>
            {/* @ts-ignore */}
            <IconButton onClick={nextFun} onMouseEnter={() => setTileStyle({transform:'rotate(10deg)', left: '200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#3fcc59'}}>
                <FavoriteIcon sx={{fontSize: '60px'}}/>
            </IconButton>
            { /* eslint-enable */ }
        </div>
    </div>
  );
}

Tile.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    nextFun: PropTypes.func
}

export default Tile;
