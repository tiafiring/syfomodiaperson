import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import * as menypunkter from '../enums/menypunkter';

const historikkMenypunkt = {
    navn: 'Logg',
    sti: 'logg',
    menypunkt: menypunkter.HISTORIKK,
};

const motemodulMenypunkt = {
    navn: 'Møteplanlegger',
    sti: 'moteoversikt',
    menypunkt: menypunkter.MOETEPLANLEGGER,
};

const tidslinjeMenypunkt = {
    navn: 'Tidslinjen',
    sti: 'tidslinjen',
    menypunkt: menypunkter.TIDSLINJEN,
};

const sykmeldingerMenypunkt = {
    navn: 'Sykmeldinger',
    sti: 'sykmeldinger',
    menypunkt: menypunkter.SYKMELDINGER,
};

const sykepengesoknadMenypunkt = {
    navn: 'Søknader om sykepenger',
    sti: 'sykepengesoknader',
    menypunkt: menypunkter.SYKEPENGESOKNADER,
};

const oppfoelgingsplanMenypunkt = {
    navn: 'Oppfølgingsplaner',
    sti: 'oppfoelgingsplaner',
    menypunkt: menypunkter.OPPFOELGINGSPLANER,
};


const erOppfoelginsdialogOppgave = (menypunkt, oppgave) => {
    return menypunkt === menypunkter.OPPFOELGINGSPLANER &&
        oppgave.type === 'SE_OPPFOLGINGSPLAN' && oppgave.status !== 'FERDIG';
};

const erMoteplanleggerOppgave = (menypunkt, oppgave) => {
    return menypunkt === menypunkter.MOETEPLANLEGGER &&
        oppgave.type === 'ALLE_SVAR_MOTTATT' && oppgave.status !== 'FERDIG';
};

const finnAntallPrikker = (menypunkt, oppgaver) => {
    return oppgaver.filter((oppgave) => {
        return erOppfoelginsdialogOppgave(menypunkt, oppgave) || erMoteplanleggerOppgave(menypunkt, oppgave);
    }).length;
};

const setMotemodulSti = (motebehovet) => {
    if (motebehovet) {
        return 'moteoversikt';
    }
    return 'mote';
};

class GlobalNavigasjon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusIndex: -1,
        };
        this.props.hentMotebehov(this.props.fnr);
    }

    setFocus(fokusId) {
        const ref = this.getRef(fokusId);
        this.refs[ref].focus();
    }

    setFocusIndex(index) {
        this.setState({
            focus: index,
        });
    }

    getRef(index) {
        return `js-${index}`;
    }

    handleKeyDown(e) {
        const DOWN = 40;
        const UP = 38;
        switch (e.keyCode) {
            case DOWN: {
                e.preventDefault();
                const focusIndex = this.state.focus + 1;
                if (focusIndex === this.menypunkter.length) {
                    return;
                }
                this.setState({
                    focusIndex,
                });
                this.setFocus(focusIndex);
                return;
            }
            case UP: {
                e.preventDefault();
                const focusIndex = this.state.focus - 1;
                if (focusIndex === -1) {
                    return;
                }
                this.setState({
                    focusIndex,
                });
                this.setFocus(focusIndex);
            }
            default: {

            }
        }
    }

    render() {
        const { fnr, aktivtMenypunkt, oppgaver, motebehovet, hentingFeilet } = this.props;
        this.menypunkter = [historikkMenypunkt, tidslinjeMenypunkt, sykmeldingerMenypunkt, sykepengesoknadMenypunkt, motemodulMenypunkt, oppfoelgingsplanMenypunkt];

        return (<ul aria-label="Navigasjon" className="navigasjon">
            {
                this.menypunkter.map(({ navn, sti, menypunkt }, index) => {
                    let className = 'navigasjonspanel';
                    if (menypunkt === aktivtMenypunkt) {
                        className = `${className} navigasjonspanel--aktiv`;
                    }
                    if (menypunkt === menypunkter.MOETEPLANLEGGER && !hentingFeilet) {
                        sti = setMotemodulSti(motebehovet);
                    }
                    const antallPrikker = finnAntallPrikker(menypunkt, oppgaver);
                    return (<li key={index} className="navigasjon__element">
                        <a
                            ref={this.getRef(index)}
                            className={className}
                            href={`/sykefravaer/${fnr}/${sti}`}
                            onFocus={() => {
                                this.setFocusIndex(index);
                            }}
                            onKeyDown={(e) => {
                                this.handleKeyDown(e);
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Dette gjøres slik for å slippe å laste siden på nytt.
                                // <Link /> fra react-router kan ikke brukes da den ikke støtter ref-attributtet.
                                browserHistory.push(`/sykefravaer/${fnr}/${sti}`);
                            }}>
                            <label style={{ flex: 1 }}>{navn}</label>
                            {
                                antallPrikker > 0 && <label className="antallNytt">{antallPrikker}</label>
                            }
                        </a>
                    </li>);
                })
            }
        </ul>);
    }
}

GlobalNavigasjon.propTypes = {
    fnr: PropTypes.string,
    aktivtMenypunkt: PropTypes.string,
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    motebehovet: PropTypes.object,
    hentingFeilet: PropTypes.bool,
    hentMotebehov: PropTypes.func,
};

export default GlobalNavigasjon;
