import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

const naermesteLederMenypunkt = {
    navn: 'Nærmeste leder',
    sti: 'naermeste-leder',
};

const motemodulMenypunkt = {
    navn: 'Møteplanlegger',
    sti: 'mote',
};

const tidslinjeMenypunkt = {
    navn: 'Tidslinjen',
    sti: 'tidslinjen',
};

class GlobalNavigasjon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusIndex: -1,
        };
    }

    setFocus(fokusId) {
        const ref = `js-${fokusId}`;
        this.refs[ref].focus();
    }

    setFocusIndex(index) {
        this.setState({
            focus: index,
        });
    }

    handleKeyup(e) {
        const DOWN = 40;
        const UP = 38;
        switch (e.keyCode) {
            case DOWN: {
                let focusIndex = this.state.focus + 1;
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
                let focusIndex = this.state.focus - 1;
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
        const { fnr, harTilgangMotemodul } = this.props;
        this.menypunkter = [naermesteLederMenypunkt, tidslinjeMenypunkt];
        if (harTilgangMotemodul) {
            this.menypunkter.push(motemodulMenypunkt);
        }

        return (<ul aria-label="Navigasjon" className="navigasjon">
        {
            this.menypunkter.map(({ navn, sti }, index) => {
                return (<li key={index} className="navigasjon__element">
                    <a ref={`js-${index}`} className="navigasjonspanel" onFocus={(e => {
                        this.setFocusIndex(index);
                    })} onKeyUp={(e) => {
                        this.handleKeyup(e);
                    }} onClick={(e) => {
                        e.preventDefault();
                        browserHistory.push(`/sykefravaer/${fnr}/${sti}`);
                    }} href={`/sykefravaer/${fnr}/${sti}`}>{navn}</a>
                </li>);
            })
        }
        </ul>);
    }
}

GlobalNavigasjon.propTypes = {
    fnr: PropTypes.string,
    harTilgangMotemodul: PropTypes.bool,
};

export default GlobalNavigasjon;
