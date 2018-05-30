import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'nav-frontend-paneler';
import {
    toDatePrettyPrint,
    Varselstripe,
} from 'digisyfo-npm';
import HistorikkEvent from './HistorikkEvent';
import AppSpinner from '../../components/AppSpinner';
import IngenHistorikk from './IngenHistorikk';
import UtvidbarHistorikk from './UtvidbarHistorikk';

const Feilmelding = () => {
    return (<Panel className="blokk--s">
        <Varselstripe type="feil" fylt>
            <p>Det skjedde en feil! Det er ikke sikkert du får all historikken som finnes!</p>
        </Varselstripe>
    </Panel>);
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
        <Panel>
            <h1 style={{ margin: 0 }}>Logg</h1>
        </Panel>
        <div>
            {
                historikk.henterOppfoelgingsdialoger || (historikk.henterMoter && <AppSpinner />)
            }
            <Panel>
                { eventsEtterSisteSykefravaer.length > 0 &&
                    <ol className="historikkevent">
                        {
                            eventsEtterSisteSykefravaer
                                .sort((h1, h2) => {
                                    return new Date(h2.tidspunkt) - new Date(h1.tidspunkt);
                                })
                                .map((event, index) => {
                                    return (<li className="blokk--s" key={index}>
                                        <HistorikkEvent event={event} key={index} />
                                    </li>);
                                })
                        }
                    </ol>
                }
                <ol className="sykeforloepstilfelle">
                    { sykeforloepSortert
                        .map((forloep, index) => {
                            return (<li key={index} className="blokk--l">
                                <div>
                                    <UtvidbarHistorikk
                                        head={<h2>Sykefraværstilfellet { toDatePrettyPrint(forloep.oppfoelgingsdato) } - { toDatePrettyPrint(forloep.sluttdato) }</h2>}
                                        body={<ol className="historikkevent">
                                            { historikkEvents
                                                .sort((h1, h2) => {
                                                    return new Date(h2.tidspunkt) - new Date(h1.tidspunkt);
                                                })
                                                .map((event, idx) => {
                                                    if (new Date(forloep.skyggeFom) < new Date(event.tidspunkt) && new Date(event.tidspunkt) < new Date(forloep.sluttdato)) {
                                                        return <li key={idx} className="blokk--s"><HistorikkEvent event={event} /></li>;
                                                    }
                                                    return null;
                                                })
                                            }
                                        </ol>}
                                    />
                                </div>
                            </li>);
                        })
                    }
                </ol>
            </Panel>
        </div>
    </div>);
};

Historikk.propTypes = {
    sykeforloep: PropTypes.array,
    historikk: PropTypes.object,
};

export default Historikk;
