import Input from "../components/Input";
import Button from "../components/Button";
import Form from "../components/Form";

import { useContext, useState } from "react";
import { MdOutlineLogout } from 'react-icons/md';
import TransactionContext from "../contexts/TransactionContext";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { useHistory } from "react-router";
import { postTransaction } from "../service/service";

export default function Entries() {
    const {incomeOrOutcome} = useContext(TransactionContext);
    const userInfo = useContext(UserContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function relcate() {
        history.push(`/transactions`);
    }    

    function declareTransaction(e) {
        e.preventDefault();
        setLoading(true);
        const formatedValue = incomeOrOutcome ? value : value * -1;
        postTransaction(userInfo.token, description, formatedValue)
        .then(res => {
            setValue("");
            setDescription("");
            history.push(`/transactions`);
            setLoading(false);
        })
        .catch(err => {
            alert(err);
            setLoading(false);
        })
    }

    function updateTransaction(e) {
        console.log(e);
        if(e.target.value.length > 10) {
            return;
        }
        setValue(e.target.value);
    }

    return (
        <Wrapper>
            <Header>
                <button onClick={relcate}><MdOutlineLogout /></button>
                <p>Nova {incomeOrOutcome?`entrada`:`saída`}</p>
            </Header>
            <Form onSubmit={declareTransaction}>
                <Input load={loading} type="number" value={value} onChange={updateTransaction} placeholder="Valor"/>
                <Input load={loading} type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição"/>
                <Button load={loading} type="submit">Salvar {incomeOrOutcome?`entrada`:`saída`}</Button>
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