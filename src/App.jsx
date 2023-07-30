import Header from "./components/layout/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Toast from "./components/layout/Toast";
import { hideToast } from "./slices/authSlice";
import NotFound from "./pages/NotFound";
import StoreDashboard from "./routes/StoreDashboard";
import Example from "./pages/Example";

// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children }) => {
  const { twk } = useSelector((state) => state.auth);

  if (!twk) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default function App() {
  const { twk, toast } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        {twk ? (
          <Routes>
            <Route path="/" element={<Header />} />
          </Routes>
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <AuthWrapper>
                {" "}
                <Home />{" "}
              </AuthWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/example" element={<Example />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/store/:id/*"
            element={
              <AuthWrapper>
                {" "}
                <StoreDashboard />{" "}
              </AuthWrapper>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {toast.show && (
        <Toast
          message={toast.message}
          title={toast.title}
          onClose={() => dispatch(hideToast())}
        />
      )}
    </>
  );
}
