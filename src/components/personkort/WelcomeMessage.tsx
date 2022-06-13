import React, { useState } from "react";
import styled from "styled-components";

const texts = [
  "Takk for at du bruker Modia!",
  "Vi tar imot tips på Yammer og Teams!",
  "Ha en fin dag!",
  "Du gjør en god jobb!",
  "Du er fantastisk!",
  "Takk for alt du gjør!",
  "Verden trenger flere som deg!",
  "Håper du liker tjenesten vi har laget!",
  "Feil kan meldes inn i Porten!",
];

const StyledText = styled.p`
  margin-left: auto;
  align-self: center;
  margin-right: 0;
  padding: 0 0.5em;
`;

const getRandomMessage = () => {
  const textIndex = Math.floor(Math.random() * texts.length);
  return texts[textIndex];
};

const WelcomeMessage = () => {
  const [message, setMessage] = useState(getRandomMessage());

  return (
    <>
      <StyledText onClick={() => setMessage(getRandomMessage())}>
        {message}
      </StyledText>
    </>
  );
};

export default WelcomeMessage;
