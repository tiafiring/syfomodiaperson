import React from "react";
import { Flatknapp, KnappBaseProps } from "nav-frontend-knapper";
import styled from "styled-components";
import { Delete } from "@navikt/ds-icons/cjs";

const DeleteButton = styled(Flatknapp)`
  svg {
    width: 1.25em;
    height: 1.25em;
  }
`;

export const SlettKnapp = (props: KnappBaseProps) => (
  <DeleteButton htmlType="button" kompakt {...props}>
    <Delete aria-label="Slett ikon" role="img" focusable="false" />
  </DeleteButton>
);
