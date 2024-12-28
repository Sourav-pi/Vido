import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 10px 0px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  height: 32px;
  width: 32px;
  background-color: #999;
  border-radius: 50%;
`;

const SearchIcon = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 1px 5px;
  &:hover {
    background-color: ${({ theme }) => theme.bgLighter};
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Link
              href={search ? `/search/${search}` : "/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <SearchIcon>
                <SearchOutlinedIcon />
              </SearchIcon>
            </Link>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar />
              {currentUser.name}
            </User>
          ) : (
            <Link
              href="/Login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>
                <AccountCircleOutlinedIcon /> SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
