/* eslint-disable */
import styled from 'styled-components';

export const ErrorField = styled.div`
  height: 30px;
  &#AddPanelErrorField,
  &#EditError {
    height: 50px;
    width: 90%;
    margin: 0px auto;
  }
`;

export const ErrorMessage = styled.div`
  color: #d93838;
  &.loginError {
    font-weight: bold;
    font-size: 15px;
    margin-top: 5px;
    margin-left: 5px;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;