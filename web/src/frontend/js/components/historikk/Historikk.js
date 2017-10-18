import React, { PropTypes } from 'react';
import Sidetopp from '../Sidetopp';
import HistorikkEvent from './HistorikkEvent';

const Historikk = ({ historikk }) => {
    return (<div>
        <div className="panel">
            <Sidetopp tittel="Historikk" />
        </div>
        <div className="panel">
            <h2>Sykefraværstilfellet 23.04.2017 - NÅ</h2>
            <ol style={{padding: 0}}>
            {
                historikk.map((event) => {
                    return <li className="historikkevent blokk--s"><HistorikkEvent event={event} /></li>;
                })
            }
            </ol>
        </div>
    </div>);
};

Historikk.propTypes = {
    historikk: PropTypes.array,
};

export default Historikk;
