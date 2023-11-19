import { useCallback, useRef } from "react";

export const useRippleEffect = () => {

  const createRippleEffect = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.currentTarget;

    const ripple = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);    
    const radius = diameter / 2;
  
    // Access the native event to use offsetX and offsetY
    const x = event.nativeEvent.offsetX - radius;
    const y = event.nativeEvent.offsetY - radius;
  
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    btn.appendChild(ripple);  
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }, []);

  return {
    createRippleEffect,
  }
};
