'use client'

import { useCallback } from "react";
import styled from "styled-components";

const RippleEffectSpan = styled.span`
  @keyframes ripple-click-effect {
    to {
      transform: scale(4);
      opacity: 0;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple-click-effect 0.5s ease-in-out;
  background-color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
`;

export const useRippleEffect = () => {

  const createRipple = (width: number, height: number, offsetX: number, offsetY: number) => {
    const ripple = document.createElement('span');
    const diameter = Math.max(width, height);
    const radius = diameter / 2;
  
    // Access the native event to use offsetX and offsetY
    const x = offsetX - radius;
    const y = offsetY - radius;
  
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    return ripple;
  }

  const createRippleEffect = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.currentTarget;
    if (!btn) {
      console.error('Button is null. Unable to create ripple effect.');
      return;
    }
    const ripple = createRipple(btn.clientWidth, btn.clientHeight, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    btn.appendChild(ripple);  
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return {
    createRippleEffect,
  }
};
