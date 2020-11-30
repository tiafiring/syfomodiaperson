import React, { useEffect, useState } from "react";
import { Column, Row } from "nav-frontend-grid";
import { Normaltekst } from "nav-frontend-typografi";
import { VedtakDTO } from "../../reducers/vedtak";
import {
  estimertMaksdato,
  refusjonTilUtbetalingsbelopBrutto,
  refusjonTilUtbetalingsdager,
  VedtakFagomrade,
} from "../../utils/vedtakUtils";
import { ValutaFormat } from "../../utils/valutaUtils";
import { VedtakInfopanelRow } from "./VedtakInfopanel";

const texts = {
  utbetalingsdager: "Utbetalingsdager",
  utbetalingsbelopDag: "Beløp per dag",
  utbetalingsbelopBrutto: "Sykepengebeløp brutto",
  utbetalingsMottaker: "Refundert til",
  utbetalingsMottakerArbeidsgiver: "Arbeidsgiver",
  utbetalingsMottakerArbeidstaker: "Arbeidstaker",
  maksdato: "Maksdato",
  dagerGjenstar: "Dager gjenstår",
  dagerBrukt: "Dager brukt hittil",
  totalSykepengedager: "Sykepengedager totalt",
  sykepengegrunnlag: "Sykepengegrunnlag",
  manedsinntekt: "Beregnet månedslønn",
  arsinntekt: "Omregnet til årslønn",
};

interface VedtakOppsummeringProps {
  selectedVedtak: VedtakDTO;
}

