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

const updateCourse = async(id:string,field:string,data:any) => {
  let body:any = {}
  body[field] = data
  console.log(body)
  const res = await axios.put(`https://nestjs-virgo-production.up.railway.app/courses/${id}`,body)
  return res
}

const getInfo = async(id:string|undefined) => {
  let category:any = await axios.get(`https://nestjs-virgo-production.up.railway.app/category`)
  let routes:any = await axios.get(`https://nestjs-virgo-production.up.railway.app/route`)
  let course:any = await axios.get(`https://nestjs-virgo-production.up.railway.app/courses/${id}`)
  let r_ = []
  let c_ = []
  for (let i = 0; i < routes.data.payload.length; i++) {
    const element = routes.data.payload[i];
    r_.push({value:element['id'],label:element['name']})
  }

  for (let i = 0; i < category.data.payload.length; i++) {
    const element = category.data.payload[i];
    c_.push({value:element['id'],label:element['name']})
  }

  let aux = []
  for (let i = 0; i < course.data.payload.category.length; i++) {
      aux.push(course.data.payload.category[i]['id'])
  }

  let aux2 = []
  for (let i = 0; i < course.data.payload.route.length; i++) {
      aux2.push(course.data.payload.route[i]['_id'])
  }

  course.data.payload.route = aux2
  course.data.payload.category = aux
  

  return [c_,r_,course.data.payload]
}

const editVideoInfo = async (id:string,body:any) => {
  const res = await axios.post(`https://nestjs-virgo-production.up.railway.app/videos/${id}`,body)
  window.location.reload()
  return res
}

const editCourseCover = async (id:string,body:any) => {
  const res =  await axios.post(`https://nestjs-virgo-production.up.railway.app/courses/${id}/uploadCover`,body)
  window.location.reload()
}

export default {
  post,
  getCourses,
  getCourseVideos,
  getUserInfo,
  updateCourse,
  getInfo,
  editVideoInfo,
  editCourseCover
}


