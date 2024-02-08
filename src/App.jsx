import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const LoadingSuspense = lazy(() => import("./components/LoadingSuspense"));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSuspense />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
