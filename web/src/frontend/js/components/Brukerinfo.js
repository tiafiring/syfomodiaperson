import React, { PropTypes } from 'react';

const Brukerinfo = ({ navbruker, behandlendeEnhet }) => {
    return (<div className="grid">
        <div className="unit whole">
            <div className="brukerinfo">
                <h2 className="brukerinfo__navn">{navbruker.navn}</h2>
                <div className="personopplysninger">
                    <div className="personopplysning" style={{ display: 'inline-block', marginRight: '2em' }}>
                        <h3>Fødselsnr:</h3>
                        <p>{navbruker.fnr}</p>
                    </div>
                    <div className="personopplysning" style={{ display: 'inline-block' }}>
                        <h3>Behandlende enhet:</h3>
                        <p>{`${behandlendeEnhet.enhetId} - ${behandlendeEnhet.navn}`}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

Brukerinfo.propTypes = {
    behandlendeEnhet: PropTypes.object,
    navbruker: PropTypes.object,
};

export default Brukerinfo;
