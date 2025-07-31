import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🚀 OAuthSuccess mounted");

    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      console.log("✅ Token stored:", token);
      localStorage.setItem("token", token);
      navigate("/"); // Redirect to a logged-in route
    } else {
      console.error("❌ No token found in URL");
    }
  }, []);

  return (
    <div className="text-white text-2xl p-10">
      Logging you in...
    </div>
  );
};

export default OAuthSuccess;
