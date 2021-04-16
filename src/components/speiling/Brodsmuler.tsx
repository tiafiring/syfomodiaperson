import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PersonImage } from "../../../img/ImageComponents";

interface BrodsmuleProps {
  sti: string;
  tittel: string;
  sisteSmule: boolean;
  erKlikkbar: boolean;
}

const Brodsmule = (brodsmuleProps: BrodsmuleProps) => {
  const { sti, tittel, sisteSmule, erKlikkbar } = brodsmuleProps;
  if (sisteSmule) {
    return (
      <span className="js-smuletekst">
        <span className="vekk">Du er her:</span>{" "}
        <span className="brodsmule">{tittel}</span>
      </span>
    );
  } else if (erKlikkbar) {
    return (
      <span className="js-smuletekst">
        <Link className="js-smule brodsmule" to={`/sykefravaer/${sti}`}>
          {tittel}
        </Link>
        <span className="brodsmule__skille"> / </span>
      </span>
    );
  }
  return (
    <span>
      <span className="brodsmule">{tittel}</span>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

interface ToggleLinkProps {
  onClick: any;
}

const ToggleLink = (toggleLinkProps: ToggleLinkProps) => {
  const { onClick } = toggleLinkProps;
  return (
    <span>
      <a
        role="button"
        aria-label="Vis hele brødsmulestien"
        className="js-toggle brodsmule"
        href="#"
        onClick={onClick}
      >
        ...
      </a>
      <span className="brodsmule__skille"> / </span>
    </span>
  );
};

interface BrodsmulerProps {
  brodsmuler: any[];
}

const getSynligeBrodsmuler = (
  brodsmuler: any[],
  shouldVisCollapsed: boolean
) => {
  if (shouldVisCollapsed) {
    return [
      brodsmuler[brodsmuler.length - 2],
      brodsmuler[brodsmuler.length - 1],
    ];
  }
  return brodsmuler;
};

const Brodsmuler = (brodsmulerProps: BrodsmulerProps) => {
  const { brodsmuler } = brodsmulerProps;

  const [visCollapsed, setVisCollapsed] = useState(true);

  const shouldVisCollapsed = brodsmuler.length > 3 && visCollapsed;

  const synligeBrodsmuler = getSynligeBrodsmuler(
    brodsmuler,
    shouldVisCollapsed
  );
  return (
    <nav
      role="navigation"
      className="brodsmuler side-innhold"
      aria-label="Du er her: "
    >
      <img src={PersonImage} alt="Du" className="brodsmuler__ikon" />
      <span className="js-smule brodsmule">Ditt NAV</span>
      {brodsmuler.length && <span className="brodsmule__skille"> / </span>}
      {shouldVisCollapsed && (
        <ToggleLink
          onClick={(e: any) => {
            e.preventDefault();
            setVisCollapsed(false);
          }}
        />
      )}
      {synligeBrodsmuler
        .map((smule: any, index: number) => {
          return Object.assign({}, smule, {
            sisteSmule: synligeBrodsmuler.length === index + 1,
          });
        })
        .map((smule: any, index: any) => {
          return <Brodsmule key={index} {...smule} />;
        })}
    </nav>
  );
};

export default Brodsmuler;
