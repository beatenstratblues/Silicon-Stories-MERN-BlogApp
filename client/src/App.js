import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserContext from "./UserContext";
import { useState } from "react";
import CreatePost from "./Pages/CreatePost";

function App() {
  const [userInfo, setUserInfo] = useState("");

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost/>}/>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
