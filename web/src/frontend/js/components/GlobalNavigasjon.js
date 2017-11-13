import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import * as menypunkter from '../menypunkter';

const historikkMenypunkt = {
    navn: 'Historikk',
    sti: 'historikk',
    menypunkt: menypunkter.HISTORIKK,
};

const naermesteLederMenypunkt = {
    navn: 'Nærmeste leder',
    sti: 'naermeste-leder',
    menypunkt: menypunkter.NAERMESTE_LEDER,
};

const motemodulMenypunkt = {
    navn: 'Møteplanlegger',
    sti: 'mote',
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

class GlobalNavigasjon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusIndex: -1,
        };
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
                return;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const { fnr, aktivtMenypunkt, oppgaver } = this.props;
        this.menypunkter = [historikkMenypunkt, naermesteLederMenypunkt, tidslinjeMenypunkt, sykmeldingerMenypunkt, sykepengesoknadMenypunkt, motemodulMenypunkt, oppfoelgingsplanMenypunkt];

        return (<ul aria-label="Navigasjon" className="navigasjon">
        {
            this.menypunkter.map(({ navn, sti, menypunkt }, index) => {
                let className = 'navigasjonspanel';
                if (menypunkt === aktivtMenypunkt) {
                    className = `${className} navigasjonspanel--aktiv`;
                }
                const antallOppgaver = oppgaver.filter((oppgave) => {
                    return menypunkt === menypunkter.OPPFOELGINGSPLANER &&
                        oppgave.type === 'SE_OPPFOLGINGSPLAN';
                }).length;
                return (<li key={index} className="navigasjon__element" style={{display: 'flex'}}>
                    <a ref={this.getRef(index)} className={className} onFocus={() => {
                        this.setFocusIndex(index);
                    }} onKeyDown={(e) => {
                        this.handleKeyDown(e);
                    }} onClick={(e) => {
                        e.preventDefault();
                        // Dette gjøres slik for å slippe å laste siden på nytt.
                        // <Link /> fra react-router kan ikke brukes da den ikke støtter ref-attributtet.
                        browserHistory.push(`/sykefravaer/${fnr}/${sti}`);
                    }} href={`/sykefravaer/${fnr}/${sti}`}>
                    <label style={{ flex: 1 }}>{navn}</label>
                        {
                            antallOppgaver > 0 && <label className="antallNytt">{antallOppgaver}</label>
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
};

export default GlobalNavigasjon;
