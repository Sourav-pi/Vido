import React from "react";
import styled from "styled-components";
import logo from "../img/logo.png";

// Importing icons from Material-UI
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightness";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";

// Styled sub-components
const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 12px 12px;
  height: 100%;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
  font-size: large;
  margin-bottom: 25px;
  margin-left: 12px;
`;
const Img = styled.img`
  height: 25px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.bg};
  }
`;

const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 10px;
`;

// Menu component
export const Menu = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Wrapper>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={logo} />
            Vido
          </Logo>
        </Link>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeOutlinedIcon />
            Home
          </Item>
        </Link>
        <Link
          href="/trend"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link href="/sub" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link
                href="/Login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>
                  <AccountCircleOutlinedIcon /> SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF VIDO</Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        <Item
          onClick={() => {
            props.setIsDarkTheme(!props.isDarkTheme);
          }}
        >
          <SettingsBrightnessOutlinedIcon />
          {!props.isDarkTheme ? "Dark" : "Light"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};
