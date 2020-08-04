import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { tilDatoMedUkedagOgManedNavn } from '../../utils/datoUtils';
import { Arbeidsgiver } from './Pengestopp';

const texts = {
    tittel: 'Automatisk behandling av sykepenger er stanset',
    stans: 'Stanset: ',
    gosys: 'Lag oppgave i GoSys'
};

interface IPengestoppDropdown {
    dato: Date
    stoppedArbeidsgivere: Array<Arbeidsgiver>
}

const PengestoppDropdown = ({ dato, stoppedArbeidsgivere }: IPengestoppDropdown) => {
    const warning =
        <AlertStripe type="feil" form="inline">
            <Element>{texts.tittel}</Element>
        </AlertStripe>;
    return (
        <Ekspanderbartpanel tittel={warning}>
            <p>{texts.stans}<time>{tilDatoMedUkedagOgManedNavn(dato)}</time></p>
            <CheckboxGruppe>
                {
                    stoppedArbeidsgivere.map((arbeidsgiver: Arbeidsgiver, index: number) => {
                        return <Checkbox key={index} label={arbeidsgiver.navn} checked disabled />;
                    })
                }
            </CheckboxGruppe>
        </Ekspanderbartpanel>
    );
};

export default PengestoppDropdown;
