import styled, { ThemeProvider } from "styled-components";
import { Menu } from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import Login from "./pages/Login.jsx";
import { darkTheme, lightTheme } from "./utils/theme.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.bg};
`;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/video">
                    <Route path="/video/:id" element={<Video />}></Route>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
