import React from "react";

interface SykmeldingCheckboxProps {
  tekst: string;
  jsClassName?: string;
  className?: string;
}

export const SykmeldingCheckbox = (
  sykmeldingCheckboxProps: SykmeldingCheckboxProps
) => {
  const { tekst, jsClassName, className = "" } = sykmeldingCheckboxProps;
  return (
    <p className={`checkboxOpplysning ${className} js-${jsClassName}`}>
      <img
        src={`${process.env.REACT_APP_CONTEXT_ROOT}/img/png/check-box-1.png`}
        className="ikon"
        alt="Huket av"
      />
      <span
        className="checkboxOpplysning__label"
        dangerouslySetInnerHTML={{ __html: tekst }}
      />
    </p>
  );
};

interface SykmeldingCheckboxSelvstendigProps {
  tekst: string;
  jsClassName: string;
}

export const SykmeldingCheckboxSelvstendig = (
  sykmeldingCheckboxSelvstendigProps: SykmeldingCheckboxSelvstendigProps
) => {
  const { tekst, jsClassName } = sykmeldingCheckboxSelvstendigProps;
  return (
    <SykmeldingCheckbox
      tekst={tekst}
      jsClassName={jsClassName}
      className="typo-element blokk-m"
    />
  );
};
