  import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";
import CoursesInProgress from "./components/coursesInProgress/CoursesInProgress";
import RecommendedCourses from "./components/recommendedCourses/RecommendedCourses";
import "./home.css";
import services from "../../services/http";
import { useDispatch } from 'react-redux'
import { newDataUser } from '../../store/user/userData'
import { useSelector } from 'react-redux'
export const HomePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const dispatch = useDispatch()

  const userInfo = useSelector( (estado:any) => estado.userInfo  )
  console.log(userInfo)
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await services.getUserInfo(String(user?.email))
        dispatch(newDataUser({
          id: res.id,
          name: res.nombre,
          email: res.email,
          directive: res.directive,
          profile: res.perfil,
          authenticated: isAuthenticated,
          age: res.age,
          inprogress: res.inprogress,
          finished: res.finished,
          scored: res.scored
        }))
      } catch (error) {
        logout({ returnTo: "http://localhost:5173" });
      }

    };
    getData();
  }, []);

  return (
    <Content className="homePage">
      {isAuthenticated && (
        <div>
          {/* <h5>id: {userInfo.id}</h5>
          <h5>nombre: {userInfo?.nombre}</h5>
          <h5>correo: {userInfo.email}</h5>
          <h5>director: {userInfo.directive}</h5>
          <h5>director: {userInfo.perfil}</h5> */}
        </div>
      )}
      <CoursesInProgress></CoursesInProgress>
    </Content>
  );
};
