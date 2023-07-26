import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../config/firebase-config";
import { useEffect} from "react";
import LoginForm from "../components/auth/LoginForm";
import locale from "../assets/locale.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, showToast } from "../slices/authSlice";
const provider = new GoogleAuthProvider();


provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

function Login() {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { twk } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (twk) {
      navigate("/");
    }
  }, [navigate, twk]);

  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredentials);
        const token = credential.accessToken;
        const { email, photoURL, uid, displayName, accessToken } =
          userCredentials.user;
        const userInfo = { email, photoURL, uid, displayName, accessToken };

        if (token) {
          dispatch(setCredentials({ ...userInfo }));
          navigate("/");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        dispatch(showToast({title: locale["title-error"], message: locale["error-signin"]}));
      });
  };

  const loginWithEmailPassword = async (formData) => {
    const { email, password } = formData;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, photoURL, uid, displayName, accessToken } = user;
        const userInfo = { email, photoURL, uid, displayName, accessToken };

        if (user.emailVerified) {
          dispatch(setCredentials({ ...userInfo }));
          navigate("/");
        } else {
          dispatch(showToast({ title: locale["title-error"], message: locale["unverified-email"]}));
        }
      })
      .catch((error) => {
        const message = locale[error.code] || locale["error-signin"];
        dispatch(showToast({ title: locale["title-error"], message}));
      });
  };

  return (
    <>
      <div className="flex justify-center p-10 h-full md:p-0 md:h-screen">
        <LoginForm
          loginWithGoogle={loginWithGoogle}
          loginWithEmailPassword={loginWithEmailPassword}
        />
      </div>
    </>
  );
}

export default Login;
