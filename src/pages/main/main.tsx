import { Outlet } from 'react-router-dom'
import NavBarComponent from '../../components/navbar/Navbar'
import SideBarComponent from '../../components/sidebar'
import './main.css'

export const Main = () => {
  return (
  <div className='mainPage'>
    <NavBarComponent></NavBarComponent>
    <div className='content'>
      {/* <SideBarComponent></SideBarComponent> */}
      <Outlet />
    </div>
  </div>
  )
}