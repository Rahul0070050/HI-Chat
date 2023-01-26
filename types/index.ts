export type userInfo = {
    displayName: string,
    email: string,
    phoneNumber: string,
    photoURL: string,
    uid: string,
}

export type globalInitialState = {
    showChatWindow: Boolean,
    selectedWindow: string,
    showAddPersonModal: Boolean,
    showFriendProfileModal: Boolean,
    Loading?: Boolean
}

export type reduxGlobal = {
    global: globalInitialState,
    user: userInfo
}

export interface check_friend_or_not {
    from?: string,
    status?: string,
}
export interface request_checker {
    from?: string,
    status?: string,
}
export interface searchProfile extends request_checker,check_friend_or_not {
    about?: string,
    displayName?: string,
    email?: string,
    friends?: number,
    from?: string,
    mobile?: string,
    status?: string,
    photoURL?: string,
    requested?: boolean,
    friend?: boolean
}