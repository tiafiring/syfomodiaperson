import React, { PropTypes } from 'react';

const EnLeder = ({ leder }) => {
    return (<div className="naermesteLeder">
        <div className="grid">
            <div className="unit one-third">
                <h3>Arbeidsgiver</h3>
                <p>{leder.arbeidsgiver.navn}</p>
            </div>
            <div className="unit one-third">
                <h3>Navn</h3>
                <p>{leder.navn}</p>
            </div>
            <div className="unit one-third">
                <h3>Telefon</h3>
                <p>{leder.tlf}</p>
            </div>
        </div>
        <div className="grid">
            <div className="unit one-third">
                <h3>Org. nummer</h3>
                <p>{leder.arbeidsgiver.orgnummer}</p>
            </div>
            <div className="unit one-third">
                <h3>Fødselsdato</h3>
                <p>{leder.fodselsdato}</p>
            </div>
            <div className="unit one-third">
                <h3>E-post</h3>
                <p><a href={`mailto:${leder.epost}`}>{leder.epost}</a></p>
            </div>
        </div>
    </div>);
};

EnLeder.propTypes = {
    arbeidsgiver: PropTypes.object,
    leder: PropTypes.object,
};

const FlereLedere = ({ arbeidsgiver, epost, navn, tlf, fodselsdato, erApen, clickHandler }) => {
    return (<div className={`rad--adskilt naermesteLeder ${erApen ? 'naermesteLeder--aktiv' : ''}`}
                 onClick={clickHandler}>
            <div className="grid">
                <div className="unit one-third">
                    <h3>Arbeidsgiver</h3>
                    <p>{arbeidsgiver.navn}</p>
                </div>
                <div className="unit one-third">
                    <h3>Navn</h3>
                    <p>{navn}</p>
                </div>
                <div className="unit one-third">
                    <h3>Telefon</h3>
                    <p>{tlf}</p>
                </div>
            </div>
        { erApen &&
            <div className="grid">
                <div className="unit one-third">
                   <h3>Org. nummer</h3>
                    <p>{arbeidsgiver.orgnummer}</p>
                </div>
                <div className="unit one-third">
                   <h3>Fødselsdato</h3>
                   <p>{fodselsdato}</p>
                </div>
                <div className="unit one-third">
                   <h3>E-post</h3>
                    <p><a href={`mailto:${epost}`}>{epost}</a></p>
                </div>
            </div>
            }
            <button aria-pressed={erApen} className={`ikonKollaps ${!erApen ? 'ikonKollaps--erKollapsert' : ''}`}
                    onClick={(event) => {
            event.stopPropagation();
            clickHandler();
        }}>{erApen ? 'Lukk' : 'Åpne'}</button>
        </div>
    );
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
    const tittel = ledere.length > 1 ? 'Nærmeste ledere med personalansvar' : 'Nærmeste leder med personalansvar';
    return (<div className="panel">
        <h2 className="typo-innholdstittel">{tittel}</h2>
        <p>*kan kontaktes av NAV i forbindelse med oppfølging</p>
        <div className="naermesteLedere">
            {
                ledere.length === 1 && <EnLeder leder={ledere[0]}/>
            }
            {
                ledere.length === 0 && <p>Nærmeste leder med personalansvar for {navbruker.navn} er ikke oppgitt.</p>
            }
            {
                ledere.length > 1 && ledere.map((leder, index) => {
                    return (<FlereLedere {...leder} key={index} clickHandler={() => {
                        toggleApenLeder(leder.id);
                    }}/>);
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
