import { useParams, useLocation } from "react-router-dom";
import { Divider } from "antd";
import { CourseEditor } from "./components/courseEditor/courseEdit";
import "./adminCourses.css";
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
