import { LOGIN, LOGOUT } from '../actions/auth';

const initialState = {
    userId: null,
    token: null,
    isAdmin: false,
}

const authReducer = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        case LOGIN:
            return {
                userId: action.userId,
                token: action.token,
                isAdmin: action.isAdmin
            }
        case LOGOUT:
            return initialState;
        default:
            return state
    }
    
}

export default authReducer