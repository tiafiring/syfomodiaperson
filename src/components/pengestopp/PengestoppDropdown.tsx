import * as React from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import AlertStripe from "nav-frontend-alertstriper";
import { Checkbox, CheckboxGruppe } from "nav-frontend-skjema";
import { Element } from "nav-frontend-typografi";
import { restdatoTilLesbarDato } from "../../utils/datoUtils";
import {
  Arbeidsgiver,
  StatusEndring,
  Sykmelding,
} from "../../data/pengestopp/types/FlaggPerson";
import {
  arbeidsgivereWithStoppAutomatikkStatus,
  sykmeldingerToArbeidsgiver,
  uniqueArbeidsgivere,
} from "../../utils/pengestoppUtils";
import { SykmeldingOldFormat } from "../../data/sykmelding/types/SykmeldingOldFormat";

const texts = {
  tittel: "Beskjed til NAV Arbeid og ytelser er sendt",
  arsak: {
    title: "Årsak",
  },
  sendt: "Sendt: ",
};

interface IPengestoppDropdown {
  statusEndringList: StatusEndring[];
  sykmeldinger: SykmeldingOldFormat[];
}

const PengestoppDropdown = ({
  statusEndringList,
  sykmeldinger,
}: IPengestoppDropdown) => {
  const allArbeidsgivere = uniqueArbeidsgivere(
    sykmeldingerToArbeidsgiver(sykmeldinger)
  );

  const stoppedArbeidsgivere = arbeidsgivereWithStoppAutomatikkStatus(
    allArbeidsgivere,
    statusEndringList
  );

  const warning = (
    <AlertStripe type="suksess" form="inline">
      <Element>{texts.tittel}</Element>
    </AlertStripe>
  );
  const statusEndring = statusEndringList[0];
  return (
    <Ekspanderbartpanel tittel={warning}>
      <p>
        {texts.sendt}
        <time>{restdatoTilLesbarDato(statusEndring.opprettet)}</time>
      </p>
      <CheckboxGruppe>
        {stoppedArbeidsgivere.map(
          (arbeidsgiver: Arbeidsgiver, index: number) => {
            return (
              <Checkbox
                key={index}
                label={arbeidsgiver.navn}
                checked
                disabled
              />
            );
          }
        )}
      </CheckboxGruppe>
      {statusEndring.arsakList?.length > 0 && (
        <CheckboxGruppe legend={texts.arsak.title}>
          {statusEndring.arsakList.map((arsak, index: number) => {
            return <Checkbox key={index} label={arsak.type} checked disabled />;
          })}
        </CheckboxGruppe>
      )}
    </Ekspanderbartpanel>
  );
};

export default PengestoppDropdown;
