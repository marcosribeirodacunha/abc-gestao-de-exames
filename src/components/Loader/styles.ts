import styled, { keyframes } from 'styled-components';

const growAndFade = keyframes`
  0 {
    transform: translateX(-50%) scale(0);
    opacity: .5
  }

  50% {
    opacity: .5
  }

  100% {
    transform: translateX(-50%) scale(4);
    opacity: 0
  }
`;

const scaling = keyframes`
  0 {
    transform: translateX(-50%) scale(0);

  }

  50% {
    transform: translateX(-50%) scale(2);
  }

  100% {
    transform: translateX(-50%) scale(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  div {
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translateX(-50%) scale(0);
    background: ${props => props.theme.colors.secondary};
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transition: 0.5s;

    &.back-circle {
      animation: ${growAndFade} 2s ease-in-out 1s infinite;
    }

    &.main-circle {
      animation: ${scaling} 2s ease-in-out infinite;
    }
  }

  h1 {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.sizes.sub_heading};
    font-weight: 600;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, 100%);
  }
`;
