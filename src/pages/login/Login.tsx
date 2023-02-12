import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { newDataUser } from "../../store/user/userData";
import services from "../../services/http";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  console.log("user", user);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await services.getUserInfo(String(user?.email));
        dispatch(
          newDataUser({
            id: res.id,
            name: res.nombre,
            email: res.email,
            directive: res.directive,
            profile: res.perfil,
            authenticated: isAuthenticated,
            age: res.age,
            inprogress: res.inprogress,
            finished: res.finished,
            scored: res.scored,
          })
        );
        setProfile(res.perfil);
      } catch (err) {
        navigate("/accountnotfound");
      }
    };
    getData();
  }, []);

  if (profile === "") {
    return null;
  }

  console.log("profileEnter", profile === "virgo");
  console.log("profileEnButton", profile);
  return profile === "virgo" ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/home" />
  );
};
