import React from 'react';
import { connect } from 'react-redux';
import Side from '../sider/Side';
import Feilmelding from '../components/Feilmelding';

export const Feilside = () => {
    return (
        <div >
            <Feilmelding tittel="Vi finner ikke noe fødselsnummer!" melding={{ __html: "<div>" +
            "<p>Vi kan ikke se at du har søkt opp en bruker. Søk opp brukeren du ønsker å se i søkefeltet øverst på siden.</p>" +
            "<p>Vi vil veldig gjerne at du sender en kort beskrivelse med hvordan du navigerte for å ende opp her til: digisyfo@nav.no</p>" +
            "</div>" }} />
        </div>
    );
};

export function mapStateToProps() {
    return {};
}

const FeilsideContainer = connect(mapStateToProps)(Feilside);

export default FeilsideContainer;
