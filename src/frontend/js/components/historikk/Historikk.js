import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import { toDatePrettyPrint, tilLesbarPeriodeMedArstall } from 'digisyfo-npm';
import HistorikkEvent from './HistorikkEvent';
import AppSpinner from '../../components/AppSpinner';
import IngenHistorikk from './IngenHistorikk';
import UtvidbarHistorikk from './UtvidbarHistorikk';
import Alertstripe from 'nav-frontend-alertstriper';
import Sidetopp from '../Sidetopp';

const Feilmelding = () => {
    return (<Alertstripe type="advarsel" className="blokk">
        <p>Det skjedde en feil! Det er ikke sikkert du får all historikken som finnes.</p>
    </Alertstripe>);
};

const Historikk = ({ historikk, sykeforloep }) => {
    const historikkEvents = historikk.moteHistorikk.concat(historikk.oppfoelgingsdialogHistorikkk);
    if (!sykeforloep || sykeforloep.length === 0 || (historikk.hentetMoter && historikk.hentetOppfoelgingsdialoger && historikkEvents.length === 0)) {
        return <IngenHistorikk />;
    }

    const sykeforloepSortert = sykeforloep
        .sort((s1, s2) => { return new Date(s2.oppfoelgingsdato) - new Date(s1.oppfoelgingsdato); });
    // Dette er en hack for at alle historikkEvents skal få en plassering i et sykefraværstilfellet, selv om de skjer "utenfor".
    for (let i = 0; i < sykeforloepSortert.length; i += 1) {
        if (i === (sykeforloepSortert.length - 1)) {
            sykeforloepSortert[i].skyggeFom = new Date(0);
        } else {
            sykeforloepSortert[i].skyggeFom = new Date(sykeforloepSortert[i + 1].sluttdato);
            sykeforloepSortert[i].skyggeFom.setDate(sykeforloepSortert[i].skyggeFom.getDate() + 1);
        }
    }

    const eventsEtterSisteSykefravaer = historikkEvents.filter((event) => {
        return new Date(event.tidspunkt) > new Date(sykeforloepSortert[0].sluttdato);
    });

    return (<div>
        {
            historikk.hentingFeilet && <Feilmelding />
        }
        <Sidetopp tittel="Logg" />
        <div>
            {
                historikk.henterOppfoelgingsdialoger || (historikk.henterMoter && <AppSpinner />)
            }
            {
                eventsEtterSisteSykefravaer.length > 0
                && (<Panel className="blokk">
                    <h2 className="panel__tittel">Hendelser</h2>
                    <ol className="historikkeventliste">
                        {
                            eventsEtterSisteSykefravaer
                                .sort((h1, h2) => {
                                    return new Date(h2.tidspunkt) - new Date(h1.tidspunkt);
                                })
                                .map((event, index) => {
                                    return (<HistorikkEvent event={event} key={index} />);
                                })
                        }
                    </ol>
                </Panel>)
            }
            {
                sykeforloepSortert.length > 0
                && (<div className="blokk--l">
                        <h2 className="panel__tittel">Sykefraværstilfeller</h2>
                        {
                            sykeforloepSortert
                                .map((forloep, index) => {
                                    return (<UtvidbarHistorikk key={index} tittel={tilLesbarPeriodeMedArstall(forloep.oppfoelgingsdato, forloep.sluttdato)}>
                                        <ol className="historikkeventliste">
                                            {
                                                historikkEvents
                                                    .sort((h1, h2) => {
                                                        return new Date(h2.tidspunkt) - new Date(h1.tidspunkt);
                                                    })
                                                    .map((event, idx) => {
                                                        if (new Date(forloep.skyggeFom) < new Date(event.tidspunkt) && new Date(event.tidspunkt) < new Date(forloep.sluttdato)) {
                                                            return <HistorikkEvent key={idx} event={event} />;
                                                        }
                                                        return null;
                                                    })
                                            }
                                        </ol>
                                    </UtvidbarHistorikk>);
                                })
                        }
                </div>)
            }
        </div>
    </div>);
};

Historikk.propTypes = {
    sykeforloep: PropTypes.array,
    historikk: PropTypes.object,
};

export default Historikk;
