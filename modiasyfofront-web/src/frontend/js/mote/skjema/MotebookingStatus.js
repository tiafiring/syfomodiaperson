import React, { PropTypes } from 'react';

const MotebookingStatus = ({ mote }) => {
    const { tidspunkter, deltakere } = mote;
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
                        <th>Møtetider</th>
                        {
                            tidspunkter.map((tidspunkt, index) => {
                                return (<th key={index}>(dato) kl. (klokkeslett</th>);
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        deltakere.map((deltaker, index) => {
                           return (<tr key={index}>
                            <td>{deltaker.navn}</td>
                                {
                                    tidspunkter.map((tidspunkt, index2) => {
                                        return (<td key={index2}>?</td>);
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

