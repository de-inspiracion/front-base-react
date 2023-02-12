import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { Divider } from "antd";
import { CourseEditor } from "./components/courseEditor/courseEdit";
import { VideoEditor } from "./components/videoEditor/videoEditor";

import "./adminCourses.css";
import NavBarComponent from "../../../../components/navbar/Navbar";
export const AdminCourses = () => {
  let { idCourse } = useParams();
  let { state } = useLocation();
  return (
    <>
      <div
        className="admin-course"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Divider style={{ color: "white", fontSize: "3vh" }}>
          Editor de curso
        </Divider>
        <CourseEditor state={state}></CourseEditor>
      </div>
    </>
  );
};
