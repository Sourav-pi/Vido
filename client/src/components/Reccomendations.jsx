import React, { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  flex: 2;
`;

const Reccomendations = ({ tags }) => {
  const [videos, setVideos] = React.useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/videos/tags?tags=${tags}`,
          { withCredentials: true }
        );
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type="sm" />
      ))}
    </Container>
  );
};

export default Reccomendations;
