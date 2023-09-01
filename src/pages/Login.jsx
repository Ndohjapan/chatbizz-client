import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../config/firebase-config";
import { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";
import errors from "../assets/error.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, showToast } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userApiSlice";
const provider = new GoogleAuthProvider();

provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

function Login() {
  const auth = getAuth(app);

  const [getJwt, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { twk } = useSelector((state) => state.auth);

  useEffect(() => {
    if (twk) {
      navigate("/");
    }
  }, [navigate, twk]);

  const getJWT = async (token) => {
    try {
      const res = await getJwt({ token });
      if (res.error) return Error(JSON.stringify(res.error));
      return res;
    } catch (error) {
      dispatch(
        showToast({
          title: errors["title-error"],
          message: errors["error-signin"],
        })
      );
    }
  };

  const loginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (userCredentials) => {
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredentials);
        const token = credential.accessToken;
        const { email, photoURL, uid, displayName } = userCredentials.user;

        if (token) {
          const idToken = await auth.currentUser.getIdToken();
          const res = await getJWT(idToken);
          if (!res.data) {
            dispatch(
              showToast({
                title: errors["title-error"],
                message: JSON.parse(res.message).data.message,
              })
            );
          } else {
            const userInfo = {
              email,
              photoURL,
              uid,
              displayName,
              accessToken: res.data.token,
            };
            dispatch(setCredentials({ ...userInfo }));
            navigate("/");
          }
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        dispatch(
          showToast({
            title: errors["title-error"],
            message: errors["error-signin"],
          })
        );
      });
  };

  const loginWithEmailPassword = (formData) => {
    const { email, password } = formData;

    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const { email, photoURL, uid, displayName } = user;

          if (user.emailVerified) {
            const idToken = await auth.currentUser.getIdToken();
            const res = await getJWT(idToken);
            if (!res.data) {
              dispatch(
                showToast({
                  title: errors["title-error"],
                  message: JSON.parse(res.message).data.message,
                })
              );
              reject(false);
            } else {
              const userInfo = {
                email,
                photoURL,
                uid,
                displayName,
                accessToken: res.data.token,
              };
              dispatch(setCredentials({ ...userInfo }));
              navigate("/");
              resolve(true);
            }
          } else {
            dispatch(
              showToast({
                title: errors["title-error"],
                message: errors["unverified-email"],
              })
            );
            reject(false);
          }
        })
        .catch((error) => {
          console.log(error);
          const message = errors[error.code] || errors["error-signin"];
          dispatch(showToast({ title: errors["title-error"], message }));
          reject(false);
        });
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
