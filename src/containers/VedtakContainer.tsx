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
import VedtakEkspanderbartPanel from "../components/vedtak/VedtakEkspanderbartPanel";
import VedtakUnselected from "../components/vedtak/VedtakUnselected";
import { groupVedtakByOrgnr } from "../utils/vedtakUtils";

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
  const [selectedVedtak, setSelectedVedtak] = useState<VedtakDTO>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hentVedtak(fnr));
  }, []);

  return (
    <Side fnr={fnr} tittel={texts.pageTitle} aktivtMenypunkt={VEDTAK}>
      <>
        <Row>
          <StyledAlertStripe>{texts.comingSoon}</StyledAlertStripe>
        </Row>
        {vedtakState.hentet && (
          <Row>
            <Column className="vedtak col-xs-5">
              {groupVedtakByOrgnr(vedtakState.data).map(
                (vedtakPerArbeidsgiver: VedtakDTO[], index: number) => (
                  <VedtakEkspanderbartPanel
                    key={index}
                    selectedVedtak={selectedVedtak}
                    setSelectedVedtak={(x: VedtakDTO) => {
                      setSelectedVedtak(x);
                    }}
                    vedtakPerArbeidsgiver={vedtakPerArbeidsgiver}
                  />
                )
              )}
            </Column>

            {selectedVedtak ? (
              <Column className="col-xs-7">
                <VedtakInfopanel selectedVedtak={selectedVedtak} />
              </Column>
            ) : (
              <VedtakUnselected />
            )}
          </Row>
        )}
      </>
    </Side>
  );
};

export default VedtakContainer;
