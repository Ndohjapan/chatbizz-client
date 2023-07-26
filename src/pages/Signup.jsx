import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import images from "../assets/images.json"
import app from "../config/firebase-config";
import locale from "../assets/locale.json";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { setCredentials, showToast } from "../slices/authSlice";
import SignupForm from "../components/auth/SignupForm";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

function Signup() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);

      if (user) {
        if (user.emailVerified) {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const signUpWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const {email, photoURL, uid, displayName, accessToken} = result.user;
        const userInfo = {email, photoURL, uid, displayName, accessToken}
        if (token) {
          dispatch(setCredentials({ ...userInfo }));
          navigate("/");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        dispatch(showToast({title: locale["title-error"], message: locale["error-signup"]}));

      });
  };

  const signupWithEmailPassword = (formData) => {
    const { email, password, firstname, lastname } = formData;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: firstname + " " + lastname,
          photoURL: images.profile[(new Date).getMilliseconds() % 5]
        })
        await sendEmailVerification(user);
        navigate("/login");
      })
      .catch((error) => {
        const message = locale[error.code] || locale["error-signup"];
        dispatch(showToast({ title: locale["title-error"], message}));
      });
    
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex justify-center p-10 h-full md:p-0 md:h-screen">
          <SignupForm
            signUpWithGoogle={signUpWithGoogle}
            signupWithEmailPassword={signupWithEmailPassword}
          />
        </div>
      )}
    </>
  );
}

export default Signup;
