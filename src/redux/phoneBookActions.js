// action creators
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contact/add', contact => ({
    payload: {
        value: contact
    }
}));

const deleteContact = createAction('contact/delete', contact => ({
    payload: {
        value: contact
    }
}))

const updateFilter = createAction('filter/update', value => ({
    payload: {
        filter: value
    }
}))

const readStorage = createAction('local_storage/read', () => {
    return {
        payload: {
            items: JSON.parse(localStorage.getItem('contacts'))
        }
    }
})

export default { addContact, deleteContact, updateFilter, readStorage };