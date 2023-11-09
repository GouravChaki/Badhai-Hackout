import React, { useState, useEffect } from "react";
import {
  CardDiv,
  CrossWrapper,
  PopUpCard,
  PopUpHeader,
} from "./CardPopUp.styles";
import arrow from "./x-mark-16.png";
export default function CardPopUp({ header, isOpen, setIsOpen }) {
  return (
    <PopUpCard>
      <PopUpHeader>
        <div className="highlight">{header}</div>
        <CrossWrapper
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <img src={arrow} />
        </CrossWrapper>
      </PopUpHeader>
      <CardDiv></CardDiv>
    </PopUpCard>
  );
}
