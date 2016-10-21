import React, { PropTypes } from 'react';

const pad = (nr) => {
    return nr > 9 ? nr : `0${nr}`;
};

const getTidFraZulu = (zulutid) => {
    const d = new Date(zulutid);
    const dag = pad(d.getDate());
    const maned = pad(d.getMonth() + 1);
    return `${dag}.${maned}.${d.getFullYear()} kl. ${pad(d.getHours())}.${pad(d.getMinutes())}`;
};

const MotebookingStatus = ({ mote }) => {
    const { tidOgStedAlternativer, deltakere } = mote;
    return (<div>
        <div className="panel">
            <div className="varselstripe varselstripe--suksess">
                <div className="varselstripe__ikon">
                    <img src="/sykefravaer/img/svg/suksess.svg" />
                </div>
                <p className="sist">Møteforespørselen er sendt til {deltakere[0].navn}!</p>
            </div>
        </div>
        <div className="panel">
            <h2 className="typo-innholdstittel">Oversikt over møtetider</h2>
            <p className="redaksjonelt">Her ser du en oversikt over alle deltakere som har svart på møteforespørselen din. </p>
            <table className="motestatus">
                <thead>
                    <tr>
                        <th className="typo-undertittel">Møtetider</th>
                        {
                            tidOgStedAlternativer.map((tidspunkt, index) => {
                                return (<th key={index}>{getTidFraZulu(tidspunkt.tid)}</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        deltakere.map((deltaker, index) => {
                            return (<tr key={index}>
                            <td><strong>Arbeidsgiver</strong> <span>{deltaker.navn}</span></td>
                                {
                                    tidOgStedAlternativer.map((tidspunkt, index2) => {
                                        return (<td key={index2} className="motestatus__svar">
                                            <span className="motestatus__svar__inner">?</span>
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
    mote: PropTypes.object,
};

export default MotebookingStatus;

