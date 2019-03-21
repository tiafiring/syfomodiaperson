import React from 'react';
import PropTypes from 'prop-types';
import {
    getGjeldendeMotebehovOppgaver,
    getIkkeFullforteOppgaver,
    getSistEndretOppgave,
} from '../../utils/veilederoppgaverUtils';
import { Checkbox } from 'nav-frontend-skjema';
import { toDatePrettyPrint } from '@navikt/digisyfo-npm';

export const BehandleMotebehovKnapp = (
    {
        actions,
        fnr,
        motebehovListe,
        oppgaver,
        veilederinfo,
    }) => {
    const gjeldendeOppgaver = getGjeldendeMotebehovOppgaver(oppgaver, motebehovListe);
    const sistEndretOppgave = getSistEndretOppgave(gjeldendeOppgaver);
    const ikkeFullforteOppgaver = getIkkeFullforteOppgaver(gjeldendeOppgaver);
    const erAlleOppgaverFullfort = ikkeFullforteOppgaver.length === 0;
    return (<div className="panel behandleMotebehovKnapp">
        {gjeldendeOppgaver.length > 0 ?
            <div className="skjema__input">
                <Checkbox
                    label={erAlleOppgaverFullfort ? `Ferdig behandlet av ${sistEndretOppgave.sistEndretAv} ${toDatePrettyPrint(sistEndretOppgave.sistEndret)}` : 'Marker som behandlet'}
                    onClick={() => {
                        ikkeFullforteOppgaver.forEach((oppgave) => {
                            actions.behandleOppgave(oppgave.id, {
                                status: 'FERDIG',
                                sistEndretAv: veilederinfo.ident,
                            }, fnr);
                        });
                    }}
                    id="marker__utfoert"
                    disabled={erAlleOppgaverFullfort}
                    checked={erAlleOppgaverFullfort} />
            </div> : <p>Fant dessverre ingen oppgaver knyttet til denne avklaringen</p>
        }
    </div>);
};

BehandleMotebehovKnapp.propTypes = {
    actions: PropTypes.object,
    fnr: PropTypes.string,
    motebehovListe: PropTypes.arrayOf(PropTypes.object),
    oppgaver: PropTypes.arrayOf(PropTypes.object),
    veilederinfo: PropTypes.object,
};

export default BehandleMotebehovKnapp;
