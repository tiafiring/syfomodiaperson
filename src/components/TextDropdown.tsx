import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import NavFrontendChevron from "nav-frontend-chevron";
import navFarger from "nav-frontend-core";

const BlueText = styled.span`
  color: ${navFarger.navBla};
`;

const TextAndChevronWrapper = styled.div`
  cursor: pointer;
`;

interface TextDropdownProps {
  children: any;
  title: string;
}

const TextDropdown = ({ children, title }: TextDropdownProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [chevronDirection, setChevronDirection] = useState<"ned" | "opp">(
    "ned"
  );

  const handleClick = () => {
    setShowInfo(!showInfo);

    const newChevronDirection = chevronDirection === "ned" ? "opp" : "ned";
    setChevronDirection(newChevronDirection);
  };

  return (
    <div>
      <TextAndChevronWrapper
        tabIndex={0}
        onClick={handleClick}
        onKeyPress={handleClick}
      >
        <BlueText>{title}</BlueText>
        <NavFrontendChevron type={chevronDirection} />
      </TextAndChevronWrapper>

      {showInfo && children}
    </div>
  );
};

export default TextDropdown;
