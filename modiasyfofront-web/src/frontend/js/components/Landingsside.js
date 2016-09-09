import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, getHtmlLedetekst } from '../ledetekster/index';

const Landingsside = ({ ledetekster = {} }) => {
    return (
        <div>
        <p>Hello there</p>
    </div>);
};

Landingsside.propTypes = {
    ledetekster: PropTypes.object.isRequired,
    skjulVarsel: PropTypes.bool.isRequired,
};

export default Landingsside;
