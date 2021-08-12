import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import BjornBildeStor from "./BjornBildeStor";

interface HjelpebobleProps {
  children: ReactNode;
  className?: string;
  hvit?: boolean;
  vertikal?: boolean;
  bildeAlt: string;
}

const Hjelpeboble = ({
  children,
  className = "",
  hvit = false,
  vertikal = false,
  bildeAlt,
}: HjelpebobleProps): ReactElement => {
  const classNames = cn(`hjelpeboble ${className}`, {
    "hjelpeboble--horisontal": !vertikal,
  });
  const bobleClassNames = cn({
    hjelpeboble__boble: true,
    "hjelpeboble__boble--hvit": hvit,
    "hjelpeboble__boble--stor": true,
    "hjelpeboble__boble--horisontal": !vertikal,
  });
  const bildeClassNames = cn({
    hjelpeboble__bilde: true,
    "hjelpeboble__bilde--hvit": hvit,
    "hjelpeboble__bilde--stor": true,
    "hjelpeboble__bilde--horisontal": !vertikal,
  });
  return (
    <div className={classNames}>
      <div className={bobleClassNames}>{children}</div>
      <div className={bildeClassNames}>
        <BjornBildeStor alt={bildeAlt} />
      </div>
    </div>
  );
};

export default Hjelpeboble;
