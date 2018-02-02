import React from 'react';
import { connect } from 'react-redux';
import Infomelding from '../components/Infomelding';

export const IngenBrukerSide = () => {
    return (
        <div >
            <Infomelding tittel="Du har ikke valgt hvilken person du ønsker å se" melding="For å se oppfølgingen må du skrive inn fødselsnummeret i menylinjen" />
        </div>
    );
};

export function mapStateToProps() {
    return {};
}

const IngenBrukerContainer = connect(mapStateToProps)(IngenBrukerSide);

export default IngenBrukerContainer;
