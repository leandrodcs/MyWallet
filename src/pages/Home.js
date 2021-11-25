import styled from "styled-components";
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useHistory } from "react-router";
import TransactionContext from "../contexts/TransactionContext";
import { useContext, useEffect, useState } from "react";
import { getTransactions, signOut } from "../service/service";
import UserContext from "../contexts/UserContext";
import Movement from "../components/Movement";
import Loader from "react-loader-spinner";
import { sendAlert } from "../components/Alerts";

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [update, setUpdate] = useState(false);
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
        history.push(`/transactions`);
    }

    function logOff() {
        signOut(userInfo.token)
        .then(res => {
            localStorage.clear();
            history.push(`/`);
        })
        .catch(err => {
            sendAlert('error', '', err.response.data);
        });
    }

    function calculateTotal(transactions) {
        let sum = 0;
        transactions.forEach(t => sum+= Number(t.value));
        setTotal(sum.toFixed(2));
    }

    useEffect(() => {
        getTransactions(userInfo.token)
        .then(res => {
            setTransactions(res.data);
            calculateTotal(res.data);
            setLoading(false);
        })
        .catch(err => {
            sendAlert('error', '', err.response.data);
            setLoading(false);
        })
    }, [userInfo.token, update]);

    if(loading) {
        return (
            <>
            <Blank />
            <Loader type="TailSpin" color="#FFFFFF" width="100vw" height="30vh" />
            </>
        )
    }
    return (
        <Wrapper>
            <Header>
                <p>Olá, {userInfo.name}</p>
                <button onClick={logOff}><MdOutlineLogout /></button>
            </Header>
            <Revenue>
                {transactions.length ?
                <>
                    <List>
                        {transactions.map(({id, date, description, value}, index) => 
                            <Movement key={index} id={id} date={date} description={description} value={value} update={update} setUpdate={setUpdate} />)}
                    </List>
                    <Total total={total}>
                        <span>SALDO</span>
                        <span>
                            {total < 0 ? String(total).replace('.',',').split(`-`)[1]:String(total).replace('.',',')}
                        </span>
                    </Total>
                </>
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

const Blank = styled.div`
    height: 30vh;
    width: 100%;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;
    overflow-y: scroll;
    padding: 20px 12px 40px 12px;
`;

const Total = styled.p`
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 17px;
    line-height: 20px;
    padding: 10px 12px 10px 12px;
    & span:first-child {
        font-weight: 700;
    }
    & span:last-child {
        color: ${({total}) => total > 0 ? `green` : total < 0 ? `#C70000` : `gray`};
    }
`;

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
        cursor: pointer;
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
    gap: 10px;
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