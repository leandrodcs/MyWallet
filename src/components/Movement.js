import styled from "styled-components";

export default function Movement({date, description, value}) {
    const formatedDate = date.split(`T`)[0].split(`-`)[2] + `/` + date.split(`T`)[0].split(`-`)[1];
    const formatedValue = String(value).replace(`.`,`,`);
    return (
        <Item>
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
    line-height: 25px;
    font-size: 16px;
`;

const Date = styled.span`
    color: #C6C6C6;
`;

const Description = styled.span`
    color: #000000;
    margin-left: 10px;
`;

const Price = styled.span`
    color: ${({value}) => value > 0 ? `green` : `#C70000`};
`;