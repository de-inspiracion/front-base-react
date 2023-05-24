import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { newDataUser } from "../../../store/user/userData";
import services from "../../../services/http";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = ({ setUserRole }: any) => {
  const { user, isAuthenticated } = useAuth0();
  const [profile, setProfile] = useState("");
  // console.log("user", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        let res = await services.getUserInfo(String(user?.email));
        if (res.perfil == "profesor") {
          try {
            const excloudedCourses = res.directive.excludeCourses;
            res.inprogress = res.inprogress.filter(
              (course: any) => !excloudedCourses.includes(course.course._id)
            );
          } catch (error) {}
        }
        dispatch(
          newDataUser({
            id: res.id,
            name: res.nombre,
            email: res.email,
            directive: res.directive,
            directives: res.directives || [],
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
        console.log(err);
      }
    };
    getData();
  }, []);

  console.log("profile", profile);
  if (profile === "") {
    return null;
  }
  setUserRole(profile);

  if (profile === "virgo") {
    return <Navigate to="/admin" />;
  } else if (profile === "directiva") {
    return <Navigate to="/directive" />;
  } else if (profile === "sostenedor") {
    return <Navigate to="/sostenedor/statistics" />;
  } else if (profile === "profesor") {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/" />;
  }
};
