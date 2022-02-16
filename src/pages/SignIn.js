import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";
import Form from "../components/Form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { postLoginInfo } from "../service/service";
import { useState } from "react";
import { useHistory } from "react-router";
import Loader from "react-loader-spinner";
import { sendAlert } from "../components/Alerts";


export default function SignIn({setUser, user}) {
    const [email, setEmail] = useState(user.email || "");
    const [password, setPassword] = useState(user.password || "");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function loginHandler(e) {
        if (e) e.preventDefault();
        setLoading(true);
        postLoginInfo(email, password)
        .then(res => {
            setUser(res.data);
            history.push(`/home`);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify({...res.data, password}));
        })
        .catch(err => {
            sendAlert('error', '', err.response.data)
            setLoading(false);
        });
    }

    return (
        <Wrapper>
            <Title>MyWallet</Title>
            <Form onSubmit={loginHandler}>
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
