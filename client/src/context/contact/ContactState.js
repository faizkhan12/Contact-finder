import React, { useReducer } from 'react'
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import axios from 'axios'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    CONTACT_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null

    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contact', contact, config)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
    }

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id })

    }

    // set current Contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })

    }

    // clear current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })

    }
    // update contact
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })

    }
    // filter contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text })

    }

    // clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })

    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                updateContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter

            }}>
            { props.children}
        </ContactContext.Provider>
    )
}

export default ContactState