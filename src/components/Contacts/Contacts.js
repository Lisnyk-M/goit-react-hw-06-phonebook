import React, { Component } from 'react';
import styles from './Contacts.module.css';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import slide from './slide.module.css';
import { connect } from 'react-redux';
import phoneBookActions from '../../redux/phoneBookActions';

class Contacts extends Component {
    constructor(props) {
        super(props);
        if (localStorage.getItem('contacts')) {
            props.onReadStorage();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.contacts !== this.props.contacts && this.props.contacts.length > 0) {
            localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
        }
    }

    filterContacts = () => {
        return this.props.contacts.filter(contact => contact.name.toLowerCase()
            .includes(this.props.filter.toLowerCase()));
    }

    render() {
        return (
            <TransitionGroup component="ul" className={styles.list}>
                {this.filterContacts().map(item => (
                    <CSSTransition key={item.id} timeout={300} classNames={slide} appear={false}>
                        <li className={styles.item} key={item.id}>
                            {item.name}: {item.number}
                            <button
                                className={styles.buttonDelete}
                                id={item.id}
                                onClick={() => this.props.onDeleteContact(item.id)}
                            >X
                                    </button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        )
    }
}

Contacts.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })),

    filter: PropTypes.string.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onReadStorage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.items,
        filter: state.contacts.filter
    }
}

const mapDispatchToProps = {
    onDeleteContact: phoneBookActions.deleteContact,
    onReadStorage: phoneBookActions.readStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);