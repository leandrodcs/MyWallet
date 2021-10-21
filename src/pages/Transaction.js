import Input from "../components/SignInUpstyles/Input";
import Button from "../components/SignInUpstyles/Button";
import Form from "../components/SignInUpstyles/Form";

import { useContext, useEffect, useState } from "react";
import { MdOutlineLogout } from 'react-icons/md';
import TransactionContext from "../contexts/TransactionContext";
import styled from "styled-components";

export default function Entries() {
    const {incomeOrOutcome} = useContext(TransactionContext);
    const [value, setValue] = useState(null);
    const [description, setDescription] = useState("");

    return (
        <Wrapper>
            <Header>
                <button><MdOutlineLogout /></button>
                <p>Nova {incomeOrOutcome?`entrada`:`saída`}</p>
            </Header>
            <Form>
                <Input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Valor"/>
                <Input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                <Button>Salvar {incomeOrOutcome?`entrada`:`saída`}</Button>
            </Form>

        </Wrapper>
    );
}

const Header = styled.section`
    width: 100%;
    max-width: 450px;
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    gap: 20px;
    font-size: 26px;
    margin-bottom: 26px;

    & button {
        color: #FFFFFF;
        svg {
            transform: rotate(180deg);
        }
    }
`;

const Wrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 28px 25px 0 25px;
`;