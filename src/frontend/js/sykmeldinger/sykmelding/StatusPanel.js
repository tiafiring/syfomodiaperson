import React from 'react';
import PropTypes from 'prop-types';
import StatusOpplysning from './StatusOpplysning';

const StatusPanel = ({ sykmelding, ledetekster, nokkelopplysninger }) => {
    const html = nokkelopplysninger.map((rad, index1) => {
        return (<div className="rad-container" key={index1}>
            {
                rad.map((nokkelopplysning, index2) => {
                    return <StatusOpplysning key={index2} ledetekster={ledetekster} sykmelding={sykmelding} nokkelopplysning={nokkelopplysning} />;
                })
            }
        </div>);
    });
    return (
        <div className="panel blokk">
            {html}
        </div>);
};

StatusPanel.propTypes = {
    sykmelding: PropTypes.object,
    nokkelopplysninger: PropTypes.array,
    ledetekster: PropTypes.object,
};

export default StatusPanel;
