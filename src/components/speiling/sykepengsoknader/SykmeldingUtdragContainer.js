import React, { Component } from "react";
import PropTypes from "prop-types";
import { sykmelding as sykmeldingPt } from "@navikt/digisyfo-npm";
import { connect } from "react-redux";
import { hentSykmeldinger } from "../../../data/sykmelding/sykmeldinger_actions";
import { soknadEllerSykepengesoknad } from "../../../propTypes";
import { ARBEIDSTAKERE } from "../../../enums/soknadtyper";
import SykmeldingUtdrag from "./soknad-felles/SykmeldingUtdrag";

export class Container extends Component {
  componentDidMount() {
    if (this.props.skalHenteSykmeldinger) {
      this.props.hentSykmeldinger(this.props.fnr);
    }
  }

  render() {
    const { sykmelding, soknad } = this.props;
    if (
      sykmelding &&
      soknad &&
      (!soknad.soknadstype || soknad.soknadstype === ARBEIDSTAKERE)
    ) {
      return (
        <SykmeldingUtdrag rootUrl={"/sykefravaer"} sykmelding={sykmelding} />
      );
    }
    return null;
  }
}

Container.propTypes = {
  hentSykmeldinger: PropTypes.func,
  skalHenteSykmeldinger: PropTypes.bool,
  sykmelding: sykmeldingPt,
  soknad: soknadEllerSykepengesoknad,
  fnr: PropTypes.string,
};

export const mapStateToProps = (state, ownProps) => {
  const skalHenteSykmeldinger =
    !state.sykmeldinger.henter &&
    !state.sykmeldinger.hentet &&
    !state.sykmeldinger.hentingFeilet;
  const sykmelding = state.sykmeldinger.data.find((s) => {
    return s.id === ownProps.soknad.sykmeldingId;
  });

  return {
    skalHenteSykmeldinger,
    sykmelding,
  };
};

export default connect(mapStateToProps, { hentSykmeldinger })(Container);
