import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getCoursesById = async (id:String,excludeCourses:any) => {
    try {
        console.log("excludeCourses", excludeCourses)
        const res = await axios.get(`${base_url}/category/${id}/courses`)
        console.log("res ", res)
        if(excludeCourses) {
          const validCourses = res.data.filter((course:any)=>!excludeCourses.includes(course._id) )
          res.data = validCourses
        }
        
        return res
    } catch (error) {
        console.log(error)
        return `Error al obtener datos de la categoria ${id}`
    }
}



export default {
    getCoursesById,
}