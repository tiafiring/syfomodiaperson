import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Column, Row } from "nav-frontend-grid";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { hentVedtak } from "../../../data/vedtak/vedtak_actions";
import Side from "../../../sider/Side";
import { VedtakDTO } from "../../../data/vedtak/vedtak";
import VedtakInfopanel from "../VedtakInfopanel";
import styled from "styled-components";
import { VEDTAK } from "../../../enums/menypunkter";
import VedtakUnselected from "../VedtakUnselected";
import VedtakColumn from "../VedtakColumn";
import VedtakInfoBox from "../VedtakInfoBox";
import { sjekkTilgang } from "../../../data/tilgang/tilgang_actions";
import AppSpinner from "../../AppSpinner";
import { useTilgang } from "../../../hooks/useTilgang";
import {
  MappeAdvarselImage,
  MappeFeilImage,
} from "../../../../img/ImageComponents";

const texts = {
  pageTitle: "Vedtak",
  noAccess: "Du har ikke tilgang til denne personens vedtak",
  noVedtak: "Denne personen har ingen vedtak",
  comingSoon: `
       Dette er en tidlig versjon av vedtakshistorikken. 
       Feil og mangler kan forekomme. Bruk Yammer til å komme med forslag og Porten til å melde feil. 
    `,
};

const StyledAlertStripe = styled(AlertStripeInfo)`
  margin: 0 0.5em 0.5em 0.5em;
`;

const VedtakContainer = () => {
  const fnr = window.location.pathname.split("/")[2];

  const vedtakState = useSelector((state: any) => state.vedtak);
  const { tilgang, hentetTilgang, henterTilgang } = useTilgang();

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
        {vedtakState.henter && henterTilgang && <AppSpinner />}
        {vedtakState.hentet && hentetTilgang && (
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
            {!vedtakState.data.length && (
              <VedtakInfoBox title={texts.noVedtak} icon={MappeAdvarselImage} />
            )}

            {!tilgang.harTilgang && (
              <VedtakInfoBox title={texts.noAccess} icon={MappeFeilImage} />
            )}
          </Row>
        )}
      </>
    </Side>
  );
};

export default VedtakContainer;
