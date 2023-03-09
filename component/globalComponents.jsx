import styled from 'styled-components';

export const MainCont = styled.div`
  width: 100%;
`;
export const Button = styled.div`
  width: 100%;
  text-align: center;
  background-color: ${(props) => props.BackgroundColor || '#333333'};
  color: ${(props) => props.Color || '#000000'};
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  padding: 10px 0;
  opacity: ${(props) => props.Opacity || '1.0'};
  &:active {
    transform: ${(props) => props.Transform || 'translateX(5px) translateY(5px)'};
  }
`;

export const Title = styled.h2`
  text-align: center;
`;

export const TodoBody = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  height: 100%;
`;

export const TodoPanel = styled.div`
  border-radius: 10px;
  border: 2px solid #000000;
  width: 100%;
  min-height: 500px;
  min-width: 150px;
  background-color: #ffffff;
`;
export const TopSection = styled.div`
  width: 90%;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 5px;
`;

export const MainColumn = styled.div``;
export const SideColumn = styled.div``;

export const LogOutButton = styled.div`
  width: 40px;
  text-align: center;
  background-color: ${(props) => props.BackgroundColor || '#333333'};
  color: ${(props) => props.Color || '#000000'};
  border-radius: 2px;
  border: 1px solid #000;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  padding: 10px 0;
  box-shadow: 5px 5px 5px #000;
  margin: 10px auto;
  font-size: 10px;
  &:active {
    transform: ${(props) => props.Transform || 'translateX(5px) translateY(5px)'};
  }
`;

export const ListItem = styled.div`
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  width: 100%;
`;

export const ListItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 73% 25%;
  gap: 5px;
  width: 95%;
  margin: 10px auto;
  @media screen and (min-width: 425px) {
    grid-template-columns: 80% 20%;
    width: 85%;
  }
  @media screen and (min-width: 1000px) {
    grid-template-columns: 90% 10%;
    width: 90%;
  }
`;

export const TaskText = styled.div`
  font-size: 12px;
  @media screen and (min-width: 425px) {
    font-size: 15px;
  }
  @media screen and (min-width: 600px) {
    font-size: 20px;
  }
  @media screen and (min-width: 800px) {
    font-size: 25px;
  }
`;

export const ListElement = styled.div`
  width: 100%;
  padding: 10px 0px;
`;

export const ListItemIconWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
`;

export const EditInputWrapper = styled.div`
  display: grid;
  grid-template-rows: 90% 10%;
  height: 100px;
`;

export const EditInput = styled.input`
  border: 1px solid #000;
  padding: 5px;
`;

export const IconWrapper = styled.div`
  width: auto;
  display: flex;
  &.ListIconWrapper {
    display: contents;
    margin: 0px 10px;
    cursor: pointer;
  }
  & > * {
    width: 20px;
    height: 20px;
    margin: auto;
  }
  &#visibilityIcon {
    cursor: pointer;
  }
  &#button {
    cursor: pointer;
  }
`;

export const AddPanel = styled.div`
  border: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  background-color: ${(props) => props.BackgroundColor || '#fff'};
  @media screen and (min-width: 800px) {
    width: 450px;
  }
`;

export const AddPanelInputWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid #000;
  width: 90%;
  margin: 20px auto;
`;

export const AddPanelInput = styled.input`
  width: 90%;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 5px;
`;

export const AddPanelButtonWrapper = styled.div`
  display: block;
  justify-content: space-around;
  margin: 10px;
  & > * {
    display: inline-block;
    margin: 5px 0;
  }
  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: 40% 40%;
    gap: 5px;
  }
`;
export const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  border: 1px solid #808080;
  @media screen and (min-width: 800px) {
    grid-template-columns: 10% 90%;
  }
  @media screen and (min-width: 1500px) {
    grid-template-columns: 5% 95%;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
`;
