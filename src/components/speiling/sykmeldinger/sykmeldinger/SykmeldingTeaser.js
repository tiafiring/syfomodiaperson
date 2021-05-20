import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EtikettBase from "nav-frontend-etiketter";
import SykmeldingPeriodeInfo from "./SykmeldingPeriodeInfo";
import {
  sykmelding as sykmeldingPt,
  sykmeldingperiode,
} from "../../../../propTypes";
import {
  behandlingsutfallStatuser,
  gamleSMStatuser,
} from "../../../../utils/sykmeldinger/sykmeldingstatuser";
import { tilLesbarPeriodeMedArstall } from "../../../../utils/datoUtils";
import { senesteTom, tidligsteFom } from "../../../../utils/periodeUtils";
import {
  ReportProblemTriangleImage,
  SykmeldingerHoverBlaaImage,
  SykmeldingerImage,
} from "../../../../../img/ImageComponents";

const texts = {
  teaserTekst: "Sykmelding\n",
  egenmeldtTeaserTekst: "Egenmeldt sykmelding\n",
  sendt: "Sendt til arbeidsgiver\n",
  utgaatt: "Ikke brukt på nett\n",
  tilSending: "Sender...",
  avbrutt: "Avbrutt av deg\n",
  bekreftet: "Bekreftet av deg\n",
  avvist: "Avvist av NAV\n",
  papirLabelText: "Papir",
};

const teaserText = (egenmeldt) => {
  return egenmeldt ? texts.egenmeldtTeaserTekst : texts.teaserTekst;
};

const textStatus = (status, behandlingsutfallStatus) => {
  if (behandlingsutfallStatus === behandlingsutfallStatuser.INVALID) {
    return texts.avvist;
  }
  switch (status) {
    case "SENDT":
      return texts.sendt;
    case "UTGAATT":
      return texts.utgaatt;
    case "TIL_SENDING":
      return texts.tilSending;
    case "AVBRUTT":
      return texts.avbrutt;
    case "BEKREFTET":
      return texts.bekreftet;
    default:
      return "";
  }
};

const PeriodeListe = ({ perioder, arbeidsgiver }) => {
  return (
    <ul className="teaser-punktliste js-perioder">
      {perioder.map((periode, index) => {
        return (
          <SykmeldingPeriodeInfo
            key={index}
            periode={periode}
            arbeidsgiver={arbeidsgiver}
            Element="li"
          />
        );
      })}
    </ul>
  );
};

PeriodeListe.propTypes = {
  arbeidsgiver: PropTypes.string,
  perioder: PropTypes.arrayOf(sykmeldingperiode),
};

const setStateIkon = (behandlingsutfallStatus) => {
  return behandlingsutfallStatus === behandlingsutfallStatuser.INVALID
    ? ReportProblemTriangleImage
    : SykmeldingerImage;
};

const setStateIkonHover = (behandlingsutfallStatus) => {
  return behandlingsutfallStatus === behandlingsutfallStatuser.INVALID
    ? ReportProblemTriangleImage
    : SykmeldingerHoverBlaaImage;
};

class SykmeldingTeaser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ikon: setStateIkon(props.sykmelding.behandlingsutfall.status),
    };
  }

  onMouseEnter(behandlingsutfallStatus) {
    this.setState({
      ikon: setStateIkonHover(behandlingsutfallStatus),
    });
  }

  onMouseLeave(behandlingsutfallStatus) {
    this.setState({
      ikon: setStateIkon(behandlingsutfallStatus),
    });
  }

  render() {
    const { sykmelding } = this.props;
    const antallPerioder = sykmelding.mulighetForArbeid.perioder.length;
    const behandlingsutfallStatus = sykmelding.behandlingsutfall.status;
    const visStatus =
      sykmelding.status !== gamleSMStatuser.NY ||
      behandlingsutfallStatus === behandlingsutfallStatuser.INVALID;
    const showPapirLabel = !!sykmelding.papirsykmelding;

    return (
      <article
        aria-labelledby={`sykmelding-header-${this.props.sykmelding.id}`}
      >
        <Link
          className="inngangspanel inngangspanel--sykmelding"
          to={`/sykefravaer/sykmeldinger/${this.props.sykmelding.id}`}
          onMouseEnter={() => {
            this.onMouseEnter(behandlingsutfallStatus);
          }}
          onMouseLeave={() => {
            this.onMouseLeave(behandlingsutfallStatus);
          }}
        >
          <span className="inngangspanel__ikon">
            <img alt="" src={this.state.ikon} />
          </span>
          <div className="inngangspanel__innhold">
            <header className="inngangspanel__header">
              <h3
                className="js-title"
                id={`sykmelding-header-${this.props.sykmelding.id}`}
              >
                <small className="inngangspanel__meta">
                  {tilLesbarPeriodeMedArstall(
                    tidligsteFom(sykmelding.mulighetForArbeid.perioder),
                    senesteTom(sykmelding.mulighetForArbeid.perioder)
                  )}
                </small>
                <span className="inngangspanel__tittel">
                  {teaserText(sykmelding.egenmeldt)}
                  {showPapirLabel && (
                    <EtikettBase
                      className="inngangspanel__merkelapp"
                      type="info"
                    >
                      {texts.papirLabelText}
                    </EtikettBase>
                  )}
                </span>
              </h3>
              {visStatus && (
                <p className="inngangspanel__status">
                  {textStatus(sykmelding.status, behandlingsutfallStatus)}
                </p>
              )}
            </header>
            <div className="inngangspanel__tekst">
              {antallPerioder === 1 ? (
                <SykmeldingPeriodeInfo
                  periode={sykmelding.mulighetForArbeid.perioder[0]}
                  arbeidsgiver={sykmelding.innsendtArbeidsgivernavn}
                />
              ) : (
                <PeriodeListe
                  perioder={sykmelding.mulighetForArbeid.perioder}
                  arbeidsgiver={sykmelding.innsendtArbeidsgivernavn}
                />
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }
}

SykmeldingTeaser.propTypes = {
  sykmelding: sykmeldingPt,
  fnr: PropTypes.string,
};

export default SykmeldingTeaser;
