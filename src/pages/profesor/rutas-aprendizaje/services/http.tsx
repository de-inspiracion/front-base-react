import axios from 'axios'



const getLearningRoutes = async () => {
    try {
        const res:any = await axios.get('https://nestjs-virgo-production.up.railway.app/route')
        return res
    } catch (error) {
        return "Error al obtener las rutas de aprendizaje"
    }
}




export default {
    getLearningRoutes
}