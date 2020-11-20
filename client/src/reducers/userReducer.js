
const { REGISTER, LOGIN, ERROR_LOGIN, LOGOUT, CLEAR_ERROR } = require('./types')

const initState = {
    token: null,
    user: null,
    isAuthenticated: false,
    error: ""
}


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER:
            return { ...state, isAuthenticated: true, token: action.token, user: action.payload, error: '' }
        case LOGIN:
            return { ...state, isAuthenticated: true, token: action.payload.token, user: action.payload.user, error: '' }
        case LOGOUT:
            return { ...state, isAuthenticated: false, token: null, user: null, error: '' }
        case ERROR_LOGIN:
            return { ...state, error: action.payload }
        case CLEAR_ERROR:
            return { ...state, error: '' }
        default:
            return state;
    }
}

export default userReducer;