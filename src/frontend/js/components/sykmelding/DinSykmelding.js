import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import KnappBase from 'nav-frontend-knapper';
import { DineSykmeldingOpplysninger, getLedetekst } from 'digisyfo-npm';
import IllustrertInnhold from '../IllustrertInnhold';
import Alertstripe from 'nav-frontend-alertstriper';

const navn = (pasient) => {
    if (pasient.mellomnavn) {
        return `${pasient.fornavn} ${pasient.mellomnavn} ${pasient.etternavn}`;
    }
    return `${pasient.fornavn} ${pasient.etternavn}`;
};

const DinSykmelding = ({ sykmelding, ledetekster, visEldreSykmeldingVarsel, eldsteSykmeldingId }) => {
    return (<div>
        <div className="panel blokk--s">
            <IllustrertInnhold ikon="/sykefravaer/img/svg/din-sykmelding-veileder.svg" ikonAlt="NAV-veileder">
                <div>
                    <p>{getLedetekst('din-sykmelding.introtekst.abtest', ledetekster)}</p>
                    <p className="sist introtekst__knapperad">
                        <KnappBase type="standard" mini disabled>Gå til utfylling</KnappBase>
                    </p>
                </div>
            </IllustrertInnhold>
        </div>
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
            <DineSykmeldingOpplysninger sykmelding={sykmelding} ledetekster={ledetekster} />
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
