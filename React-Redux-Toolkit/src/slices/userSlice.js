import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    users: [],
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
             state.users =  state.users.filter((user, index) => index != action.payload) 
        }
    }
});

export const { setUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer;
