import { Add } from "@navikt/ds-icons/cjs";
import { Knapp, KnappBaseProps } from "nav-frontend-knapper";
import React from "react";

export const LeggTilKnapp = ({ children, ...rest }: KnappBaseProps) => (
  <Knapp htmlType="button" {...rest}>
    <Add aria-label="Pluss ikon" role="img" focusable="false" />
    <span>{children}</span>
  </Knapp>
);
