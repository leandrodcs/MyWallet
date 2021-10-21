import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../components/SignInUpstyles/Input";
import Button from "../components/SignInUpstyles/Button";
import Title from "../components/SignInUpstyles/Title";
import Form from "../components/SignInUpstyles/Form";

export default function SignIn() {

    function login(e) {
        e.preventDefault();
    }
    return (
        <Wrapper>
            <Title>MyWallet</Title>
            <Form onSubmit={login}>
                <Input type="email" placeholder="E-mail" />
                <Input type="password" placeholder="Senha" />
                <Button type="submit">Entrar</Button>
            </Form>
            <Link to="sign-up">Primeira vez? Cadastre-se!</Link>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 22vh 25px 0 25px;

    & a {
        font-size: 15px;
        font-weight: 700;
        margin-top: 36px;
        color: #FFFFFF;
    }
`;
