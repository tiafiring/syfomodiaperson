import React from 'react';
import { connect } from 'react-redux';
import Feilmelding from '../components/Feilmelding';

export const IngenBrukerSide = () => {
    return (
        <div >
            <Feilmelding tittel="Du har ikke valgt hvilken person du ønsker å se" melding={{ __html: "<div>" +
            "<p>For å se oppfølgingen må du skrive inn fødselsnummeret i menylinjen. </p>" +
            "</div>" }} />
        </div>
    );
};

export function mapStateToProps() {
    return {};
}

const IngenBrukerContainer = connect(mapStateToProps)(IngenBrukerSide);

export default IngenBrukerContainer;
