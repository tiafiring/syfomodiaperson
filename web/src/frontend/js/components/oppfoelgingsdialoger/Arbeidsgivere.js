import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, senesteTom } from 'digisyfo-npm';

const Arbeidsgivere = ({ sykmeldinger = [], oppfoelgingsdialoger = [], ledetekster = {}, fnr }) => {
    const arbeidsgivere = new Set();
    oppfoelgingsdialoger.forEach((oppfoelgingsdialog) => {
        arbeidsgivere.add({
            virksomhetsnummer: oppfoelgingsdialog.virksomhetsnummer,
            virksomhetsnavn: oppfoelgingsdialog.virksomhetsnavn,
            antallAktivePlaner: 0,
            antallInaktivePlaner: 0,
        })
    });

    arbeidsgivere.forEach((arbeidsgiver) => {
        sykmeldinger.forEach((sykmelding) => {
            if (sykmelding.orgnummer === arbeidsgiver.virksomhetsnummer) {
                const treMndSiden = new Date();
                treMndSiden.setMonth(treMndSiden.getMonth() - 3);
                if (new Date(senesteTom(sykmelding.mulighetForArbeid.perioder)) > treMndSiden) {
                    arbeidsgiver.antallAktivePlaner++;
                } else {
                    arbeidsgiver.antallInaktivePlaner++;
                }
            }
        });
    });
    return (<div>
        {
            Array.from(arbeidsgivere).map((arbeidsgiver, index) => {
                return (<Link to={`/sykefravaer/${fnr}/oppfoelgingsplaner/arbeidsgivere/${arbeidsgiver.virksomhetsnummer}`} key={index}><div className="panel navigasjonspanel">
                    <div className="oppfoelgingsplan__arbeidsgivere__header">
                        <img src="/sykefravaer/img/svg/arbeidsplassikon.svg" />
                        <h2>{arbeidsgiver.virksomhetsnavn}</h2>
                    </div>
                    <div className="oppfoelgingsplan__arbeidsgivere__status">
                        <p>{`Aktive planer: ${arbeidsgiver.antallAktivePlaner}`}</p>
                        <p>{`Tidligere planer: ${arbeidsgiver.antallInaktivePlaner}`}</p>
                    </div>
                </div></Link>);
            })
        }
    </div>);
};

Arbeidsgivere.propTypes = {
    oppfoelgingsdialoger: PropTypes.array.isRequired,
    sykmeldinger: PropTypes.array.isRequired,
    ledetekster: PropTypes.object.isRequired,
    fnr: PropTypes.string,
};

export default Arbeidsgivere;
