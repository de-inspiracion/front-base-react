
import { useEffect,useState } from 'react'
import { Content } from 'antd/es/layout/layout'
import { useAuth0 } from '@auth0/auth0-react'
import CoursesInProgress from './components/coursesInProgress/CoursesInProgress'
import RecommendedCourses from './components/recommendedCourses/RecommendedCourses'
import './home.css'
import services from '../../services/http'
export const HomePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const [userInfo,setUserInfo] = useState({})
  console.log(isAuthenticated,user?.email)
  
  useEffect(()=>{
    const getData = async () => {
      let res = await services.getUserInfo(String(user?.email))
      setUserInfo(res)
    }
    getData()
  },[])

  console.log('info user: ',userInfo)
  return (
  <Content className='homePage'>
    { isAuthenticated && 
      <div style={{color:'white'}}>
        <h5>id: {userInfo.id}</h5>
        <h5>nombre: {userInfo?.nombre}</h5>
        <h5>correo: {userInfo.email}</h5>
        <h5>director: {userInfo.directive}</h5>
        <h5>director: {userInfo.perfil}</h5>
      </div>
    }
    <CoursesInProgress></CoursesInProgress>
    <RecommendedCourses></RecommendedCourses>
  </Content>
  )
}