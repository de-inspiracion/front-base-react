import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getCoursesById = async (id:String,excludeCourses:any) => {
    try {
        const res = await axios.get(`${base_url}/category/${id}/courses`)
        const validCourses = res.data.filter((course:any)=>!excludeCourses.includes(course._id) )
        // console.log(excludeCourses)
        // console.log(res.data)
        res.data = validCourses
        return res
    } catch (error) {
        console.log(error)
        return `Error al obtener datos de la categoria ${id}`
    }
}



export default {
    getCoursesById,
}