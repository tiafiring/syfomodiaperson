import * as React from "react";
import styled from "styled-components";
import {
  ArrowWithLineDownBlueImage,
  ArrowWithLineUpBlueImage,
} from "../../../img/ImageComponents";

interface FaktorerBoxProps {
  faktorer: string[];
  ned: boolean;
}

const texts = {
  opp: "Dette trekker varigheten opp",
  ned: "Dette trekker varigheten ned",
};

const FaktorTittel = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 0.5em;
  margin-top: 0.5em;
`;

const List = styled.ol`
  margin-top: 0.5em;
  padding-left: 1.5em;
`;

const ListWrapper = styled.div`
  display: flex;
`;

const PilIkon = styled.img`
  align-self: center;
  margin-left: 0.5em;
`;

const FaktorerBox = ({ faktorer, ned }: FaktorerBoxProps) => {
  return (
    <div>
      <FaktorTittel>{ned ? texts.ned : texts.opp}</FaktorTittel>
      <ListWrapper>
        <PilIkon
          alt="pil-ned"
          src={ned ? ArrowWithLineDownBlueImage : ArrowWithLineUpBlueImage}
        />
        <List>
          {faktorer.map((faktor, index) => {
            return <li key={index}>{faktorer[index]}</li>;
          })}
        </List>
      </ListWrapper>
    </div>
  );
};

export default FaktorerBox;
