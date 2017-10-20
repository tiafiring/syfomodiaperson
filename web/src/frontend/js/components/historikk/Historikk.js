import React, { PropTypes } from 'react';
import HistorikkEvent from './HistorikkEvent';
import { toDatePrettyPrint } from 'digisyfo-npm';
import { Varselstripe } from 'digisyfo-npm';

const Historikk = ({ historikk, sykeforloep, noeFeilet }) => {
    return (<div>
        <div className="panel">
            <h1 style={{margin: 0}}>Historikk</h1>
        </div>
        <div>
            <div className="panel blokk--s">
                <Varselstripe type="feil" fylt>
                   <p>Det skjedde en feil</p>
                </Varselstripe>
            </div>
            { noeFeilet ? <p>Vi fikk ikke hentet alt</p> : null }
            <ol className="sykeforloepstilfelle">
            {
                sykeforloep.map((forloep, index) => {
                    return <li key={index} className="panel blokk--l">
                            <div>
                                <h2>Sykefraværstilfellet { toDatePrettyPrint(forloep.oppfoelgingsdato) } - { toDatePrettyPrint(forloep.sluttdato) }</h2>
                                <ol className="historikkevent">
                                    {
                                        historikk.map((event, index) => {
                                            if (new Date(forloep.oppfoelgingsdato) < new Date(event.tidspunkt) && new Date(event.tidspunkt) > new Date(forloep.oppfoelgingsdato)) {
                                                return <li key={index} className="historikkevent blokk--s"><HistorikkEvent event={event} /></li>;
                                            }
                                            return null;
                                        })
                                    }
                                </ol>
                            </div>
                    </li>;
                })
            }
            </ol>
        </div>
    </div>);
};

Historikk.propTypes = {
    noeFeilet: PropTypes.bool,
    sykeforloep: PropTypes.array,
    historikk: PropTypes.array,
};

export default Historikk;
