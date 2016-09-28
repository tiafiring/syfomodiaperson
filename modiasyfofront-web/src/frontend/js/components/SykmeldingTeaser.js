import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const SykmeldingTeaser = ({ sykmelding }) => {
    const statuser = {
        NY: 'Ny',
        SENDT: 'Sendt til arbeidsgiver',
        AVBRUTT: 'Avbrutt av sykmeldt',
        BEKREFTET: 'Bekreftet',
    };

    return (<Link className="inngangspanel" activeClassName="inngangspanel inngangspanel--aktiv" to={`/sykefravaer/sykmeldinger/${sykmelding.id}`}>
        <p className="inngangspanel__meta">fra 02.01 til 14.01.16</p>
        <h4 className="inngangspanel__tittel">Sykmelding</h4>
        <p className="inngangspanel__meta">{statuser[sykmelding.status]}</p>
    </Link>);
};

SykmeldingTeaser.propTypes = {
    sykmelding: PropTypes.object,
};

export default SykmeldingTeaser;
