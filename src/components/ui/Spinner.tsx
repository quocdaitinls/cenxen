import React, {useEffect} from "react";
import styled, {keyframes} from "@emotion/styled";

export type SpinnerProps = {
  size?: number;
  color?: string;
};

const spinKeyframes = keyframes`
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
`;

const SpinnerStyle = styled.div<SpinnerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  .spinner {
    width: 100%;
    height: 100%;
    position: absolute;
    border: ${(props) => props.size / 10}px solid #f3f3f3;
    border-top: ${(props) => props.size / 10}px solid ${(props) => props.color};
    border-radius: 50%;
    animation-name: ${spinKeyframes};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

export const Spinner: React.FC<SpinnerProps> = ({size, color}) => {
  return (
    <SpinnerStyle {...{size, color}}>
      <div className='spinner' />
    </SpinnerStyle>
  );
};

Spinner.defaultProps = {
  size: 20,
};
