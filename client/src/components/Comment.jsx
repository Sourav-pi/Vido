import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import profilePic from "../img/default-profile-pic.png";
const API = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ userId, desc, time }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${API}/users/find/${userId}`);
      setUser(data);
    };
    fetchUser();
  }, [user]);
  return (
    <Container>
      <Avatar src={user?.img || profilePic} />
      <Details>
        <Name>
          {user?.name} <Date>{time}</Date>
        </Name>
        <Text>{desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