const VedtakOppsummering = (vedtakOppsummering: VedtakOppsummeringProps) => {
  const { selectedVedtak } = vedtakOppsummering;

  const [utbetaltArbeidsgiver, setUtbetaltArbeidsgiver] = useState<boolean>(
    false
  );
  const [
    utbetalingsdagerArbeidsgiver,
    setUtbetalingsdagerArbeidsgiver,
  ] = useState<string>("-");
  const [
    utbetalingsbelopBruttoArbeidsgiver,
    setUtbetalingbelopBruttoArbeidsgiver,
  ] = useState<string>("-");
  const [
    utbetalingsbelopDagligArbeidsgiver,
    setUtbetalingbelopDagligArbeidsgiver,
  ] = useState<string>("-");

  const [utbetaltArbeidstaker, setUtbetaltArbeidstaker] = useState<boolean>(
    false
  );
  const [
    utbetalingsdagerArbeidstaker,
    setUtbetalingsdagerArbeidstaker,
  ] = useState<string>("-");
  const [
    utbetalingsbelopBruttoArbeidstaker,
    setUtbetalingbelopBruttoArbeidstaker,
  ] = useState<string>("-");
  const [
    utbetalingsbelopDagligArbeidstaker,
    setUtbetalingbelopDagligArbeidstaker,
  ] = useState<string>("-");

  const [sykepengegrunnlag, setSykepengegrunnlag] = useState<string>("-");
  const [manedsinntekt, setManedsinntekt] = useState<string>("-");
  const [arsinntekt, setArsinntekt] = useState<string>("-");

  useEffect(() => {
    const utbetalingsdagerArbeidsgiver = refusjonTilUtbetalingsdager(
      VedtakFagomrade.SPREF,
      selectedVedtak
    );
    if (utbetalingsdagerArbeidsgiver > 0) {
      setUtbetalingsdagerArbeidsgiver(utbetalingsdagerArbeidsgiver + " dager");
      const utbetalingsbelopBruttoArbeidsgiver = refusjonTilUtbetalingsbelopBrutto(
        VedtakFagomrade.SPREF,
        selectedVedtak
      );
      setUtbetalingbelopBruttoArbeidsgiver(
        ValutaFormat.format(utbetalingsbelopBruttoArbeidsgiver) + " kr"
      );
      setUtbetalingbelopDagligArbeidsgiver(
        (utbetalingsbelopBruttoArbeidsgiver > 0
          ? ValutaFormat.format(
              utbetalingsbelopBruttoArbeidsgiver / utbetalingsdagerArbeidsgiver
            )
          : 0) + " kr"
      );
      setUtbetaltArbeidsgiver(true);
    }

    const utbetalingsdagerArbeidstaker = refusjonTilUtbetalingsdager(
      VedtakFagomrade.SP,
      selectedVedtak
    );
    if (utbetalingsdagerArbeidstaker > 0) {
      setUtbetalingsdagerArbeidstaker(utbetalingsdagerArbeidstaker + " dager");
      const utbetalingsbelopBruttoArbeidstaker = refusjonTilUtbetalingsbelopBrutto(
        VedtakFagomrade.SP,
        selectedVedtak
      );
      setUtbetalingbelopBruttoArbeidstaker(
        ValutaFormat.format(utbetalingsbelopBruttoArbeidstaker) + " kr"
      );
      setUtbetalingbelopDagligArbeidstaker(
        utbetalingsbelopBruttoArbeidstaker / utbetalingsdagerArbeidstaker +
          " kr"
      );
      setUtbetalingbelopDagligArbeidstaker(
        (utbetalingsbelopBruttoArbeidstaker > 0
          ? ValutaFormat.format(
              utbetalingsdagerArbeidstaker / utbetalingsdagerArbeidsgiver
            )
          : 0) + " kr"
      );
      setUtbetaltArbeidstaker(true);
    }

    if (selectedVedtak?.vedtak.sykepengegrunnlag) {
      const calculatedSykepengegrunnlag = Math.floor(
        selectedVedtak?.vedtak.sykepengegrunnlag
      );
      setSykepengegrunnlag(
        ValutaFormat.format(calculatedSykepengegrunnlag || 0) + " kr"
      );
    } else {
      setSykepengegrunnlag("-");
    }
    if (selectedVedtak?.vedtak.månedsinntekt) {
      const calculatedManedsinntekt = Math.floor(
        selectedVedtak?.vedtak.månedsinntekt
      );
      setManedsinntekt(
        ValutaFormat.format(calculatedManedsinntekt || 0) + " kr"
      );
      setArsinntekt(
        ValutaFormat.format(calculatedManedsinntekt * 12 || 0) + " kr"
      );
    } else {
      setManedsinntekt("-");
      setArsinntekt("-");
    }
  }, [selectedVedtak]);

  return (
    <>
      {utbetaltArbeidsgiver && (
        <VedtakInfopanelRow>
          <Column className="col-xs-4">
            <Row>
              <Normaltekst>{texts.utbetalingsdager}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsbelopDag}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsbelopBrutto}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsMottaker}</Normaltekst>
            </Row>
          </Column>
          <Column className="col-xs-2">
            <Row>
              <Normaltekst>{utbetalingsdagerArbeidsgiver}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{utbetalingsbelopDagligArbeidsgiver}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{utbetalingsbelopBruttoArbeidsgiver}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsMottakerArbeidsgiver}</Normaltekst>
            </Row>
          </Column>
        </VedtakInfopanelRow>
      )}
      {utbetaltArbeidstaker && (
        <VedtakInfopanelRow>
          <Column className="col-xs-4">
            <Row>
              <Normaltekst>{texts.utbetalingsdager}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsbelopDag}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsbelopBrutto}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsMottaker}</Normaltekst>
            </Row>
          </Column>
          <Column className="col-xs-2">
            <Row>
              <Normaltekst>{utbetalingsdagerArbeidstaker}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{utbetalingsbelopDagligArbeidstaker}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{utbetalingsbelopBruttoArbeidstaker}</Normaltekst>
            </Row>
            <Row>
              <Normaltekst>{texts.utbetalingsMottakerArbeidstaker}</Normaltekst>
            </Row>
          </Column>
        </VedtakInfopanelRow>
      )}
      <VedtakInfopanelRow>
        <Column className="col-xs-4">
          <Row>
            <Normaltekst>{texts.maksdato}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{texts.dagerGjenstar}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{texts.dagerBrukt}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{texts.totalSykepengedager}</Normaltekst>
          </Row>
        </Column>
        <Column className="col-xs-2">
          <Row>
            <Normaltekst>{estimertMaksdato(selectedVedtak)}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>
              {selectedVedtak.vedtak.gjenståendeSykedager}
            </Normaltekst>
          </Row>
          <Row>
            <Normaltekst>
              {selectedVedtak.vedtak.forbrukteSykedager}
            </Normaltekst>
          </Row>
          <Row>
            <Normaltekst>
              {selectedVedtak.vedtak.forbrukteSykedager +
                selectedVedtak.vedtak.gjenståendeSykedager}
            </Normaltekst>
          </Row>
        </Column>
      </VedtakInfopanelRow>
      <VedtakInfopanelRow>
        <Column className="col-xs-4">
          <Row>
            <Normaltekst>{texts.sykepengegrunnlag}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{texts.manedsinntekt}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{texts.arsinntekt}</Normaltekst>
          </Row>
        </Column>
        <Column className="col-xs-2">
          <Row>
            <Normaltekst>{sykepengegrunnlag}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{manedsinntekt}</Normaltekst>
          </Row>
          <Row>
            <Normaltekst>{arsinntekt}</Normaltekst>
          </Row>
        </Column>
      </VedtakInfopanelRow>
    </>
  );
};

export default VedtakOppsummering;
