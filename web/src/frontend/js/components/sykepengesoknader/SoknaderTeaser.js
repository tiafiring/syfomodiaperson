import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { tidligsteFom, senesteTom } from '../../utils/periodeUtils';
import { NY } from '../../enums/sykepengesoknadstatuser';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';

class SoknadTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ikon: 'soknader.svg',
        };
    }

    onMouseEnter() {
        this.setState({
            ikon: 'soknader_hover-blue.svg',
        });
    }

    onMouseLeave() {
        this.setState({
            ikon: 'soknader.svg',
        });
    }

    render() {
        const { sykepengesoknad, fnr } = this.props;
        const perioder = sykepengesoknad.aktiviteter.map(a => { return a.periode; });
        const visStatus = sykepengesoknad.status !== NY;

        return (<article aria-labelledby={`soknader-header-${sykepengesoknad.id}`}>
            <Link className="inngangspanel js-panel" to={`/sykefravaer/${fnr}/sykepengesoknader/${sykepengesoknad.id}`}
                onMouseEnter={() => {this.onMouseEnter();}}
                onMouseLeave={() => {this.onMouseLeave();}}
            >
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`soknad-header-${sykepengesoknad.id}`}>
                            <small className="inngangspanel__meta js-meta">
                                {getLedetekst('soknad.teaser.dato', { '%DATO%': toDatePrettyPrint(sykepengesoknad.opprettetDato) }) }
                            </small>
                            <span className="inngangspanel__tittel">
                                {getLedetekst('soknad.teaser.tittel')}
                            </span>
                        </h3>
                        {
                            visStatus &&
                                <p className="inngangspanel__status js-status">
                                { getLedetekst(`soknad.teaser.status.${sykepengesoknad.status}`, { '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato || sykepengesoknad.sendtTilNAVDato) }) }
                                </p>
                        }
                    </header>
                    <p className="inngangspanel__tekst js-tekst">{getLedetekst('soknad.teaser.tekst',
                        {
                            '%FRA%': toDatePrettyPrint(tidligsteFom(perioder)),
                            '%TIL%': toDatePrettyPrint(senesteTom(perioder)) }
                        )
                    }</p>
                    <p className="inngangspanel__undertekst js-undertekst mute">
                        {getLedetekst('soknad.teaser.undertekst', { '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn }) }
                    </p>
                </div>
            </Link>
        </article>);
    }
}

SoknadTeaser.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
    fnr: PropTypes.string,
};

export default SoknadTeaser;
