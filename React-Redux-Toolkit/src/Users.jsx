import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from './slices/userSlice';

const Users = () => {
  const users = useSelector((state) => state.userInfo.users);
  const dispatch = useDispatch();
  console.log(users)
  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  }
  return (
    <div className='container'>
      <h2>Users</h2>
      {
        users?.map((user, index) => (
          <div className='user-detail' key={index}>
            <h5>{user.name}</h5>
            <p>{user.age}</p>
            <p>{user.email}</p>
            <p>{user.mobile}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))
      }

    </div>
  )
}

export default Users
