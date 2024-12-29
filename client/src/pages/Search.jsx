import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
const API = import.meta.env.VITE_API_URL;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0px 20px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().pathname.split("/")[2];
  useEffect(() => {
    const fetchVideos = async () => {
      const resp = await axios.get(`${API}/videos/search?q=${query}`);
      setVideos(resp.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
