import React, { useReducer } from 'react'
import { v4 as uuid } from "uuid";
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'personal',
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gmail.com',
                phone: '112-111-1111',
                type: 'personal',
            },
            {
                id: 3,
                name: 'Harry Johnson',
                email: 'harry@gmail.com',
                phone: '113-111-1111',
                type: 'professional',
            },
        ],
        current: null,
        filtered: null

    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuid.v4
        dispatch({ type: ADD_CONTACT, payload: contact })
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