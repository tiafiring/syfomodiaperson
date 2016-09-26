import React, { PropTypes } from 'react';

const NavBrukerinfo = ({ navBruker }) => {
    return (<div className="brukerInfo">
        <h2 className="typo-undertittel">{navBruker.navn}</h2>

        <div className="rad">
            <div className="kolonne kolonne--auto nokkelopplysning">
                <h3>Fødselsnr:</h3>
                <p>{navBruker.fnr}</p>
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
    navn: PropTypes.string,
    fnr: PropTypes.string,
};

export default NavBrukerinfo;
