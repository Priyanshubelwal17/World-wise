import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticate) navigate("/");
    },
    [isAuthenticate, navigate]
  );

  return isAuthenticate ? children : null;
}

export default ProtectRoute;
