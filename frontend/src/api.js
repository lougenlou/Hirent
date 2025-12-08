import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
});


export default function App() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Send Google credential to your backend
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      });
      console.log("Login success, backend response:", res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={{ padding: "2rem" }}>
        <h1>Login with Google</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export { api };