import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

export const Header = ({title}) => {
    return(
        <div className='header'>
            <h3 className='h3'>{title}</h3>
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


