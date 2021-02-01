import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import authReducer from './AuthReducer'
import axios from 'axios'
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
    const register = async FormData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', FormData, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        } catch (err) {

            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Login User

    // Logout

    // Clear Errors
    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    })

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                clearErrors
            }}>
            { props.children}
        </AuthContext.Provider>
    )
}

export default AuthState