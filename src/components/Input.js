import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height: 58px;
    background: ${props => props.load ? `#F2F2F2` : `#FFFFFF`};
    opacity: ${props => props.load ? `0.7` : `1`};
    border-radius: 5px;
    outline: none;
    border: none;
    color: #000000;
    font-size: 20px;
    padding: 0 15px 0 15px;
    font-family: 'Raleway', sans-serif;
`;

export default Input;