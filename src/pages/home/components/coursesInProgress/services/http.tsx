import axios from 'axios'

const getCategories = async() => {
    const res = await axios.get("https://nestjs-virgo-production.up.railway.app/category")
    return res
}


export default {
    getCategories
}