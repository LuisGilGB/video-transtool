'use client';

import dynamic from "next/dynamic";
import MainFallback from "./MainFallback";

const Main = dynamic(() => import("./Main"), {
  loading: () => <MainFallback />,
  ssr: false
});

const Home = () => <Main />

export default Home;
