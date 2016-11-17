import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getTidFraZulu, getDatoFraZulu } from '../utils';
import Sidetopp from '../../components/Sidetopp';
import { Varselstripe } from 'digisyfo-npm';

const MotebookingStatus = ({ mote, avbrytMote, avbryter, avbrytFeilet }) => {
    const { alternativer, deltakere } = mote;
    const deltakerEpost = deltakere ? deltakere[0].epost : '?';
    const sendtDato = getDatoFraZulu(mote.opprettetTidspunkt);
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
                                return (<th key={index}>{getTidFraZulu(tidspunkt.tid)}</th>);
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
                                        return (<td key={index2} className="motestatus__svar">
                                            <MotebookingIkon deltaker={deltaker} index={index2} />
                                        </td>);
                                    })
                            }
                            </tr>);
                            })
                    }
                </tbody>
            </table>
            <div aria-live="polite" role="alert">
                { avbrytFeilet && <div className="blokk"><Varselstripe type="feil"><p>Beklager, det oppstod en feil. Prøv igjen litt senere.</p></Varselstripe></div>}
            </div>
            <div>
                <button disabled={avbryter} className="rammeknapp js-avbryt" onClick={() => {
                    avbrytMote(mote.moteUuid);
                }}>Nytt tidspunkt</button>
            </div>
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
    avbrytMote: PropTypes.func,
    avbryter: PropTypes.bool,
    avbrytFeilet: PropTypes.bool,
};

export default MotebookingStatus;

