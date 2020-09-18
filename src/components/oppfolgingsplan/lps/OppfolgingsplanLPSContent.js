import React from 'react';
import PropTypes from 'prop-types';
import OppfolgingsplanLPSEtikett from './OppfolgingsplanLPSEtikett';
import BehandleOppfolgingsplanLPS from './BehandleOppfolgingsplanLPS';

const texts = {
    buttonDownload: 'Last ned oppfølgingsplan',
};

export const ButtonDownload = ({ oppfolgingsplanLPS }) => {
    return (
        <div>
            <a
                className="lenke"
                href={`${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/lps/${oppfolgingsplanLPS.uuid}`}
                download="oppfølgingsplan"
            >
                {texts.buttonDownload}
            </a>
        </div>
    );
};
ButtonDownload.propTypes = {
    oppfolgingsplanLPS: PropTypes.object,
};

const OppfolgingsplanLPSContent = (
    {
        oppfolgingsplanLPS,
        veilederIdent,
    }
) => {
    return (
        <div>
            <BehandleOppfolgingsplanLPS
                oppfolgingsplanLPS={oppfolgingsplanLPS}
                veilederIdent={veilederIdent}
            />
            <div className="panel">
                <p>Virksomhetsnummer: {oppfolgingsplanLPS.virksomhetsnummer}</p>
                <p>Virksomhetsnavn: {oppfolgingsplanLPS.virksomhetsnavn}</p>
                <ButtonDownload oppfolgingsplanLPS={oppfolgingsplanLPS} />
                <OppfolgingsplanLPSEtikett />
            </div>
        </div>
    );
};

OppfolgingsplanLPSContent.propTypes = {
    oppfolgingsplanLPS: PropTypes.object,
    veilederIdent: PropTypes.string,
};

export default OppfolgingsplanLPSContent;
