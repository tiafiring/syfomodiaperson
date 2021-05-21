import React from "react";
import { Knapp } from "nav-frontend-knapper";
import { TrackedButtonProps } from "./trackedButtonTypes";
import { useTrackButtonClick } from "../../data/logging/loggingHooks";

export const TrackedKnapp = (props: TrackedButtonProps) => {
  const trackButtonClick = useTrackButtonClick();
  const { context, children, onClick, ...rest } = props;

  const modifiedOnClick = (event) => {
    trackButtonClick(children, context);
    onClick && onClick(event);
  };

  return (
    <Knapp {...rest} onClick={modifiedOnClick}>
      {children}
    </Knapp>
  );
};
