import { GoogleLoginButton } from "react-social-login-buttons";

function Login() {

    const handleAuth = () => {
        window.open(
            "http://localhost:8000/auth",
            "_self"
        )
    }
  return (
      <div className="login-container">
        <img className="login-logo" src={process.env.PUBLIC_URL + '/FlowMagic.png'} alt="Flow Magic Logo" />
          <GoogleLoginButton onClick={handleAuth} align="center" style={{ width: 220 }}/>
    </div>
  )
}

export default Login
