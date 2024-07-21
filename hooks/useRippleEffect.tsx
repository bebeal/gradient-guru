'use client';

import { MouseEvent, useCallback } from 'react';

// ripple flash effect for clickables

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
  };

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
  };
};
