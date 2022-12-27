
import { Content } from 'antd/es/layout/layout'
import CoursesInProgress from './components/coursesInProgress/CoursesInProgress'
import RecommendedCourses from './components/recommendedCourses/RecommendedCourses'
import './home.css'
export const HomePage = () => {
  return (
  <Content className='homePage'>
    <CoursesInProgress></CoursesInProgress>
    <RecommendedCourses></RecommendedCourses>
  </Content>
  )
}