import Input from "../components/SignInUpstyles/Input";
import Button from "../components/SignInUpstyles/Button";
import Title from "../components/SignInUpstyles/Title";
import Form from "../components/SignInUpstyles/Form";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { registerUser } from "../service/service";
import { useState } from "react";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function register(e) {
        e.preventDefault();
        setLoading(true);

        if(password !== confirmPassword) {
            return alert("Os campos da senha devem ser iguais, tente novamente.");
        }

        registerUser(name, email, password)
        .then(res => {
            alert("Seu cadastro foi realizado com sucesso!");
            history.push(`/`);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }

    return (
        <Wrapper>
            <Title>MyWallet</Title>
            <Form onSubmit={register}>
                <Input load={loading} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
                <Input load={loading} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                <Input load={loading} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
                <Input load={loading} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirma a senha" />
                <Button load={loading} type="submit">{loading ? <Loader type="ThreeDots" color="#FFFFFF" height={13} /> : `Cadastrar`}</Button>
            </Form>
            <Link to="/">Primeira vez? Cadastre-se!</Link>
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
