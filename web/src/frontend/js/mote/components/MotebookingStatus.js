import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';
import { getTidFraZulu, getDatoFraZulu } from '../utils';
import Sidetopp from '../../components/Sidetopp';

export const Varselstripe = ({ navn, dato }) => {
    return (<div className="panel">
        <div className="varselstripe varselstripe--suksess">
            <div className="varselstripe__ikon">
                <img src="/sykefravaer/img/svg/suksess.svg" />
            </div>
            <p className="typo-element">Møteforespørselen er sendt til {navn}</p>
            <p className="sist">Sendt: {dato}</p>
        </div>
    </div>);
};

Varselstripe.propTypes = {
    navn: PropTypes.string,
    dato: PropTypes.string,
};

const MotebookingStatus = ({ mote, avbrytMote, avbryter, avbrytFeilet }) => {
    const { tidOgStedAlternativer, deltakere } = mote;
    const deltakerNavn = deltakere ? deltakere[0].navn : '?';
    const sendtDato = getDatoFraZulu(mote.opprettetTidspunkt);

    return (<div>
        <Varselstripe navn={deltakerNavn} dato={sendtDato} />
        <div className="panel">
            <Sidetopp tittel="Status for møteforespørselen" />
            <h2 className="typo-undertittel blokk--s">Møtested</h2>
            <p className="blokk--l">{tidOgStedAlternativer[0].sted}</p>
            <table className="motestatus blokk--l">
                <thead>
                    <tr>
                        <th className="motestatus__tittel">Møtetider</th>
                        {
                            tidOgStedAlternativer.map((tidspunkt, index) => {
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
                                    deltaker.tidOgSted.map((tidspunkt, index2) => {
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
            <div aria-live="polite" role="alert" className={avbrytFeilet ? 'blokk' : ''}>
                { avbrytFeilet && <p>Beklager, det oppstod en feil. Prøv igjen litt senere.</p>}
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
        tidOgStedAlternativer: PropTypes.arrayOf(PropTypes.shape({
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

