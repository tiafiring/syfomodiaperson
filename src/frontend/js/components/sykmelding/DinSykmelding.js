import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { DineSykmeldingOpplysninger, getLedetekst, Bjorn } from '@navikt/digisyfo-npm';
import Alertstripe from 'nav-frontend-alertstriper';

const navn = (pasient) => {
    if (pasient.mellomnavn) {
        return `${pasient.fornavn} ${pasient.mellomnavn} ${pasient.etternavn}`;
    }
    return `${pasient.fornavn} ${pasient.etternavn}`;
};

export const getSykmeldtFornavn = (sykmelding) => {
    return sykmelding.pasient.mellomnavn
        ? `${sykmelding.pasient.fornavn} ${sykmelding.pasient.mellomnavn}`
        : `${sykmelding.pasient.fornavn}`;
};


const DinSykmelding = ({ sykmelding, ledetekster, visEldreSykmeldingVarsel, eldsteSykmeldingId }) => {
    return (<div>
        <Bjorn
            className="blokk"
            hvit
            stor
            rootUrl="/sykefravaer">
            <div>
                <p>
                    {
                        getLedetekst('din-sykmelding.introtekst.bjorn', {
                            '%NAVN%': getSykmeldtFornavn(sykmelding),
                        })
                    }
                </p>
                <p className="introtekst__knapperad">
                    <button
                        disabled
                        className="knapp knapp--mini">
                        Gå til utfylling
                    </button>
                </p>
            </div>
        </Bjorn>
        {
            visEldreSykmeldingVarsel && (<Alertstripe type="info">
                <p className="sist side-innhold">
                    <span>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.tekst', ledetekster)} </span>
                    <Link to={`/sykefravaer/sykmeldinger/${eldsteSykmeldingId}`}>{getLedetekst('starte-sykmelding.eldre-sykmeldinger.lenke', ledetekster)}</Link>
                </p>
            </Alertstripe>)
        }
        <header className="panelHeader panelHeader--lysebla">
            <img className="panelHeader__ikon" src="/sykefravaer/img/svg/person.svg" alt="Du" />
            <img
                className="panelHeader__ikon panelHeader__ikon--hoykontrast"
                src="/sykefravaer/img/svg/person-highcontrast.svg"
                alt="Du" />
            <h2 className="panelHeader__tittel">{navn(sykmelding.pasient)}</h2>
        </header>
        <div className="panel blokk">
            <DineSykmeldingOpplysninger
                sykmelding={sykmelding}
                ledetekster={ledetekster}
            />
        </div>
    </div>);
};

DinSykmelding.propTypes = {
    sykmelding: PropTypes.object,
    ledetekster: PropTypes.object,
    visEldreSykmeldingVarsel: PropTypes.bool,
    eldsteSykmeldingId: PropTypes.string,
};

export default DinSykmelding;
