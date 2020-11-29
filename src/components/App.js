import React from 'react';
import PhoneBook from './PhoneBook/PhoneBook';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import styles from './App.module.css';

const App = () => {
        return (
            <div className={styles.App}>
                <PhoneBook />
                <h2>Contacts</h2>
                <Contacts />
                <Filter   />
            </div>
        )
}

export default App;
