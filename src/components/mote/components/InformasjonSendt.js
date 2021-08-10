import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DropdownInnholdsviser from "./DropdownInnholdsviser";
import * as epostinnholdActions from "../../../data/mote/epostinnhold_actions";
import * as arbeidsgiverepostinnholdActions from "../../../data/mote/arbeidsgiverepostinnhold_actions";
import { ARBEIDSGIVER, BRUKER } from "../../../konstanter";
import Utvidbar from "../../Utvidbar";
import {
  ArbeidsgiverHoverImage,
  ArbeidsgiverImage,
  PersonHoverImage,
  PersonImage,
} from "../../../../img/ImageComponents";
import { motePt } from "../moteProptypes";

export const mapStateToInnholdsviserProps = (state) => {
  return {
    epostinnhold: state.epostinnhold.data,
    arbeidsgiverepostinnhold: state.arbeidsgiverEpostinnhold.data,
    henter:
      state.epostinnhold.henter === true ||
      state.arbeidsgiverEpostinnhold.henter === true,
    hentingFeilet:
      state.epostinnhold.hentingFeilet === true ||
      state.arbeidsgiverEpostinnhold.hentingFeilet === true,
  };
};

const actions = Object.assign({}, epostinnholdActions, {
  hentEpostinnhold: epostinnholdActions.hentBekreftMoteEpostinnhold,
  hentArbeidsgiverEpostinnhold:
    arbeidsgiverepostinnholdActions.hentBekreftMoteArbeidsgiverEpostinnhold,
});

export const InnholdsviserContainer = connect(
  mapStateToInnholdsviserProps,
  actions
)(DropdownInnholdsviser);

const InformasjonSendt = ({ arbeidstaker, mote }) => {
  return (
    <div>
      <h2>Informasjon sendt:</h2>
      {arbeidstaker.kontaktinfo.skalHaVarsel && (
        <Utvidbar
          className="blokk"
          erApen={false}
          tittel="Arbeidstaker"
          ikon={PersonImage}
          ikonHover={PersonHoverImage}
          ikonAltTekst="Arbeidstaker"
          variant="lysebla"
        >
          <InnholdsviserContainer mote={mote} type={BRUKER} />
        </Utvidbar>
      )}
      <Utvidbar
        className="blokk"
        erApen={false}
        tittel="Arbeidsgiver"
        ikon={ArbeidsgiverImage}
        ikonHover={ArbeidsgiverHoverImage}
        ikonAltTekst="Arbeidsgiver"
        variant="lilla"
      >
        <InnholdsviserContainer mote={mote} type={ARBEIDSGIVER} />
      </Utvidbar>
    </div>
  );
};

InformasjonSendt.propTypes = {
  arbeidstaker: PropTypes.object,
  mote: motePt,
};

export default InformasjonSendt;
