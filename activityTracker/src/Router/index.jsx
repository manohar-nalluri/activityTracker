import { createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import homeRoute from "./home";

const router=createBrowserRouter(
  createRoutesFromElements(
    homeRoute()
  )
)

export default router
