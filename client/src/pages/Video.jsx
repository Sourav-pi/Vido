import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchStart, fetchSuccess, like, dislike } from "../redux/VideoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/UserSlice";
import Comments from "../components/Comments";
import Reccomendations from "../components/Reccomendations";
import profilePic from "../img/default-profile-pic.png";

const API = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  gap: 20px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  background-color: #f9f9f9;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.div`
  color: ${({ theme }) => theme.textSecondary};
`;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bgLighter};
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 8px;
  border-radius: 10px;
`;

const Hr = styled.hr`
  margin: 10px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
`;
const Subscribe = styled.button`
  padding: 10px 20px;
  height: max-content;
  background-color: red;
  color: white;
  border: none;
  border-radius: 10px;
`;
const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  gap: 5px;
`;
const ChannelAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;
const ChannelName = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 5px;
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        const videoResponse = await axios.get(` ${API}/videos/find/${path}`, {
          withCredentials: true,
        });
        const channelResponse = await axios.get(
          `${API}/users/find/${videoResponse.data.userId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(fetchSuccess(videoResponse.data));

        setChannel(channelResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [path]);

  const handelLike = async () => {
    await axios.put(
      `${API}/users/like/${currentVideo._id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(like(currentUser?._id));
  };
  const handelDislike = async () => {
    await axios.put(
      `${API}/users/dislike/${currentVideo._id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(dislike(currentUser?._id));
  };

  const handelSub = async () => {
    const resp = await axios.put(
      `${API}/users/${
        currentUser?.subscribedUsers?.includes(channel?._id) ? "unsub" : "sub"
      }/${channel._id}`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            controls
            src={
              currentVideo?.videoUrl ||
              "https://res.cloudinary.com/dwswzmg9t/video/upload/v1735367430/kgjo4l8epp7cz97vqddq.mp4"
            }
            type="video/mp4"
          ></VideoFrame>
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handelLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>

            <Button onClick={handelDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>

            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>

            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelAvatar src={channel?.img || profilePic} />
            <ChannelDetails>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subsribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          {currentUser?._id !== channel?._id && (
            <Subscribe onClick={handelSub}>
              {currentUser?.subscribedUsers?.includes(channel?._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"}
            </Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Reccomendations tags={currentVideo.tags} />
    </Container>
  );
};

export default Video;
