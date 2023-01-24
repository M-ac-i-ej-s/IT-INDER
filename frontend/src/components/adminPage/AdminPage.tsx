import React, {useState, useEffect} from 'react'
import {  TextField, FormControl, OutlinedInput, Button,MenuItem,Select,InputLabel } from '@mui/material';
import authHeader from '../../services/auth-header';
import axios from 'axios'
import Loader from '../reusableComponents/Loader';
import Swal from 'sweetalert2'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import '../../styles/adminPage/adminPage.scss'

function AdminPage() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('')
    const [access, setAccess] = useState(false)

    const getAllUsersByPattern = async (name, description, email, type) => {
        await axios
                .get(`http://localhost:3001/users/searchByPattern?name=${name}&description=${description}&email=${email}&type=${type}`, {
                    headers: authHeader(),
                })
              .then((response) => {
                const users = response.data.Users;
                console.log(users)
                setUsers(users.filter(el => el.type !== 'admin'))
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
                if(user[0].type === 'admin'){
                    setAccess(true)
                    setLoading(true)
                }
              })
              .catch((error) => {
                  console.log(error);
              });
      }

    const banUser = async (id) => {
        await axios
            .delete(
                `http://localhost:3001/users/ban?id=${id}`,
                {
                  headers: authHeader(),             
                }
            )
            .then((response) => {
                getAllUsersByPattern(name, description, email, type)
                console.log('user is banned')
            })
            .catch((error) => {
                  console.log(error);
            });     
    }

    const handleBanUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Banned!',
                'User has been banned!',
                'success'
              )
              banUser(id)
            }
          })
    }

    useEffect(() => {
        getUser() 
    })

    useEffect(() => {
        getAllUsersByPattern(name, description, email, type)
    },[name, email, description, type])

  return (
    <>
    { access ? 
        <>
        <div className='top_admin__div'>
            <span>ADMIN PANEL</span>
            <LocalPoliceIcon color='secondary' sx={{fontSize:'100px'}}/>
        </div>
        <div className='admin__div'>
            <div className='search__div'>
                <FormControl fullWidth sx={{width:'200px', marginLeft:'10px'}}>
                <InputLabel id="demo-simple-select-label" color='secondary'>Type</InputLabel>
                    <Select
                        color='secondary'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value={'any'}>Any</MenuItem>
                        <MenuItem value={'programmer'}>Programmer</MenuItem>
                        <MenuItem value={'project'}>Project</MenuItem>
                    </Select>
                </FormControl>
                <FormControl color='secondary' sx={{ width: '25ch', margin: '10px', backgroundColor:'white', borderRadius:'5px' }} >
                    <OutlinedInput id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Project's name" />
                </FormControl>
                <div> 
                    <TextField
                    id="outlined-basic 2"
                    name='description'
                    label="Description"
                    variant="outlined"
                    color='secondary'
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 250 }}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                
                    sx={{width: '300px', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}
                />
                </div>
                <FormControl color='secondary' sx={{ width: '30ch', margin: '10px', backgroundColor:'white', borderRadius:'5px'}}>
                    <OutlinedInput id='email 1' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                </FormControl>
            </div>
            <div className='users_display__div'>
                {loading ? users.map(el => {
                    return (
                    <div key={el._id}>
                        <div className='user_display__div'>
                            <div className='rubric__div'>
                                <span className='type__span'>type:</span>
                                <span className='result__span'>{el.type}</span>
                            </div>
                            <div className='rubric__div'>
                                <span className='type__span'>name:</span>
                                <span className='result__span'>{el.name}</span>
                            </div>
                            <div className='rubric__div'>
                                <span className='type__span'>description:</span>
                                <span className='result__span'>{el.description}</span>
                            </div>
                            <div className='rubric__div'>
                                <span className='type__span'>languages:</span>
                                <span className='result__span'>{el.languages.map(el => {
                                    return <span key={el}>{el}</span>
                                })}</span>
                            </div>
                            <div className='rubric__div'>
                                <span className='type__span'>email:</span>
                                <span className='result__span'>{el.email}</span>
                            </div>
                            <Button onClick={() => handleBanUser(el._id)} variant='contained' color='error' sx={{width:'320px', marginTop:'20px'}}>Ban</Button>
                        </div>
                    </div>)
                }) : (
                    <Loader/>
                )}
            </div>
        </div>
        </>    
    : 
    <div className='top_admin__div error'>
        <span className='access__span'>You dont have acces to admin panel</span>
        <LocalPoliceIcon color='error' sx={{fontSize:'60px'}}/>
    </div>
    }
    </>
  )
}

export default AdminPage;
