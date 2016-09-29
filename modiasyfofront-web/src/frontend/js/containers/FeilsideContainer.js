import React from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';

export const Feilside = () => {
    return (
        <Side tittel="Sykefravær">
            <p>Beklager, det oppstod en feil</p>
        </Side>
    );
};

export function mapStateToProps() {
    return {};
}

const FeilsideContainer = connect(mapStateToProps)(Feilside);

export default FeilsideContainer;
