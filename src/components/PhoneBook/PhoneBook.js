import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './PhoneBook.module.css';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Notification from '../Notification/Notification';
import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBookActions';
import UpBar from './AnimComponents.module.css';
import Fade from './AnimComponents.module.css';

class PhoneBook extends Component {
    state = {
        name: '',
        number: '',
        stage: '',
        existContact: 'false'
    }

    existContact = (list, contact) => {
        const isExistContactt = list.findIndex(item => {
            return item.name.toLowerCase() === contact.name.toLowerCase()
        });
        return isExistContactt > -1 ? true : false;
    }

    handleSubmit = e => {
        e.preventDefault();

        const contact = {
            id: uuidv4(),
            name: this.state.name,
            number: this.state.number
        }

        if (!this.existContact(this.props.contacts, contact)) {
            this.props.onAddContact(contact);
        }

        this.setState({ name: '', number: '' });
    }

    handleChange = e => {
        this.setState({ name: e.target.value });
    }

    handleChangeNumber = e => {
        this.setState({ number: e.target.value });
    }

    render() {
        const contact = {
            id: uuidv4(),
            name: this.state.name,
            number: this.state.number
        }

        return (
            <>
                <CSSTransition in appear timeout={500} classNames={UpBar} unmountOnExit>
                    {stage => {
                        return (
                            <h2 className={styles.title}>PhoneBook</h2>
                        )
                    }}
                </CSSTransition>

                <CSSTransition
                    in={this.existContact(this.props.contacts, contact)}
                    timeout={250} classNames={Fade}
                    unmountOnExit
                >
                    <Notification message="is allready in contacts"></Notification>
                </CSSTransition>

                <form className={styles.inputContact} onSubmit={this.handleSubmit}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    >
                    </input>
                    <label className={styles.label}>Number</label>

                    <input
                        className={styles.input}
                        type="phone"
                        value={this.state.number}
                        onChange={this.handleChangeNumber}>
                    </input>

                    <button type="submit" className={styles.buttonAddContact}>Add contact</button>
                </form>
            </>
        )
    }
}

PhoneBook.propTypes = {
    onAddContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    }).isRequired)
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.items,
    }
}

const mapDispatchToProps = {
    onAddContact: phoneBookActions.addContact,
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);