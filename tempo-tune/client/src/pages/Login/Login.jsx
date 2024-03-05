import "./Login.css";

const Login = () => {

  const handleLoginClick = () => {
    window.location.href="http://localhost:8888/login";
  };

  return (
    <div className="login-page-container">
      <h1>Welcome to TempoTune</h1>
      <h2>A tool to find songs with the BPM you want!</h2>
      <button className="login-button" onClick = {handleLoginClick}>Log in with Spotify</button>
    </div>
  )
}

export default Login
