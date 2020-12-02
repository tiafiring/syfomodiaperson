import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import { hentVedtak } from "../actions/vedtak_actions";
import Side from "../sider/Side";
import { VedtakDTO } from "../reducers/vedtak";
import VedtakInfopanel from "../components/vedtak/VedtakInfopanel";
import styled from "styled-components";
import { VEDTAK } from "../enums/menypunkter";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import VedtakUnselected from "../components/vedtak/VedtakUnselected";
import VedtakEmpty from "../components/vedtak/VedtakEmpty";
import VedtakColumn from "../components/vedtak/VedtakColumn";
import VedtakForbidden from "../components/vedtak/VedtakForbidden";
import { sjekkTilgang } from "../actions/tilgang_actions";
import AppSpinner from "../components/AppSpinner";

const texts = {
  pageTitle: "Vedtak",
  comingSoon: `
       Dette er en tidlig versjon av vedtakshistorikken. 
       Feil og mangler kan forekomme. Bruk Yammer til å komme med forslag og Porten til å melde feil. 
    `,
};

const StyledAlertStripe = styled(AlertStripeFeil)`
  margin: 0 0.5em 0.5em 0.5em;
`;

const VedtakContainer = () => {
  const fnr = window.location.pathname.split("/")[2];

  const vedtakState = useSelector((state: any) => state.vedtak);
  const tilgangState = useSelector((state: any) => state.tilgang);

  const [selectedVedtak, setSelectedVedtak] = useState<VedtakDTO>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentVedtak(fnr));
    dispatch(sjekkTilgang(fnr));
  }, []);

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={VEDTAK}>
      <>
        <Row>
          <StyledAlertStripe>{texts.comingSoon}</StyledAlertStripe>
        </Row>
        {vedtakState.henter && tilgangState.henter && <AppSpinner />}
        {vedtakState.hentet && tilgangState.hentet && (
          <Row>
            {vedtakState.data.length > 0 && (
              <VedtakColumn
                data={vedtakState.data}
                selectedVedtak={selectedVedtak}
                setSelectedVedtak={setSelectedVedtak}
              />
            )}

            {selectedVedtak && (
              <Column className="col-xs-7">
                <VedtakInfopanel selectedVedtak={selectedVedtak} />
              </Column>
            )}

            {!selectedVedtak && vedtakState.data.length > 0 && (
              <VedtakUnselected />
            )}
            {!vedtakState.data.length && <VedtakEmpty />}

            {!tilgangState.data.harTilgang && <VedtakForbidden />}
          </Row>
        )}
      </>
    </Side>
  );
};

export default VedtakContainer;
