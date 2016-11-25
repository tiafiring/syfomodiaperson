import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getTidFraZulu, getDatoFraZulu } from '../utils';
import Sidetopp from '../../components/Sidetopp';
import { Varselstripe } from 'digisyfo-npm';
import { Link } from 'react-router';

export const MotetidspunktValgt = () => {
    return <div className="motetidspunktValgt">Møtetidspunkt valgt, møteresultat sendt til partene</div>;
};

const MotebookingStatus = ({ fnr, mote }) => {
    const { alternativer, deltakere } = mote;
    const deltakerEpost = deltakere ? deltakere[0].epost : '?';
    const sendtDato = getDatoFraZulu(mote.opprettetTidspunkt);
    const arbeidsgiverDeltaker = deltakere.filter((deltaker) => {
        return deltaker.type === 'arbeidsgiver';
    })[0];
    const visVelgTidspunkt = mote.status === 'OPPRETTET' && arbeidsgiverDeltaker && arbeidsgiverDeltaker.svar.map((svar) => {
        return svar.valgt;
    }).length > 0;

    return (<div>
        <div className="panel">
            <Varselstripe type="suksess">
                <div>
                    <p className="typo-element">Møteforespørselen er sendt til {deltakerEpost}</p>
                    <p className="sist">Sendt: {sendtDato}</p>
                </div>
            </Varselstripe>
        </div>
        <div className="panel">
            <Sidetopp tittel="Status for møteforespørselen" />
            <h2 className="typo-undertittel blokk-s">Møtested</h2>
            <p className="blokk-l">{alternativer[0].sted}</p>
            <table className="motestatus blokk-l">
                <thead>
                    <tr>
                        <th className="motestatus__tittel">Møtetider</th>
                        {
                            alternativer.map((tidspunkt, index) => {
                                let className = null;
                                if (mote.valgtAlternativ && tidspunkt.id === mote.valgtAlternativ.id) {
                                    className = 'bekreftetTidspunkt';
                                }
                                return (<th className={className} key={index}>{getTidFraZulu(tidspunkt.tid)}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        deltakere && deltakere
                            .filter((deltaker) => {
                                return deltaker.type === 'arbeidsgiver';
                            })
                            .map((deltaker, index) => {
                                return (<tr key={index}>
                            <td><strong>Arbeidsgiver</strong> <span>{deltaker.navn}</span></td>
                            {
                                    deltaker.svar.map((tidspunkt, index2) => {
                                        let className = 'motestatus__svar';
                                        if (mote.valgtAlternativ && tidspunkt.id === mote.valgtAlternativ.id) {
                                            className = 'motestatus__svar motestatus__svar--bekreftetTidspunkt';
                                        }
                                        return (<td key={index2} className={className}>
                                            <MotebookingIkon deltaker={deltaker} index={index2} />
                                        </td>);
                                    })
                            }
                            </tr>);
                            })
                    }
                </tbody>
                {
                    visVelgTidspunkt && <tfoot>
                        <tr>
                            <td />
                            {
                                arbeidsgiverDeltaker.svar.map((svar, index) => {
                                    if (svar.valgt) {
                                        return (<td key={index} >
                                            <Link to={`/sykefravaer/${fnr}/mote/bekreft/${svar.id}`} className="js-velg-tidspunkt">Velg tidspunkt for møte</Link>
                                        </td>);
                                    }
                                    return <td key={index} />;
                                })
                            }
                        </tr>
                    </tfoot>
                }
                {
                    mote.status === 'BEKREFTET' && <tfoot>
                        <tr>
                            <td />
                            {
                                mote.alternativer.map((alternativ, index) => {
                                    return (<td key={index}>
                                        {alternativ.id === mote.valgtAlternativ.id && <MotetidspunktValgt />}
                                    </td>);
                                })
                            }
                        </tr>
                    </tfoot>
                }
            </table>
        </div>
        <div>
            <Link role="button" className="knapp" to={`/sykefravaer/${fnr}/mote/${mote.moteUuid}/avbryt`}>Avbryt møte</Link>
        </div>
    </div>);
};

MotebookingStatus.propTypes = {
    mote: PropTypes.shape({
        alternativer: PropTypes.arrayOf(PropTypes.shape({
            tid: PropTypes.string,
            sted: PropTypes.string,
        })),
        deltakere: PropTypes.arrayOf(PropTypes.shape({
            navn: PropTypes.string,
            epost: PropTypes.string,
            tidOgSted: PropTypes.array,
            type: PropTypes.string,
        })),
    }),
    fnr: PropTypes.string,
};

export default MotebookingStatus;
