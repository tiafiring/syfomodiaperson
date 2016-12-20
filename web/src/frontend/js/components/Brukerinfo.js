import React, { PropTypes } from 'react';

const Brukerinfo = ({ navbruker }) => {
    return (<div className="grid">
        <div className="unit whole">
            <div className="brukerinfo">
                <h2 className="brukerinfo__navn">{navbruker.navn}</h2>

                <div className="rad nokkelopplysninger">
                    <div className="kolonne nokkelopplysning">
                        <h3>Fødselsnr:</h3>
                        <p>{navbruker.fnr}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

Brukerinfo.propTypes = {
    navbruker: PropTypes.object,
    fnr: PropTypes.string,
};

export default Brukerinfo;
