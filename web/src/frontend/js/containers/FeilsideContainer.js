import React from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';

export const Feilside = () => {
    return (
        <Side tittel="Sykefravær">
            <Feilmelding />
        </Side>
    );
};

export function mapStateToProps() {
    return {};
}

const FeilsideContainer = connect(mapStateToProps)(Feilside);

export default FeilsideContainer;
