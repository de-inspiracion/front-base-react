import { Routes, Route, useParams } from 'react-router-dom';
import { Divider } from "antd";
import { CourseEditor } from "./components/courseEditor/courseEdit";
import { VideoEditor } from "./components/videoEditor/videoEditor";
import "./adminCourses.css";
export const AdminCourses = () => {
  let { idCourse } = useParams();
  return (
    <div className='admin-course'>
      <Divider>Editor de curso</Divider>
      <CourseEditor></CourseEditor>
      <VideoEditor></VideoEditor>
    </div>
  );
};
