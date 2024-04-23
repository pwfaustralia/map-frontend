import { useEffect, useRef, useState } from "react";
import useLoginUser from "../../hooks/useLoginUser";
import "./LoginPage.css";
import Button from "../../components/atoms/button/Button";
import Input from "../../components/atoms/input/Input";
import { mail, lockClosed } from "ionicons/icons";

function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const { loginUser, isMutating, error } = useLoginUser();

  const handleSignin = () => {
    setErrorMessage(null);
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setErrorMessage("Invalid email/password.");
      return;
    }
    loginUser(emailRef.current.value + "", passwordRef.current.value + "");
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error?.response?.data?.error || "No response from server");
    }
  }, [error]);

  return (
    <>
      <h1>Login</h1>
      {errorMessage && <h4>{errorMessage}</h4>}
      {isMutating && <h2>Signing in...</h2>}
      <section className="login-form">
        <Input
          innerRef={emailRef}
          type="email"
          fill="outline"
          disabled={isMutating}
          placeholder="Enter your email"
          icon={mail}
        ></Input>
        <Input
          innerRef={passwordRef}
          type="password"
          fill="outline"
          disabled={isMutating}
          placeholder="Enter your password"
          icon={lockClosed}
        ></Input>
        <Button onClick={handleSignin} disabled={isMutating} color="primary">
          Sign In
        </Button>
      </section>
    </>
  );
}

export default Login;
