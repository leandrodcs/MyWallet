import { Link } from "react-router-dom";
import styled from "styled-components";

import Input from "../components/SignInUpstyles/Input";
import Button from "../components/SignInUpstyles/Button";
import Title from "../components/SignInUpstyles/Title";
import Form from "../components/SignInUpstyles/Form";

export default function SignUp() {

    function register(e) {
        e.preventDefault();
    }
    return (
        <Wrapper>
            <Title>MyWallet</Title>
            <Form onSubmit={register}>
                <Input type="text" placeholder="Nome" />
                <Input type="email" placeholder="E-mail" />
                <Input type="password" placeholder="Senha" />
                <Input type="password" placeholder="Confirma a senha" />
                <Button type="submit">Cadastrar</Button>
            </Form>
            <Link to="sign-in">Primeira vez? Cadastre-se!</Link>
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
    padding: 16vh 25px 0 25px;

    & a {
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
        margin-top: 36px;
    }
`;
