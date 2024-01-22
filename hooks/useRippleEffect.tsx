'use client'

import { useCallback, MouseEvent } from "react";
// import styled from "styled-components";

// const RippleEffectSpan = styled.span`
//   @keyframes ripple-click-effect {
//     to {
//       transform: scale(4);
//       opacity: 0;
//       background-color: rgba(255, 255, 255, 0.1);
//     }
//   }

//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple-click-effect 0.5s ease-in-out;
//   background-color: rgba(255, 255, 255, 0.3);
//   pointer-events: none;
// `;

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

  const createRippleEffect = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    if (!target) {
      console.error('target is null. Unable to create ripple effect.');
      return;
    }
    // Calculate the ripple position relative to the button's boundaries
    const rect = target.getBoundingClientRect();
    const rippleX = event.clientX - rect.left;
    const rippleY = event.clientY - rect.top;

    const ripple = createRipple(target.clientWidth, target.clientHeight, rippleX, rippleY);
    target.appendChild(ripple);  
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return {
    createRippleEffect,
  }
};
