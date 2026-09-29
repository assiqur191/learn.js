import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import App from "./App.jsx";
// import Demo from "./state-explorer/Demo.jsx";
// import FormDemo from "./state-explorer/FormDemo.jsx";
// import EffectEffect from "./state-explorer/EffectEffect.jsx";
// import RefRef from "./state-explorer/RefRef.jsx";
import MainLayout from "./layout/MainLayout.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Demo /> */}
    {/* <FormDemo /> */}
    {/* <EffectEffect /> */}
    {/* <RefRef /> */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
