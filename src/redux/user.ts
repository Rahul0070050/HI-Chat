import { createSlice } from '@reduxjs/toolkit'
import { userInfo } from '../../types';

const INITIAL_STATE: userInfo = {
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    uid: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;