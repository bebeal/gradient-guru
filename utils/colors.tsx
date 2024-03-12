import styled from "styled-components";

export const spectrum = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'];

export const DynamicGradients = ($colors: string[], $direction: string) => {
  return `
    @keyframes gradient-transition {
      0% { background-position: 0% 50% },
      50% { background-position: 100% 50% },
      100% { background-position: 0% 50% },
    }
    background-image: linear-gradient(${$direction}, ${$colors.join(',')});
    background-size: ${$colors.length * 100}%;
    animation: gradient-transition ${$colors.length * 2}s ease infinite;
  `;
};

export const DynamicGradientBackground = styled.div<{
  $colors: string[];
  $direction: string;
  $onDiv: boolean;
  $onPsuedoAfter: boolean;
}>`
  ${(props) => props.$onDiv && DynamicGradients(props.$colors, props.$direction)}
  ${(props) =>
    props.$onPsuedoAfter &&
    `
    &::after {
      ${DynamicGradients(props.$colors, props.$direction)}
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      z-index: -1;
    }
  `}
`;
