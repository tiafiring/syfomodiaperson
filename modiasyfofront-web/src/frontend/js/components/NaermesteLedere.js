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

const FlereLedere = ({ arbeidsgiver, leder, erApen, clickHandler }) => {
    return (<div className={`rad rad--adskilt naermesteLeder ${erApen ? 'naermesteLeder--aktiv' : ''}`} onClick={clickHandler}>
        <div className="kolonne">
            <h3>Arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
            { erApen && <h3>Org. nummer</h3> }
            { erApen && <p>{arbeidsgiver.orgnummer}</p> }
        </div>
        <div className="kolonne">
            <h3>Navn</h3>
            <p>{leder.navn}</p>
            { erApen && <h3>Fødselsdato</h3> }
            { erApen && <p>{leder.fodselsdato}</p> }
        </div>
        <div className="kolonne">
            <h3>Telefon</h3>
            <p>{leder.telefon}</p>
            { erApen && <h3>E-post</h3> }
            { erApen && <p><a href={`mailto:${leder.epost}`}>{leder.epost}</a></p> }
        </div>
        <button aria-pressed={erApen} className={`ikonKollaps ${!erApen ? 'ikonKollaps--erKollapsert' : ''}`} onClick={(event) => {
            event.stopPropagation();
            clickHandler();
        }}>{erApen ? 'Lukk' : 'Åpne'}</button>
    </div>);
};

FlereLedere.propTypes = {
    arbeidsgiver: PropTypes.object,
    leder: PropTypes.object,
    erApen: PropTypes.bool,
    clickHandler: PropTypes.func,
};

const naermesteLedere = ({ ledere, navBruker, toggleApenLeder }) => {
    const tittel = ledere.length > 1 ? 'Nærmeste ledere med personalansvar' : 'Nærmeste ledere med personalansvar';
    return (<div className="panel">
        <h2 className="typo-undertittel">{tittel}</h2>
        <div className="naermesteLedere">
            {
                ledere.length === 1 && <EnLeder {...ledere[0]} />
            }
            {
                ledere.length === 0 && <p>Nærmeste leder med personalansvar for {navBruker.navn} er ikke oppgitt.</p>
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

naermesteLedere.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export default naermesteLedere;
