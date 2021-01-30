import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import authReducer from './AuthReducer'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)


    // Load user

    // Register User

    // Login User

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
            }}>
            { props.children}
        </AuthContext.Provider>
    )
}

export default AuthState