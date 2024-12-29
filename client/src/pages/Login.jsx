import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/UserSlice";
import { Navigate, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  /* background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft}; */
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Login = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const handelSignIn = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const user = await axios.post(
        `${API}/auth/signin`,
        {
          name,
          password,
        },
        { withCredentials: true }
      );
      // console.log(user.data);
      dispatch(loginSuccess(user.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(loginFailure(true));
    }
  };

  const handelSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post(
        `${API}/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      handelSignIn(e);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Vido</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={handelSignIn}>Sign in</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button onClick={handelSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Login;
