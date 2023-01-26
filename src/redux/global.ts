import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { globalInitialState } from '../../types';

const INITIAL_STATE:globalInitialState = {
    showChatWindow: false,
    showAddPersonModal: false,
    showFriendProfileModal: false,
    selectedWindow: 'chats',
}

const globalSlice = createSlice({
    name: 'global',
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            return {
                ...state
            }
        },
        openChatWindo: (state, action) => {
            return {
                ...state,
                showChatWindow: action.payload
            }
        },
        setLocation: (state,action) => {
            return {
                ...state,
                selectedWindow: action.payload
            }
        },
        showAddPersonModalWindow: (state,action) => {
            return {
                ...state,
                showAddPersonModal: action.payload
            }
        },
        showFriendProfile: (state,action) => {
            console.log(action);
            
            return {
                ...state,
                showFriendProfileModal: action.payload
            }
        }
    }
})

export const { openChatWindo,setLocation,showAddPersonModalWindow, showFriendProfile } = globalSlice.actions

export default globalSlice.reducer