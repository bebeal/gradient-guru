import { FC } from 'react';
import styled from 'styled-components';
import { ComponentMap, ComponentMapper } from '@/components/ComponentMapper/ComponentMapper';

const StyledButton = styled.button<any>`
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border: solid 1px black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #555;
  }
`;

const StyledComponents: ComponentMap = {
  StyledButtonDemo: () => {
    return <StyledButton>Styled Button</StyledButton>;
  },
};

const StyledComponentsPage: FC = () => {
  return <ComponentMapper title="Styled Components" components={StyledComponents} />;
};

export default StyledComponentsPage;
