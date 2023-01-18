import axios from "axios"

const post = async (url: string) => {
  const result = await axios({
    method: 'get',
    url: url,
    headers: {'X-Custom-Header': 'virgo'}
  })
  return result;
}

const getCourses = async () => {
  const courses_res = await axios.get(
    'https://nestjs-virgo-production.up.railway.app/courses',
    {
      headers:{
        "Access-Control-Allow-Origin":true
      }
    }
  )
  return courses_res 
}

const getCourseVideos = async( courseId: String ) => {
  const res = await axios.get(
    `https://nestjs-virgo-production.up.railway.app/courses/${courseId}`,
    {
      headers:{
        "Access-Control-Allow-Origin":true
      }
    }
  )
  return res.data
}

const getUserInfo = async( email:String ) => {
  console.log('emauil ',email)
  const res = await axios.get(`https://nestjs-virgo-production.up.railway.app/user/${email}`)
  console.log(res)
  return res.data.payload
}

export default {
  post,
  getCourses,
  getCourseVideos,
  getUserInfo
}


