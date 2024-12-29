import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card.jsx";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0px 20px;
  /* height: 100%; */
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`${API}/videos/${type}`, {
        withCredentials: true,
      });
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
