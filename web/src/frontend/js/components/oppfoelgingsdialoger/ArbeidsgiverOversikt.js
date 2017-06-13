import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, senesteTom, Varselstripe } from 'digisyfo-npm';
import OppfoelgingsplanTeaser from './OppfoelgingsplanTeaser';

const ArbeidsgiverOversikt = ({ sykmeldinger = [], oppfoelgingsdialoger = [], ledetekster = {}, fnr }) => {
    const arbeidsgiver ={
            virksomhetsnummer: oppfoelgingsdialoger[0].virksomhetsnummer,
            virksomhetsnavn: oppfoelgingsdialoger[0].virksomhetsnavn,
            aktiverPlaner: [],
            inaktivePlaner: [],
    };

    let nyesteOppfoelgingsdialog = oppfoelgingsdialoger[0];
    oppfoelgingsdialoger.forEach((oppfoelgingsdialog) => {
        if (oppfoelgingsdialog.opprettetDato > nyesteOppfoelgingsdialog.opprettetDato) {
            nyesteOppfoelgingsdialog = oppfoelgingsdialog;
        }
    });
    arbeidsgiver.aktiverPlaner.push(nyesteOppfoelgingsdialog);

    oppfoelgingsdialoger.filter((oppfoelgingsdialog) => {
        return oppfoelgingsdialog !== nyesteOppfoelgingsdialog;
    }).forEach((oppfoelgingsdialog) => {
        arbeidsgiver.inaktivePlaner.push(oppfoelgingsdialog);
    });

    return (<div>
        <h1>{nyesteOppfoelgingsdialog.virksomhetsnavn}</h1>
        <h2>Aktive oppfølgingsplaner</h2>
        {
            arbeidsgiver.aktiverPlaner.length === 0 ? (<Varselstripe>
                <p>Det er ingen aktive oppfølgingsplaner mellom den sykmeldte og denne arbeidsgiveren.</p>
            </Varselstripe>) : <OppfoelgingsplanTeaser oppfoelgingsdialog={nyesteOppfoelgingsdialog} ledetekster={ledetekster} fnr={fnr} />
        }
        <h2>Tidligere oppfølgingsplaner</h2>
        {
            arbeidsgiver.inaktivePlaner.length === 0 ? (<Varselstripe>
                <p>Det er ingen tidligere oppfølgingsplaner mellom den sykmeldte og denne arbeidsgiveren.</p>
            </Varselstripe>) : arbeidsgiver.inaktivePlaner.map((oppfoelgingsdialog) => {
                return (<OppfoelgingsplanTeaser oppfoelgingsdialog={oppfoelgingsdialog} ledetekster={ledetekster} fnr={fnr} />);
            })
        }
    </div>);
};

ArbeidsgiverOversikt.propTypes = {
    oppfoelgingsdialoger: PropTypes.array.isRequired,
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    fnr: PropTypes.string,
};

export default ArbeidsgiverOversikt;
