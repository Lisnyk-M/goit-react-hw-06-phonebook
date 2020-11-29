
import {createReducer} from '@reduxjs/toolkit';
import phoneBookActions from './phoneBookActions';

const initialValue = {
    contacts: {
        items: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: ''
    }
}

const onAddContact = (state, action) => ({
    ...state, contacts: { ...state.contacts, items: [...state.contacts.items, action.payload.value] }
});

const onDeleteContact = (state, action) => ({
    ...state, contacts: {
        ...state.contacts,
        items: [...state.contacts.items.filter(item => item.id !== action.payload.value)]
    }
});

const onUpdateFilter = (state, action) => ({
    ...state, contacts: { ...state.contacts, filter: action.payload.filter }
});

const onReadStorage = (state, action) => ({
    ...state, contacts: { ...state.contacts, items: [ ...action.payload.items] } 
})

const phoneBookReducer = createReducer (initialValue, {
    [phoneBookActions.addContact]: onAddContact,
    [phoneBookActions.deleteContact]: onDeleteContact,
    [phoneBookActions.updateFilter]: onUpdateFilter,
    [phoneBookActions.readStorage]: onReadStorage
})

export default phoneBookReducer;