import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import { toDatePrettyPrint } from '@navikt/digisyfo-npm';
import { restdatoTilLesbarDato } from '../../../utils/datoUtils';
import { isPersonOppgaveBehandlet } from '../../../utils/personOppgaveUtils';
import BehandleOppfolgingsplanLPS from './BehandleOppfolgingsplanLPS';
import OppfolgingsplanLPSEtikett from './OppfolgingsplanLPSEtikett';

const texts = {
    buttonOpenPlan: 'Åpne oppfølgingsplanen(pdf)',
};

const RedDot = styled.span`
  height: 1em;
  width: 1em;
  background-color: #C30000;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5em;
`;

const UnderTittelInline = styled.h3`
  display: inline-block;
`;

const DivMarginBottom = styled.div`
  margin-bottom: 1em;
`;

const LPSPlanPanel = styled(Panel)`
  margin-bottom: 0.5em;
  padding: 2em 4em 2em 2em;
`;

export const ButtonOpenPlan = ({ oppfolgingsplanLPS }) => {
    return (
        <a
            className="lenke"
            href={`${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/dokument/lps/${oppfolgingsplanLPS.uuid}`}
            download="oppfølgingsplan"
        >
            {texts.buttonOpenPlan}
        </a>
    );
};
ButtonOpenPlan.propTypes = {
    oppfolgingsplanLPS: PropTypes.object,
};

const OppfolgingsplanerOversiktLPS = (
    {
        oppfolgingsplanLPSBistandsbehov,
        veilederIdent,
    }
) => {
    const pesonOppgave = oppfolgingsplanLPSBistandsbehov.personoppgave;
    const erPersonOppgaveBehandlet = isPersonOppgaveBehandlet(pesonOppgave);
    return (
        <LPSPlanPanel>
            { !erPersonOppgaveBehandlet &&
                <RedDot />
            }
            <UnderTittelInline className="panel__tittel">{oppfolgingsplanLPSBistandsbehov.virksomhetsnavn}</UnderTittelInline>
            <p>Mottatt: {restdatoTilLesbarDato(oppfolgingsplanLPSBistandsbehov.opprettet)}</p>
            { erPersonOppgaveBehandlet &&
                <p>
                    {`Ferdigbehandlet: ${toDatePrettyPrint(pesonOppgave.behandletTidspunkt)} av ${pesonOppgave.behandletVeilederIdent}`}
                </p>
            }
            <DivMarginBottom>
                <OppfolgingsplanLPSEtikett />
            </DivMarginBottom>
            <DivMarginBottom>
                <ButtonOpenPlan oppfolgingsplanLPS={oppfolgingsplanLPSBistandsbehov} />
            </DivMarginBottom>
            { !erPersonOppgaveBehandlet &&
                <BehandleOppfolgingsplanLPS
                    oppfolgingsplanLPS={oppfolgingsplanLPSBistandsbehov}
                    veilederIdent={veilederIdent}
                />
            }
        </LPSPlanPanel>
    );
};
OppfolgingsplanerOversiktLPS.propTypes = {
    fnr: PropTypes.string,
    oppfolgingsplanLPSBistandsbehov: PropTypes.object.isRequired,
    veilederIdent: PropTypes.string,
};

export default OppfolgingsplanerOversiktLPS;
