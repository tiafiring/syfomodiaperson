import React, { PropTypes } from 'react';

const NavBrukerinfo = ({ navBruker, fnr }) => {
    return (<div className="brukerInfo">
        <h2 className="typo-undertittel">{navBruker.navn}</h2>

        <div className="rad">
            <div className="kolonne kolonne--auto nokkelopplysning">
                <h3>Fødselsnr fra URL:</h3>
                <p>{fnr}</p>
            </div>
            <div className="kolonne nokkelopplysning">
                <h3>Arbeidssituasjon:</h3>
                <ul className="brukerinfo_arbeidssituasjoner">
                    <li>Arbeidstaker</li>
                    <li>Selvstendig næringsdrivende</li>
                </ul>
            </div>
        </div>
    </div>);
};

NavBrukerinfo.propTypes = {
    navBruker: PropTypes.object,
    fnr: PropTypes.string,
};

export default NavBrukerinfo;
