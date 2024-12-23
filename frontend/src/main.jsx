import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthChatContextProvider } from "./context/authChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AuthChatContextProvider>
      <StrictMode>
        <App />
        <ToastContainer
          position="top-right"
          autoClose="4000"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="toastBody"
        />
      </StrictMode>
      ,
    </AuthChatContextProvider>
  </AuthProvider>
);
