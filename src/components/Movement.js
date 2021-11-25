import { useContext } from "react/cjs/react.development";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { requestTransactionRemoval } from "../service/service";
import Swal from 'sweetalert2'
import { sendAlert, sendConfirm } from "./Alerts";

export default function Movement({id, date, description, value, update, setUpdate}) {
    const formatedDate = date.split(`T`)[0].split(`-`)[2] + `/` + date.split(`T`)[0].split(`-`)[1];
    const formatedValue = String(value).replace(`.`,`,`);
    const userInfo = useContext(UserContext);

    function deleteTransaction() {
        sendConfirm('warning', '', 'Quer remover essa transação?')
        .then((result) => {
            if(result.isConfirmed) {
                requestTransactionRemoval(id, userInfo.token)
                .then(res => {
                    setUpdate(!update);
                })
                .catch(err => {
                    sendAlert('error', '', err.response.data)
                });
            } else if(result.isDenied) {
                return;
            }
        });
    }
    return (
        <Item onClick={deleteTransaction}>
            <p>
                <Date>{formatedDate}</Date>
                <Description>{description}</Description>
            </p>
            <Price value={value}>{formatedValue.includes(`-`)?formatedValue.split(`-`)[1]: formatedValue}</Price>
        </Item>
    );
}

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 25px;
    font-size: 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    & p {
        display: flex;
        align-items: center;
    }
`;

const Date = styled.span`
    color: #C6C6C6;
`;

const Description = styled.span`
    color: #000000;
    width: 180px;
    margin-left: 10px;
    overflow: hidden;
    word-wrap: break-word;
`;

const Price = styled.span`
    color: ${({value}) => value > 0 ? `green` : `#C70000`};
`;