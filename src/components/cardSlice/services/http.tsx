import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getCoursesById = async (id:String) => {
    try {
        const res = await axios.get(`${base_url}/category/${id}/courses`)
        return res
    } catch (error) {
        console.log(error)
        return `Error al obtener datos de la categoria ${id}`
    }
}



export default {
    getCoursesById,
}