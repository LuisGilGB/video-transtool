'use client';

import dynamic from "next/dynamic";

const Main = dynamic(() => import("./Main"), {
  loading: () => <main className="relative min-h-screen flex flex-col justify-center items-center">Loading...</main>,
  ssr: false
});

const Home = () => <Main />

export default Home;
