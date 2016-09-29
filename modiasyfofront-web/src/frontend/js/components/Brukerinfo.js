import React, { PropTypes } from 'react';

const Brukerinfo = ({ navBruker, fnr }) => {
    return (<div className="brukerInfo">
        <h2 className="typo-undertittel">{navBruker.navn}</h2>

        <div className="rad nokkelopplysninger">
            <div className="kolonne kolonne--auto nokkelopplysning">
                <h3>Fødselsnr:</h3>
                <p>{fnr}</p>
            </div>
        </div>
    </div>);
};

Brukerinfo.propTypes = {
    navBruker: PropTypes.object,
    fnr: PropTypes.string,
};

export default Brukerinfo;
