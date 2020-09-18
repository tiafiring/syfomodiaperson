import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Panel from 'nav-frontend-paneler';
import { Checkbox } from 'nav-frontend-skjema';
import { toDatePrettyPrint } from '@navikt/digisyfo-npm';
import { behandlePersonOppgave } from '../../../actions/personoppgave_actions';
import { isPersonOppgaveBehandlet } from '../../../utils/personOppgaveUtils';

const behandleOppfolgingsplanLPSLabel = (opLPSPersonOppgave) => {
    return isPersonOppgaveBehandlet(opLPSPersonOppgave)
        ? `Ferdigbehandlet av ${opLPSPersonOppgave.behandletVeilederIdent} ${toDatePrettyPrint(opLPSPersonOppgave.behandletTidspunkt)}`
        : 'Marker som behandlet';
};

const BehandlOppfolgingsplanLPSPanel = styled(Panel)`
    margin-bottom: 1em;
    border: 1px solid #C6C2BF;
    .skjemaelement {
        margin: 0;
    }
`;

export const BehandleOppfolgingsplanLPS = (
    {
        oppfolgingsplanLPS,
        veilederIdent,
    }) => {
    const dispatch = useDispatch();

    const opLPSPersonOppgave = oppfolgingsplanLPS.personoppgave;
    const erPersonOppgaveBehandlet = isPersonOppgaveBehandlet(opLPSPersonOppgave);
    return (
        <BehandlOppfolgingsplanLPSPanel>
            <Checkbox
                label={behandleOppfolgingsplanLPSLabel(opLPSPersonOppgave)}
                onClick={() => {
                    dispatch(behandlePersonOppgave(
                        opLPSPersonOppgave.uuid,
                        oppfolgingsplanLPS.uuid,
                        veilederIdent
                    ));
                }}
                id="behandle_personoppgave"
                disabled={erPersonOppgaveBehandlet}
                checked={erPersonOppgaveBehandlet}
            />
        </BehandlOppfolgingsplanLPSPanel>
    );
};

BehandleOppfolgingsplanLPS.propTypes = {
    oppfolgingsplanLPS: PropTypes.object,
    veilederIdent: PropTypes.string,
};

export default BehandleOppfolgingsplanLPS;
