import Input from "../components/SignInUpstyles/Input";
import Button from "../components/SignInUpstyles/Button";
import Title from "../components/SignInUpstyles/Title";
import Form from "../components/SignInUpstyles/Form";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { postLoginInfo } from "../service/service";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";

export default function SignIn({setUser}) {
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function saveLogInInfo() {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      }

    function login(e) {
        if (e) e.preventDefault();
        setLoading(true);
        postLoginInfo(email, password)
        .then(res => {
            setUser(res.data);
            history.push(`/revenue`);
            setLoading(false);
            saveLogInInfo();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        });
    }

    useEffect(() => {
        if(!email && !password) return;
        login();
    }, []);

    return (
        <Wrapper>
            <Title>MyWallet</Title>
            <Form onSubmit={login}>
                <Input load={loading} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                <Input load={loading} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                <Button load={loading} type="submit">{loading ? <Loader type="ThreeDots" color="#FFFFFF" height={13} /> : `Entrar`}</Button>
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
