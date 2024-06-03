import React from "react";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { main_route, tool_route, about_route } from "./Routes";
import MainPage from "../MainPage/MainPage";
import ToolPage from "../ToolPage/ToolPage";
import AboutPage from "../AboutPage/AboutPage";

function Router() {
    return (
      <Box>
        <Routes>
          <Route path={main_route} element={<MainPage />}></Route>
          <Route path={tool_route} element={<ToolPage />}></Route>
          <Route path={about_route} element={<AboutPage />}></Route>
        </Routes>
      </Box>
    );
  }
  
export default Router