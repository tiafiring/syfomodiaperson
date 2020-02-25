import React from 'react';
import PropTypes from 'prop-types';
import {
    getGjeldendeMotebehovOppgaver,
    getIkkeFullforteOppgaver,
} from '../../utils/veilederoppgaverUtils';
import {
    erMotebehovBehandlet,
    harUbehandletMotebehov,
    hentSistBehandletMotebehov,
} from '../../utils/motebehovUtils';
import { Checkbox } from 'nav-frontend-skjema';
import { toDatePrettyPrint } from '@navikt/digisyfo-npm';

export const behandleMotebehovOgVeilederoppgaver = (actions, fnr, veilederinfo, motebehovListe, ikkeFullforteOppgaver) => {
    if (harUbehandletMotebehov(motebehovListe)) {
        actions.behandleMotebehov(fnr, veilederinfo.ident);
    }
    ikkeFullforteOppgaver.forEach((oppgave) => {
        actions.behandleOppgave(oppgave.id, {
            status: 'FERDIG',
            sistEndretAv: veilederinfo.ident,
        }, fnr);
    });
};

export const BehandleMotebehovKnapp = (
    {
        actions,
        fnr,
        motebehovListe,
        oppgaver,
        veilederinfo,
    }) => {
    const gjeldendeOppgaver = getGjeldendeMotebehovOppgaver(oppgaver, motebehovListe);
    const ikkeFullforteOppgaver = getIkkeFullforteOppgaver(gjeldendeOppgaver);
    const sistBehandletMotebehov = hentSistBehandletMotebehov(motebehovListe);
    const erBehandlet = erMotebehovBehandlet(motebehovListe, gjeldendeOppgaver);

    return (<div className="panel behandleMotebehovKnapp">
        { (motebehovListe.length > 0 || gjeldendeOppgaver.length > 0)
            ? <div className="skjema__input">
                <Checkbox
                    label={erBehandlet ? `Ferdigbehandlet av ${sistBehandletMotebehov.behandletVeilederIdent} ${toDatePrettyPrint(sistBehandletMotebehov.behandletTidspunkt)}` : 'Marker som behandlet'}
                    onClick={() => {
                        behandleMotebehovOgVeilederoppgaver(actions, fnr, veilederinfo, motebehovListe, ikkeFullforteOppgaver);
                    }}
                    id="marker__utfoert"
                    disabled={erBehandlet}
                    checked={erBehandlet} />
            </div>
            : <p>Fant dessverre ingen oppgaver knyttet til denne avklaringen</p>
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
