import React, { PropTypes } from 'react';

const EnLeder = ({ arbeidsgiver, leder }) => {
    return (<div className="rad naermesteLeder">
        <div className="kolonne">
            <h3>Arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
            <h3>Org. nummer</h3>
            <p>{arbeidsgiver.orgnummer}</p>
        </div>
        <div className="kolonne">
            <h3>Navn</h3>
            <p>{leder.navn}</p>
            <h3>Fødselsdato</h3>
            <p>{leder.fodselsdato}</p>
        </div>
        <div className="kolonne">
            <h3>Telefon</h3>
            <p>{leder.telefon}</p>
            <h3>E-post</h3>
            <p><a href={`mailto:${leder.epost}`}>{leder.epost}</a></p>
        </div>
    </div>);
};

EnLeder.propTypes = {
    arbeidsgiver: PropTypes.object,
    leder: PropTypes.object,
};

const FlereLedere = ({ arbeidsgiver, epost, navn, tlf, fodselsdato, erApen, clickHandler }) => {
    return (<div className={`rad rad--adskilt naermesteLeder ${erApen ? 'naermesteLeder--aktiv' : ''}`} onClick={clickHandler}>
        <div className="kolonne">
            <h3>Arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
            { erApen && <h3>Org. nummer</h3> }
            { erApen && <p>{arbeidsgiver.orgnummer}</p> }
        </div>
        <div className="kolonne">
            <h3>Navn</h3>
            <p>{navn}</p>
            { erApen && <h3>Fødselsdato</h3> }
            { erApen && <p>{fodselsdato}</p> }
        </div>
        <div className="kolonne">
            <h3>Telefon</h3>
            <p>{tlf}</p>
            { erApen && <h3>E-post</h3> }
            { erApen && <p><a href={`mailto:${epost}`}>{epost}</a></p> }
        </div>
        <button aria-pressed={erApen} className={`ikonKollaps ${!erApen ? 'ikonKollaps--erKollapsert' : ''}`} onClick={(event) => {
            event.stopPropagation();
            clickHandler();
        }}>{erApen ? 'Lukk' : 'Åpne'}</button>
    </div>);
};

FlereLedere.propTypes = {
    arbeidsgiver: PropTypes.object,
    epost: PropTypes.string,
    navn: PropTypes.string,
    erApen: PropTypes.bool,
    clickHandler: PropTypes.func,
    tlf: PropTypes.string,
    fodselsdato: PropTypes.string,
};

const NaermesteLedere = ({ ledere, navbruker, toggleApenLeder }) => {
    const tittel = ledere.length > 1 ? 'Nærmeste ledere med personalansvar' : 'Nærmeste ledere med personalansvar';
    return (<div className="panel">
        <h2 className="typo-undertittel">{tittel}</h2>
        <div className="naermesteLedere">
            {
                ledere.length === 1 && <EnLeder {...ledere[0]} />
            }
            {
                ledere.length === 0 && <p>Nærmeste leder med personalansvar for {navbruker.navn} er ikke oppgitt.</p>
            }
            {
                ledere.length > 1 && ledere.map((leder, index) => {
                    return (<FlereLedere {...leder} key={index} clickHandler={() => {
                        toggleApenLeder(leder.id);
                    }} />);
                })
            }
        </div>
        <p><strong>NB:</strong> Nærmeste leder er kun gyldig for sykefraværsoppfølging. Skal ikke brukes til...</p>
    </div>);
};

NaermesteLedere.propTypes = {
    ledere: PropTypes.array,
    navbruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export default NaermesteLedere;
