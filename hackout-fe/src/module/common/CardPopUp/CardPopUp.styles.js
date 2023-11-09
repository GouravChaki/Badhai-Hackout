import styled from 'styled-components';

export const PopUpCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 39rem;
  width: 32.063rem;
  border-radius: 1.25em;
  padding: 1em 1.2em;
  overflow: auto;
  background-color: black;
  box-shadow: 4px 4px 20px 1px rgba(68, 68, 68, 0.25);
  color: ${(props) => props.theme.white};
  font-size: 1.375rem;
  .highlight {
    font-weight: 500;
    color: white;
    font-size: 2rem;
  }
`;

export const PopUpHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1.2rem;
`;

export const CrossWrapper = styled.div`
  &:hover {
    color: ${(props) => props.theme.highlight};
    cursor: pointer;
  }
`;
export const CardDiv = styled.div`
  margin-top: 1.25rem;
  /* margin-right: 3.3rem; */
  width: 16rem;
`;
