import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getHtmlLedetekst, getLedetekst } from 'digisyfo-npm';
import Side from '../sider/Side';
import { MOETEPLANLEGGER } from '../enums/menypunkter';
import { hentMoter } from '../actions/moter_actions';
import { hentMotebehov } from '../actions/motebehov_actions';
import AppSpinner from '../components/AppSpinner';
import Feilmelding from '../components/Feilmelding';
import { hentBegrunnelseTekst } from '../utils/tilgangUtils';
import { tilDatoMedUkedagOgMaanedNavn } from '../utils/datoUtils';

const moteMenypunkt = {
    navn: 'Møte',
    sti: 'mote',
    punkt: 'MOTE',
};

const avklaringMenypunkt = {
    navn: 'Møtebehov',
    sti: 'motebehov',
    punkt: 'MOTEBEHOV',
};

const setNavn = (mote) => {
    if (mote) {
        if (mote.status === 'BEKREFTET') {
            return 'Bekreftet møte';
        }
        return 'Se møtestatus';
    }
    return 'Book møte';
};

const setUndertittel = (punkt, mote) => {
    let undertittel;
    if (mote) {
        if (mote.status === 'BEKREFTET' && mote.bekreftetAlternativ) {
            undertittel = `Dialogmøte ${tilDatoMedUkedagOgMaanedNavn(mote.bekreftetAlternativ.tid)}`;
        } else if (mote.opprettetTidspunkt) {
            undertittel = `Møteforespørsel sendt ${tilDatoMedUkedagOgMaanedNavn(mote.opprettetTidspunkt)}`;
        }
    } else {
        undertittel = 'Ingen møter planlagt';
    }

    if (punkt === 'MOTEBEHOV') {
        undertittel = 'Avklaring om dialogmøte';
    }
    return undertittel;
};

export class MotelandingssideSide extends Component {
    constructor(props = false) {
        super(props);
        this.props.hentMoter(this.props.fnr);
        this.props.hentMotebehov(this.props.fnr);
    }

    render() {
        const {
            fnr,
            mote,
            henter,
            hentingFeilet,
            tilgang,
            ledetekster,
        } = this.props;
        this.menypunkter = [moteMenypunkt, avklaringMenypunkt];
        return (<Side fnr={fnr} tittel="Møtelandingsside" aktivtMenypunkt={MOETEPLANLEGGER}>
            {
                (() => {
                    if (henter) {
                        return <AppSpinner />;
                    }
                    if (!tilgang.harTilgang) {
                        return (<Feilmelding
                            tittel={getLedetekst('sykefravaer.veileder.feilmelding.tittel', ledetekster)}
                            melding={getHtmlLedetekst(hentBegrunnelseTekst(tilgang.begrunnelse), ledetekster)}
                        />);
                    }
                    if (hentingFeilet) {
                        return <Feilmelding />;
                    }
                    return (<div className="moteLandingsside">
                        <div className="panel motelandingsside__header">
                            <h1>
                                {getLedetekst('mote.motelandingsside.sidetittel', ledetekster)}
                            </h1>
                        </div>
                        <ul aria-label="Navigasjon" className="motelandingsside__punktliste">
                            {
                                this.menypunkter.map(({ navn, sti, punkt }, index) => {
                                    const undertittel = setUndertittel(punkt, mote);
                                    if (punkt === 'MOTE') {
                                        navn = setNavn(mote);
                                    }
                                    return (<li key={index} className="navigasjon__element">
                                        <Link
                                            className="motelandingsside__panel"
                                            to={`/sykefravaer/${fnr}/${sti}`}>
                                            <img className="motelandingsside__ikon" src="/sykefravaer/img/svg/moteikon_blaabg.svg" alt="moteikon" />
                                            <div className="inngangspanel__innhold">
                                                <header className="inngangspanel__header">
                                                    <h3 className="js-title" id={`soknad-header-${sti}`}>
                                                        <span className="inngangspanel__tittel">
                                                            {navn}
                                                        </span>
                                                    </h3>
                                                </header>
                                                <p className="inngangspanel__tekst js-tekst">{undertittel}</p>
                                            </div>
                                        </Link>
                                    </li>);
                                })
                            }
                        </ul>
                    </div>);
                })()
            }
        </Side>);
    }
}

MotelandingssideSide.propTypes = {
    fnr: PropTypes.string,
    mote: PropTypes.object,
    motebehovet: PropTypes.object,
    hentMotebehov: PropTypes.func,
    tilgang: PropTypes.object,
    hentMoter: PropTypes.func,
    henter: PropTypes.bool,
    ledetekster: PropTypes.object,
    hentingFeilet: PropTypes.bool,
};

export const mapStateToProps = (state, ownProps) => {
    const aktivtMote = state.moter.data.filter((mote) => {
        return mote.status !== 'AVBRUTT';
    })[0];

    return {
        fnr: ownProps.params.fnr,
        mote: aktivtMote,
        henter: state.moter.henter || state.motebehov.henter || state.ledetekster.henter || state.tilgang.henter,
        ledetekster: state.ledetekster.data,
        hentingFeilet: state.tilgang.hentingFeilet || state.ledetekster.hentingFeilet,
        tilgang: state.tilgang.data,
        motebehovet: state.motebehov.data[0],
    };
};

export const mapDispatchToProps = {
    hentMoter,
    hentMotebehov,
};

const MotelandingssideContainer = connect(mapStateToProps, mapDispatchToProps)(MotelandingssideSide);

export default MotelandingssideContainer;
