import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import AlertStripe from 'nav-frontend-alertstriper';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { tilDatoMedUkedagOgManedNavn } from '../../utils/datoUtils';
import { Arbeidsgiver } from '../../types/FlaggPerson';

const texts = {
    tittel: 'Automatisk utbetaling av sykepenger er stoppet',
    stans: 'Stanset: ',
};

interface IPengestoppDropdown {
    dato: Date
    stoppedArbeidsgivere: Arbeidsgiver[]
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
