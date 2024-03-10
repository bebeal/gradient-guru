'use client'

import styled from "styled-components";

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

const Demos: any = {
  StyledButton: () => {
    return (
      <StyledButton>
        Styled Button
      </StyledButton>
    );
  }
};


const StyledComponentsTest = () => {
  const title = 'Styled Components';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(Demos).map((key: any) => {
          const Component: any = Demos[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key.replace('Demo', '')}</h1>
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StyledComponentsTest;
