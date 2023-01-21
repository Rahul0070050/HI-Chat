import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    userInfo: {}
}
const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = {}
        }
    }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer;