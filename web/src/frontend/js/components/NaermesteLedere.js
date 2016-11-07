import React, { PropTypes } from 'react';
import Sidetopp from './Sidetopp';

const Leder = ({ arbeidsgiver, epost, navn, tlf, fodselsdato }) => {
    return (<div className="rad--adskilt naermesteLeder js-leder">
            <div className="grid">
                <div className="unit full">
                    <h3>{arbeidsgiver.navn}</h3>
                </div>
            </div>
            <div className="grid">
                <div className="unit one-third">
                    <h4>Navn</h4>
                    <p>{navn}</p>
                </div>
                <div className="unit one-third">
                    <h4>Telefon</h4>
                    <p>{tlf}</p>
                </div>
                <div className="unit one-third">
                    <h4>Org. nummer</h4>
                    <p>{arbeidsgiver.orgnummer}</p>
                </div>
            </div>
            <div className="grid">
                <div className="unit one-third">
                    <h4>E-post</h4>
                    <p><a href={`mailto:${epost}`}>{epost}</a></p>
                </div>
                <div className="unit one-third">
                    <h4>Fødselsdato</h4>
                    <p>{fodselsdato}</p>
                </div>
            </div>
        </div>
    );
};

Leder.propTypes = {
    arbeidsgiver: PropTypes.object,
    epost: PropTypes.string,
    navn: PropTypes.string,
    tlf: PropTypes.string,
    fodselsdato: PropTypes.string,
};

const NaermesteLedere = ({ ledere = [], navbruker }) => {
    const tittel = ledere.length > 1 ? 'Nærmeste ledere med personalansvar' : 'Nærmeste leder med personalansvar';
    return (<div className="panel">
        <Sidetopp tittel={tittel} />
        <p>*kan kontaktes av NAV i forbindelse med oppfølging</p>
        <div className="naermesteLedere">
            {
                ledere.length === 0 && <p>Nærmeste leder med personalansvar for {navbruker.navn} er ikke oppgitt.</p>
            }
            {
                ledere.length > 0 && ledere.map((leder, index) => {
                    return (<Leder {...leder} key={index} />);
                })
            }
        </div>
    </div>);
};

NaermesteLedere.propTypes = {
    ledere: PropTypes.array,
    navbruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export default NaermesteLedere;
