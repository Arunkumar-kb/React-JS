import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUsers } from './slices/userSlice';

const Home = () => {
    const [formInput, setFormInput] = useState({
        name: '',
        age: '',
        email: '',
        mobile: '',
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prev) => { return {...prev,[name]:value} })
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        dispatch(setUsers(formInput));
        setFormInput({
            name: '',
            age: '',
            email: '',
            mobile: '',
        });
    }

    return (
        <div className='container'>
            <h2>user form</h2>
            <form onSubmit={handleSubmit}>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name='name' value={formInput.name} onChange={handleChange} />
                </div>
                <div className='field'>
                    <label>Age</label>
                    <input type="number" name='age' value={formInput.age} onChange={handleChange} />
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type="text" name='email' value={formInput.email} onChange={handleChange} />
                </div>
                <div className='field'>
                    <label>Mobile</label>
                    <input type="number" name='mobile' value={formInput.mobile} onChange={handleChange} />
                </div>
                <div className="field">
                    <button type='submit'>submit</button>
                </div>
            </form>
        </div>
    )
}

export default Home
