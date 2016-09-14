import React, { PropTypes } from 'react';

const EnLeder = ({ arbeidsgiver, leder }) => {
    return (<div className="Cols NaermesteLedere">
        <div className="Col">
            <h3>Arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
            <h3>Org. nummer</h3>
            <p>{arbeidsgiver.orgnummer}</p>
        </div>
        <div className="Col">
            <h3>Navn</h3>
            <p>{leder.navn}</p>
            <h3>Fødselsdato</h3>
            <p>{leder.fodselsdato}</p>
        </div>
        <div className="Col">
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
    return (<div className="Cols Rows--adskilt NaermesteLedere" onClick={clickHandler}>
        <div className="Col">
            <h3>Arbeidsgiver</h3>
            <p>{arbeidsgiver.navn}</p>
            { erApen && <h3>Org. nummer</h3> }
            { erApen && <p>{arbeidsgiver.orgnummer}</p> }
        </div>
        <div className="Col">
            <h3>Navn</h3>
            <p>{leder.navn}</p>
            { erApen && <h3>Fødselsdato</h3> }
            { erApen && <p>{leder.fodselsdato}</p> }
        </div>
        <div className="Col">
            <h3>Telefon</h3>
            <p>{leder.telefon}</p>
            { erApen && <h3>E-post</h3> }
            { erApen && <p><a href={`mailto:${leder.epost}`}>{leder.epost}</a></p> }
        </div>
        <button aria-pressed={erApen} className={`IkonKollaps ${!erApen ? 'IkonKollaps--erKollapsert' : ''}`} onClick={(event) => {
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

const NaermesteLedere = ({ ledere, navBruker, toggleApenLeder }) => {
    return (<div className="Panel">
        <h2 className="typo-undertittel">Nærmeste leder for {navBruker.navn}</h2>
        {
            ledere.length === 1 && <EnLeder {...ledere[0]} />
        }
        {
            ledere.length === 0 && <p>Ingen ledere.</p>
        }
        {
            ledere.length > 1 && ledere.map((leder, index) => {
                return (<FlereLedere {...leder} key={index} clickHandler={() => {
                    toggleApenLeder(leder.id);
                }} />);
            })
        }
    </div>);
};

NaermesteLedere.propTypes = {
    ledere: PropTypes.array,
    navBruker: PropTypes.object,
    toggleApenLeder: PropTypes.func,
};

export default NaermesteLedere;
