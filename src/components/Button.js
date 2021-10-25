import styled from "styled-components";

const Button = styled.button`
        width: 100%;
        height: 46px;
        border-radius: 5px;
        background: #A328D6;
        color: #FFFFFF;
        font-weight: 700;
        pointer-events: ${props => props.load ? `none` : `initial`};
        opacity: ${props => props.load ? `0.7` : `1`};
        
`;

export default Button;