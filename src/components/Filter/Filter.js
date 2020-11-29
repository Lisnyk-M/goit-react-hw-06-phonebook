import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import phoneBookActions from '../../redux/phoneBookActions';
import styles from './Filter.module.css';



function Filter({ value, onChangeFilter }) {
    return (
        <div>
            <h2>Find contacts by name</h2>
            <input
                className={styles.filter}
                type="text" value={value}
                onChange={e => onChangeFilter(e.target.value)}>
            </input>
        </div>
    )
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired    
}

const mapStateToProps = state => {
    return {
        value: state.contacts.filter
    }
}

const mapDispatchToProps = {
    onChangeFilter: phoneBookActions.updateFilter
}

export default connect(mapStateToProps, mapDispatchToProps) (Filter);