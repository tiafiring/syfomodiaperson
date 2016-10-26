import React, { PropTypes } from 'react';
import MotebookingIkon from './MotebookingIkon';

const pad = (nr) => {
    return nr > 9 ? nr : `0${nr}`;
};

const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

const Varselstripe = ({ navn }) => {
    return (<div className="panel">
        <div className="varselstripe varselstripe--suksess">
            <div className="varselstripe__ikon">
                <img src="/sykefravaer/img/svg/suksess.svg" />
            </div>
            <p className="sist">Møteforespørselen er sendt til {navn}!</p>
        </div>
    </div>);
};

Varselstripe.propTypes = {
    navn: PropTypes.string,
};

const MotebookingStatus = ({ mote }) => {
    const { tidOgStedAlternativer, deltakere } = mote;
    const deltakerNavn = deltakere ? deltakere[0].navn : '?';

    return (<div>
        <Varselstripe navn={deltakerNavn} />
        <div className="panel">
            <header className="sidetopp">
                <h2 className="sidetopp__tittel">Status for møteforespørselen</h2>
            </header>
            <h2 className="typo-undertittel blokk--s">Møtested</h2>
            <p className="blokk--l">{tidOgStedAlternativer[0].sted}</p>
            <table className="motestatus">
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
            tidOgSted: PropTypes.array,
            type: PropTypes.string,
        })),
    }),
};

export default MotebookingStatus;

