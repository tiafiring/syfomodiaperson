import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { getLedetekst, toDatePrettyPrint, sykepengesoknadstatuser } from 'digisyfo-npm';
import { soknadEllerSykepengesoknad } from '../../propTypes';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadstyper';

const { NY, SENDT, TIL_SENDING, UTKAST_TIL_KORRIGERING, AVBRUTT } = sykepengesoknadstatuser;

export const SendtUlikt = ({ soknad }) => {
    return (<span>
        {
            getLedetekst('soknad.teaser.status.SENDT.til-arbeidsgiver', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato),
                '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
            })
        }
        <br />
        {
            getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                '%DATO%': toDatePrettyPrint(soknad.sendtTilNAVDato),
            })
        }
    </span>);
};

SendtUlikt.propTypes = {
    soknad: soknadEllerSykepengesoknad,
};

export const erSendtTilBeggeMenIkkeSamtidig = (sykepengesoknad) => {
    return sykepengesoknad.sendtTilNAVDato
        && sykepengesoknad.sendtTilArbeidsgiverDato
        && sykepengesoknad.sendtTilNAVDato.getTime() !== sykepengesoknad.sendtTilArbeidsgiverDato.getTime();
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

const TeaserStatus = ({ soknad }) => {
    const vis = soknad.status !== NY && soknad.status !== SENDT && soknad.status !== AVBRUTT;
    return vis
        ? (<p className="inngangspanel__status js-status">
            {
                getLedetekst(`soknad.teaser.status.${soknad.status}`, {
                    '%DATO%': toDatePrettyPrint(soknad.sendtTilArbeidsgiverDato || soknad.sendtTilNAVDato),
                })
            }
        </p>)
        : null;
};

TeaserStatus.propTypes = {
    soknad: soknadEllerSykepengesoknad,
};

const TeaserHeader = ({ soknad }) => {
    return (<header className="inngangspanel__header">
        <h3 className="js-title" id={`soknad-header-${soknad.id}`}>
            <small className="inngangspanel__meta js-meta">
                {getLedetekst('soknad.teaser.dato', { '%DATO%': toDatePrettyPrint(soknad.opprettetDato) })}
            </small>
            <span className="inngangspanel__tittel">
                {getLedetekst('soknad.teaser.tittel')}
            </span>
        </h3>
        <TeaserStatus soknad={soknad} />
    </header>);
};

TeaserHeader.propTypes = {
    soknad: soknadEllerSykepengesoknad,
};

const beregnUndertekst = (soknad) => {
    if (soknad.status === AVBRUTT) {
        return getLedetekst('soknad.teaser.status.AVBRUTT', {
            '%DATO%': toDatePrettyPrint(new Date(soknad.avbruttDato)),
        });
    }
    if (soknad.status !== SENDT
        && soknad.status !== TIL_SENDING
        && !soknad.soknadstype) {
        return getLedetekst('soknad.teaser.undertekst', {
            '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
        });
    }
    if (erSendtTilBeggeMenIkkeSamtidig(soknad) && soknad.status !== NY) {
        return <SendtUlikt soknad={soknad} />;
    }
    if (soknad.status === NY && soknad.soknadstype === OPPHOLD_UTLAND) {
        return null;
    }
    if (soknad.status !== NY && soknad.status !== UTKAST_TIL_KORRIGERING) {
        if (
            (soknad.soknadstype === OPPHOLD_UTLAND
                || soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE)
            && soknad.status === SENDT) {
            return getLedetekst('soknad.teaser.status.SENDT.til-nav', {
                '%DATO%': toDatePrettyPrint(soknad.innsendtDato),
            });
        }
        return getLedetekst(`soknad.teaser.status.${soknad.status}${getSendtTilSuffix(soknad)}`, {
            '%DATO%': soknad.sendtTilArbeidsgiverDato
                ? toDatePrettyPrint(new Date(soknad.sendtTilArbeidsgiverDato))
                : toDatePrettyPrint(new Date(soknad.sendtTilNAVDato)),
            '%ARBEIDSGIVER%': soknad.arbeidsgiver.navn,
        });
    }
    return null;
};

export const TeaserUndertekst = ({ soknad }) => {
    const tekst = beregnUndertekst(soknad);
    return tekst
        ? <p className="inngangspanel__undertekst js-undertekst mute">{tekst}</p>
        : null;
};

TeaserUndertekst.propTypes = {
    soknad: soknadEllerSykepengesoknad,
};

const TeaserPeriode = ({ soknad }) => {
    return (<p className="inngangspanel__tekst js-tekst">
        {
            getLedetekst('soknad.teaser.tekst-2', {
                '%FRA%': toDatePrettyPrint(soknad.fom),
                '%TIL%': toDatePrettyPrint(soknad.tom),
            })
        }
    </p>);
};

TeaserPeriode.propTypes = {
    soknad: soknadEllerSykepengesoknad,
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
        const { soknad, fnr } = this.props;

        return (<article aria-labelledby={`soknader-header-${soknad.id}`}>
            <Link
                className="inngangspanel js-panel"
                to={`/sykefravaer/${fnr}/sykepengesoknader/${soknad.id}`}
                onMouseEnter={() => {
                    this.onMouseEnter();
                }}
                onMouseLeave={() => {
                    this.onMouseLeave();
                }}>
                <span className="inngangspanel__ikon">
                    <img className="js-ikon" src={`/sykefravaer/img/svg/${this.state.ikon}`} alt="inngangspanel" />
                </span>
                <div className="inngangspanel__innhold">
                    <TeaserHeader soknad={soknad} />
                    <TeaserPeriode soknad={soknad} />
                    <TeaserUndertekst soknad={soknad} />
                </div>
            </Link>
        </article>);
    }
}

SoknadTeaser.propTypes = {
    soknad: soknadEllerSykepengesoknad.isRequired,
    fnr: PropTypes.string,
};

export default SoknadTeaser;
