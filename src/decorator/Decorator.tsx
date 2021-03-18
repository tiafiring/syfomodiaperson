import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import NAVSPA from "@navikt/navspa";
import { DecoratorProps } from "./decoratorProps";
import decoratorConfig from "./decoratorConfig";
import { valgtEnhet } from "../data/valgtenhet/enhet_actions";

const InternflateDecorator = NAVSPA.importer<DecoratorProps>(
  "internarbeidsflatefs"
);

const Decorator = () => {
  const dispatch = useDispatch();

  const handlePersonsokSubmit = (nyttFnr: string) => {
    const fnr = window.location.pathname.split("/")[2];
    if (nyttFnr !== fnr) {
      window.location.href = `/sykefravaer/${nyttFnr}`;
    }
  };

  const handleChangeEnhet = (nyEnhet: string) => {
    dispatch(valgtEnhet(nyEnhet));
  };

  const config = useCallback(decoratorConfig, [
    handlePersonsokSubmit,
    handleChangeEnhet,
  ])(handlePersonsokSubmit, handleChangeEnhet);

  return <InternflateDecorator {...config} />;
};

export default Decorator;
