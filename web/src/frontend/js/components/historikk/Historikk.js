import React, { PropTypes } from 'react';
import HistorikkEvent from './HistorikkEvent';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { Varselstripe } from 'digisyfo-npm';
import AppSpinner from '../AppSpinner';

const Historikk = ({ historikk, sykeforloep }) => {
    return (<div>
        <div className="panel">
            <h1 style={{ margin: 0 }}>Historikk</h1>
        </div>
        <div>
            {
                historikk.hentingFeilet ? <div className="panel blokk--s">
                    <Varselstripe type="feil" fylt>
                       <p>Det skjedde en feil! Det er ikke sikkert du får all historikken som finnes!</p>
                    </Varselstripe>
                </div>
                : null
            }
            {
                historikk.henterOppfoelgingsdialoger || historikk.henterMoter && <AppSpinner />
            }
            <ol className="sykeforloepstilfelle">
            {
                sykeforloep
                    .sort((s1, s2) => { return new Date(s2.oppfoelgingsdato) - new Date(s1.oppfoelgingsdato); })
                    .map((forloep, index) => {
                        return (<li key={index} className="panel blokk--l">
                            <div>
                                <h2>Sykefraværstilfellet { toDatePrettyPrint(forloep.oppfoelgingsdato) } - { toDatePrettyPrint(forloep.sluttdato) }</h2>
                                <ol className="historikkevent">
                                    {
                                        historikk.data
                                            .sort((h1, h2) => {
                                                return new Date(h2.tidspunkt) - new Date(h1.tidspunkt);
                                            })
                                            .map((event, idx) => {
                                                if (new Date(forloep.oppfoelgingsdato) < new Date(event.tidspunkt) && new Date(event.tidspunkt) < new Date(forloep.sluttdato)) {
                                                    return <li key={idx} className="historikkevent blokk--s"><HistorikkEvent event={event} /></li>;
                                                }
                                                return null;
                                            })
                                    }
                                </ol>
                            </div>
                        </li>);
                    })
            }
            </ol>
        </div>
    </div>);
};

Historikk.propTypes = {
    sykeforloep: PropTypes.array,
    historikk: PropTypes.object,
};

export default Historikk;
