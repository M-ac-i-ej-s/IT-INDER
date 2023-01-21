import React, {useState} from 'react';
import '../../../styles/mainPage/tile.scss'
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes, {InferProps} from 'prop-types';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Loader from '../../reusableComponents/Loader'

function Tile({loading,name, description,languages, likeFun, dislikeFun, id, chat}: InferProps<typeof Tile.propTypes>) {
    const [tileStyle, setTileStyle] = useState({transform:'', left:''})     

    const options = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'react', label: 'React' },
        { value: 'angularjs', label: 'Angular' },
        { value: 'vuejs', label: 'Vue' },
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
        { value: 'cplusplus', label: 'C++' },
        { value: 'php', label: 'PHP' },
        { value: 'mysql', label: 'SQL' },
        { value: 'go', label: 'GO' }, // wordmark
        { value: 'csharp', label: 'C#' },
        { value: 'scala', label: 'Scala' },
    ]

    const labelTovalue = (language) => {
        let label;
        options.forEach(el => {
            if(language === el.label){
                label = el.value
            }
        })
        if(label === 'go'){
            return <i className={`devicon-${label}-original-wordmark colored`}></i>
        } else if (label === ''){
            return <QuestionMarkIcon/>
        }
        return <i className={`devicon-${label}-plain colored`}></i>
    }

  return (
    <div className='aboveTile__div'>
        <div style={tileStyle} className={'tile__block' + (chat ? ' chatShow' : '')}>
            {(name !== '' && loading) ? (
            <div>
                <div className='name__div'>
                    <span className='name__span'>{name}</span>
                </div>
                <div className='description__div'>
                    <span className='description__span'>
                    {description}
                    </span>
                </div>
                <div className='languages__div'>
                    {languages && languages.map(el => {
                            return (
                            <div key={el}>
                                {labelTovalue(el)}
                                <span className='language__span'>{el}</span>
                            </div>
                            )
                    })}
                </div>
            </div>
            ): (loading && name=='') ?
            <span className='error__span'>
                You Picked everyone we got! Wait for more users!
            </span>
            : 
            <div className='loader__div'>
                <Loader/>
            </div>
        }
        </div>
        {!chat &&
             <div className='buttons__div'>
             { /* eslint-disable */ }
             {/* @ts-ignore */}
             <IconButton className='icon__button' onClick={() => dislikeFun(id)} onMouseEnter={() => setTileStyle({transform:'rotate(-10deg)', left: '-200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#d93416'}}>
                 <ThumbDownIcon sx={{fontSize: '60px'}}/>
             </IconButton>
             <SyncAltIcon sx={{color:'rgb(94, 62, 121,0.9)',fontSize:'60px' }}/>
             {/* @ts-ignore */}
             <IconButton className='icon__button' onClick={() => likeFun(id)} onMouseEnter={() => setTileStyle({transform:'rotate(10deg)', left: '200px'})} onMouseLeave={() => setTileStyle({transform:'', left: ''})} sx={{color: '#3fcc59'}}>
                 <FavoriteIcon sx={{fontSize: '60px'}}/>
             </IconButton>
             { /* eslint-enable */ }
         </div>
        }
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
    id: PropTypes.string,
    chat:PropTypes.bool,
}

export default Tile;
