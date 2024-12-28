import React, { useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import profilePic from "../img/default-profile-pic.png";
const API = import.meta.env.VITE_API_URL;

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const SendComment = styled(SendIcon)`
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ videoId }) => {
  const currentUser = useSelector(
    (state) => state.user.currentUser
  )?.currentUser;
  const [comments, setComments] = React.useState([]);
  const [newComment, setNewComment] = React.useState("");
  const [trigger, setTrigger] = React.useState(false);

  useEffect(() => {
    // fetch comments from the server
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${API}/comments/${videoId}`, {
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId, trigger]);

  const handelSendComment = async () => {
    await axios.post(
      `${API}/comments/`,
      { videoId, desc: newComment },
      { withCredentials: true }
    );
    setNewComment("");
    setTrigger(!trigger);
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img || profilePic} />
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <IconButton>
          <SendComment onClick={handelSendComment} />
        </IconButton>
      </NewComment>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          desc={comment.desc}
          time={format(comment.createdAt)}
          userId={comment.userId}
        />
      ))}
    </Container>
  );
};

export default Comments;
