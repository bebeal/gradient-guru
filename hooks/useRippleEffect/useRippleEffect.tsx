import { useCallback } from "react";
import './useRippleEffect.css';

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
