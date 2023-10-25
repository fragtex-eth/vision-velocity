import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./views/Profile";
import Project from "./views/Project";
import DiscoverView from "./views/Discover";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ProjectsProvider } from "./context/projectsContext.tsx";
import { UsersProvider } from "./context/userContext.tsx";
import { LoginProvider } from "./context/login.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";

const { chains, publicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error 404</div>,
    children: [
      {
        path: "/",
        element: <DiscoverView />,
      },
      {
        path: "/project/:id",
        element: <Project />,
        errorElement: <div>Project Id not found</div>,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
        errorElement: <div>Profile not found</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModalProvider>
      <LoginProvider>
        <ProjectsProvider>
          <UsersProvider>
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains}>
                <RouterProvider router={router} />
              </RainbowKitProvider>
            </WagmiConfig>
          </UsersProvider>
        </ProjectsProvider>
      </LoginProvider>
    </ModalProvider>
  </React.StrictMode>,
);
