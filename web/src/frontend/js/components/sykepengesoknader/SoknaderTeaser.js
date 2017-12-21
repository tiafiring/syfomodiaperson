import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint } from 'digisyfo-npm';
import { sykepengesoknad as sykepengesoknadPt } from '../../propTypes';
import { NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT } from '../../enums/sykepengesoknadstatuser';

export const SendtUlikt = ({ sykepengesoknad }) => {
    return (<span>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato),
                '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
            })
        }
        <br />
        {
            getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilNAVDato),
            })
        }
    </span>);
};

SendtUlikt.propTypes = {
    sykepengesoknad: sykepengesoknadPt.isRequired,
};

export const erSendtTilBeggeMenIkkeSamtidig = (sykepengesoknad) => {
    return sykepengesoknad.sendtTilNAVDato && sykepengesoknad.sendtTilArbeidsgiverDato && sykepengesoknad.sendtTilNAVDato.getTime() !== sykepengesoknad.sendtTilArbeidsgiverDato.getTime();
};

export const getSendtTilSuffix = (sykepengesoknad) => {
    if (sykepengesoknad.sendtTilArbeidsgiverDato && sykepengesoknad.sendtTilNAVDato) {
        return '.til-arbeidsgiver-og-nav';
    }
    if (sykepengesoknad.sendtTilArbeidsgiverDato) {
        return '.til-arbeidsgiver';
    }
    if (sykepengesoknad.sendtTilNAVDato) {
        return '.til-nav';
    }
    return '';
};


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
        const visStatus = sykepengesoknad.status !== NY && sykepengesoknad.status !== SENDT;
        const sendtTilBeggeMenIkkeSamtidig = erSendtTilBeggeMenIkkeSamtidig(sykepengesoknad);

        return (<article aria-labelledby={`soknader-header-${sykepengesoknad.id}`}>
            <Link className="inngangspanel js-panel" to={`/sykefravaer/${fnr}/sykepengesoknader/${sykepengesoknad.id}`}
                onMouseEnter={() => {
                    this.onMouseEnter();
                }}
                onMouseLeave={() => {
                    this.onMouseLeave();
                }}
            >
             <span className="inngangspanel__ikon">
                <img className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} />
             </span>

                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`soknad-header-${sykepengesoknad.id}`}>
                            <small className="inngangspanel__meta js-meta">
                                {getLedetekst('soknad.teaser.dato', { '%DATO%': toDatePrettyPrint(sykepengesoknad.opprettetDato) })}
                            </small>
                            <span className="inngangspanel__tittel">
                            {getLedetekst('soknad.teaser.tittel')}
                        </span>
                        </h3>
                        {
                            visStatus &&
                            <p className="inngangspanel__status js-status">
                                {
                                    getLedetekst(`soknad.teaser.status.${sykepengesoknad.status}`, {
                                        '%DATO%': toDatePrettyPrint(sykepengesoknad.sendtTilArbeidsgiverDato || sykepengesoknad.sendtTilNAVDato),
                                    })
                                }
                            </p>
                        }
                    </header>
                    <p className="inngangspanel__tekst js-tekst">
                        {
                            getLedetekst('soknad.teaser.tekst', {
                                '%FRA%': toDatePrettyPrint(sykepengesoknad.fom),
                                '%TIL%': toDatePrettyPrint(sykepengesoknad.tom),
                            })
                        }
                    </p>
                    <p className="inngangspanel__undertekst js-undertekst mute">
                        {
                            (() => {
                                if (sykepengesoknad.status === AVBRUTT) {
                                    return getLedetekst('soknad.teaser.status.AVBRUTT', {
                                        '%DATO%': toDatePrettyPrint(new Date(sykepengesoknad.avbruttDato)),
                                    });
                                }
                                if (sykepengesoknad.status !== SENDT && sykepengesoknad.status !== TIL_SENDING) {
                                    return getLedetekst('soknad.teaser.undertekst', { '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn });
                                }
                                if (sendtTilBeggeMenIkkeSamtidig && sykepengesoknad.status !== NY) {
                                    return <SendtUlikt soknad={sykepengesoknad} />;
                                }
                                if (sykepengesoknad.status !== NY && sykepengesoknad.status !== UTKAST_TIL_KORRIGERING) {
                                    return getLedetekst(`soknad.teaser.status.${sykepengesoknad.status}${getSendtTilSuffix(sykepengesoknad)}`, {
                                        '%DATO%': toDatePrettyPrint(new Date(sykepengesoknad.sendtTilArbeidsgiverDato) || new Date(sykepengesoknad.sendtTilNAVDato)),
                                        '%ARBEIDSGIVER%': sykepengesoknad.arbeidsgiver.navn,
                                    });
                                }
                                return null;
                            })()
                        }
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
