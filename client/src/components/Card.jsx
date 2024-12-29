import { Link } from "@mui/material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";
import profilPic from "../img/default-profile-pic.png";
import defaultThumbnail from "../img/no thumbnail.png";
const API = import.meta.env.VITE_API_URL;

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

const Card = ({ type, video }) => {
  const [channel, setChannel] = React.useState({});
  const handelCardClick = async () => {
    try {
      const resp = await axios.put(`${API}/videos/view/${video?._id}`);
      console.log(resp.data);
      console.log("video clicked");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(`${API}/users/find/${video?.userId}`);
      setChannel(response.data);
    };
    fetchChannel();
  }, [video?.userId]);
  return (
    <Link
      href={`/video/${video?._id}`}
      onClick={handelCardClick}
      style={{ textDecoration: "none" }}
    >
      <Container type={type}>
        <Image type={type} src={video?.imgUrl || defaultThumbnail} />
        <Details type={type}>
          <ChannelAvatar
            type={type}
            src={channel?.profilePicture || profilPic}
          />
          <Texts>
            <Title> {video?.title}</Title>
            <ChannelName>{channel.img}</ChannelName>
            <Info type={type}>
              {video?.views} views • {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
