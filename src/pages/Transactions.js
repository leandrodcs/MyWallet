import styled from "styled-components";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useHistory } from "react-router";
import TransactionContext from "../contexts/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { getTransactions } from "../service/service";
import UserContext from "../contexts/UserContext";
import Movement from "../components/Movement";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const {setIncomeOrOutcome} = useContext(TransactionContext);
    const userInfo = useContext(UserContext);

    function relocate(whichTransaction) {
        if(whichTransaction) {
            setIncomeOrOutcome(true);
        }
        else {
            setIncomeOrOutcome(false);
        }
        history.push(`/transaction`);
    }

    useEffect(() => {
        getTransactions(userInfo.token)
        .then(res => {
            setTransactions(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
        })
    }, [userInfo.token]);

    if(loading) {
        return (
            <>
            Loading...
            </>
        )
    }
    return (
        <Wrapper>
            <Header>
                <p>Olá, {userInfo.name}</p>
                <button><MdOutlineLogout /></button>
            </Header>
            <Revenue>
                {transactions.length ? 
                transactions.map(({date, description, value}, index) => <Movement key={index} date={date} description={description} value={value}/>)
                :
                <EmptyMsg>
                Não há registros de entrada ou saída
                </EmptyMsg>}
            </Revenue>
            <MakeTransactions>
                <button onClick={() => relocate(true)}>
                    <AiOutlinePlusCircle />
                    <p>Nova<br/> entrada</p>
                </button>
                <button onClick={() => relocate(false)}>
                    <AiOutlineMinusCircle />
                    <p>Nova<br/> saída</p>

                </button>
            </MakeTransactions>

        </Wrapper>
    );
}

const MakeTransactions = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    & button {
        padding: 10px 10px 10px 10px;
        font-weight: 700;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 114px;
        background: #A328D6;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 25px;
        & p {
            font-size: 17px;
            text-align: left;
            line-height: 20px;

        }
    }
`;

const EmptyMsg = styled.p`
    position: absolute;
    color: #868686;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 20px;
    line-height: 23px;
`;

const Revenue = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 66vh;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
    padding: 20px 12px 40px 12px;
    gap: 10px;
    overflow-y: scroll;
`;

const Wrapper = styled.main`
    width: 100%;
    height: 100%;
    padding: 28px 25px 0 25px;
`;

const Header = styled.section`
    font-weight: 700;
    color: #FFFFFF;
    display: flex;
    font-size: 26px;
    justify-content: space-between;
    margin-bottom: 26px;

    & button {
        color: #FFFFFF;
    }
`;