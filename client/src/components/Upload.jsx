import axios from "axios";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 5px;
`;
const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
`;
const Title = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;
  padding: 10px 20px;
`;

const Input = styled.input`
  /* border: none; */
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border-radius: 3px;
  outline: none;
  padding: 10px;
`;

const Desc = styled.textarea`
  /* border: none; */
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  border-radius: 3px;
  outline: none;
  padding: 10px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const [video, setVideo] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [tags, setTags] = React.useState([]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const url = "https://api.cloudinary.com/v1_1/dwswzmg9t/video/upload";
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "uservideo");
    const resp = await axios.post(url, formData);
    const videoUrl = resp.data.secure_url;
    // console.log(videoUrl);

    await axios.post(
      "http://localhost:8800/api/videos/",
      {
        title: title,
        desc: desc,
        imgUrl: thumbnail,
        videoUrl: videoUrl,
        tags: tags,
      },
      { withCredentials: true }
    );
    setOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </Close>
        <Title>Upload a Video</Title>
        <Label>Video</Label>
        <Input
          onChange={(e) => setVideo(e.target.files[0])}
          type="file"
          accept="video/*"
          required
        />
        <Input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <Desc
          onChange={(e) => setDesc(e.target.value)}
          type="text"
          placeholder="Descripton"
          rows={8}
        />
        <Input
          onChange={(e) => setTags(e.target.value.split(","))}
          type="text"
          placeholder="Separate tags with commas."
        />
        <Label>Image</Label>
        <Input
          onChange={(e) => {
            setThumbnail(e.target.files[0]);
          }}
          type="file"
          accept="image/*"
          placeholder="Thumbnail"
        />
        <Button onClick={handelSubmit}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
