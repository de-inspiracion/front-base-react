import axios from "axios";

const getCoursesById = async (id:String) => {
    try {
        const res = await axios.get(`https://nestjs-virgo-production.up.railway.app/category/${id}/courses`)
        return res
    } catch (error) {
        console.log(error)
        return `Error al obtener datos de la categoria ${id}`
    }
}



export default {
    getCoursesById,
}