import { Link } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: ${({ type }) => type !== "sm" && "300px"};
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${({ type }) => (type === "sm" ? "flex" : "block")};
  gap: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: ${({ type }) => (type === "sm" ? "100px" : "202px")};
  background-color: #999;
  border-radius: 12px;
  flex: ${({ type }) => type === "sm" && "1"};
`;
const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => (type !== "sm" ? "16px" : "0px")};
  gap: 12px;
  flex: ${({ type }) => type === "sm" && "1"};
`;
const ChannelAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${({ type }) => (type === "sm" ? "none" : "block")};
`;

const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 5px;
`;
const Info = styled.div`
  font-size: ${({ type }) => (type === "sm" ? "12px" : "14px")};
  color: ${({ theme }) => theme.textSecondary};
`;

const Card = ({ type }) => {
  return (
    <Link href="/video/1" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://i.ytimg.com/vi/CCF-xV3RSSs/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAhiGdEFM9iX7dH-AoeVq5WdyDwWA"
        />
        <Details type={type}>
          <ChannelAvatar
            type={type}
            src="https://yt3.ggpht.com/ytc/AIdro_luF-nK_BZqKzocE3qJoPsgRpL88k9zVsyUsZc3evTj8w=s88-c-k-c0x00ffffff-no-rj"
          />
          <Texts>
            <Title> Test Title</Title>
            <ChannelName>Test Channel</ChannelName>
            <Info type={type}> 2.3M views • 1 month ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
