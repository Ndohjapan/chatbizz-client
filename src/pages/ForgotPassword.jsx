import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import app from "../config/firebase-config";
import errors from "../assets/error.json"
import { useDispatch } from "react-redux";
import { showToast } from "../slices/authSlice";

function ForgotPassword() {
  const auth = getAuth(app);

  const dispatch = useDispatch();


  const resetPassword = (formData) => {
    const { email } = formData;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        const message = "Password reset email sent. Check your inbox.";
        dispatch(showToast({ message }));
      })
      .catch((error) => {
        const message = errors[error.code] || errors["error-signin"];
        dispatch(showToast({ title: errors["title-error"], message }));
      });
  };

  return (
    <>
      <div className="flex justify-center p-10 h-full md:p-0 md:h-screen">
        <ForgotPasswordForm resetPassword={resetPassword} />
      </div>
    </>
  );
}

export default ForgotPassword;
