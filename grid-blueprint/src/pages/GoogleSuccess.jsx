import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      if (email) {
        localStorage.setItem("gb_user", JSON.stringify({ email }));
      }
      navigate("/"); // redirect to home
    }
  }, []);

  return <h2>Logging you in...</h2>;
};

export default GoogleSuccess;