import React, { PropTypes } from 'react';
import Sidetopp from './Sidetopp';
import { Varselstripe } from 'digisyfo-npm';

const Leder = ({ erOppgitt, orgnummer, organisasjonsnavn, epost, navn, tlf, fomDato }) => {
    return (<div className="naermesteLeder js-leder">
            <div className="grid">
                <div className="unit full">
                    <div className="naermesteLeder__organisasjon">
                        <img src="/sykefravaer/img/svg/kontorbygg.svg" alt="" />
                        <h3>{organisasjonsnavn}</h3>
                    </div>
                </div>
            </div>
            {
                (() => {
                    if (erOppgitt) {
                        return (<div>
                <div className="grid">
                    <div className="unit one-third">
                        <h4>Navn</h4>
                        <p>{navn}</p>
                    </div>
                    <div className="unit two-thirds">
                        <h4>E-post</h4>
                        <p><a href={`mailto:${epost}`}>{epost}</a></p>
                    </div>
                </div>
                <div className="grid">
                    <div className="unit one-third">
                        <h4>Telefon</h4>
                        <p>{tlf}</p>
                    </div>
                    <div className="unit one-third">
                        <h4>Meldt inn</h4>
                        <p>{fomDato}</p>
                    </div>
                    <div className="unit one-third">
                        <h4>Org. nummer</h4>
                        <p>{orgnummer}</p>
                    </div>
                </div>
            </div>);
                    }
                    return <p className="naermesteLeder__ikkeOppgitt">Nærmeste leder ikke meldt inn av arbeidsgiver</p>;
                })()
            }
        </div>);
};

Leder.propTypes = {
    erOppgitt: PropTypes.bool,
    epost: PropTypes.string,
    navn: PropTypes.string,
    tlf: PropTypes.string,
    orgnummer: PropTypes.string,
    organisasjonsnavn: PropTypes.string,
    fomDato: PropTypes.string,
};

const NaermesteLedere = ({ ledere = [], navbruker }) => {
    const tittel = ledere.length > 1 ? 'Nærmeste ledere med personalansvar' : 'Nærmeste leder med personalansvar';
    return (<div className="panel">
        <Sidetopp tittel={tittel} />
        <div className="blokk--l">
            <Varselstripe>
                <p>Opplysninger under brukes i forbindelse med oppfølging</p>
            </Varselstripe>
        </div>
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
};

export default NaermesteLedere;
