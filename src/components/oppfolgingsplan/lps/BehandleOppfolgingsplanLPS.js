import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';
import { behandlePersonOppgave } from '../../../actions/personoppgave_actions';
import { isPersonOppgaveBehandlet } from '../../../utils/personOppgaveUtils';

export const BehandleOppfolgingsplanLPS = (
    {
        oppfolgingsplanLPS,
        veilederIdent,
    }) => {
    const dispatch = useDispatch();

    const opLPSPersonOppgave = oppfolgingsplanLPS.personoppgave;
    const erPersonOppgaveBehandlet = isPersonOppgaveBehandlet(opLPSPersonOppgave);
    return (
        <Checkbox
            label={'Marker som behandlet'}
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
    );
};

BehandleOppfolgingsplanLPS.propTypes = {
    oppfolgingsplanLPS: PropTypes.object,
    veilederIdent: PropTypes.string,
};

export default BehandleOppfolgingsplanLPS;
