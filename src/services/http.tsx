import axios from "axios"

const post = async (url: string) => {
  const result = await axios({
    method: 'get',
    url: url,
    headers: { 'X-Custom-Header': 'virgo' }
  })
  return result;
}

const getCourses = async () => {
  const courses_res = await axios.get(
    'https://nestjs-virgo-production.up.railway.app/courses',
    {
      headers: {
        "Access-Control-Allow-Origin": true
      }
    }
  )
  return courses_res
}

// Post de Score
const postScore = async (id: string, score: number) => {
  const result = await axios({
    method: 'post',
    url: `https://nestjs-virgo-production.up.railway.app/videos/${id}/score`,
    data: {
      score
    }
  })
  return result;
}


const getCourseVideos = async (courseId: String) => {
  try {
    const res = await axios.get(
      `https://nestjs-virgo-production.up.railway.app/courses/${courseId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true
        }
      }
    )
    return res.data
  } catch (error) {
    // console.log(error)
    return 'ERROR AL TRAER VIDEOS PARA LAS CARDS'
  }
}

const getUserInfo = async (email: String) => {
  const res = await axios.get(`https://nestjs-virgo-production.up.railway.app/user/${email}`)
  return res.data.payload
}

const updateCourse = async (id: string, field: string, data: any) => {
  let body: any = {}
  body[field] = data
  console.log(body)
  const res = await axios.put(`https://nestjs-virgo-production.up.railway.app/courses/${id}`, body)
  return res
}



const getInfo = async (id: string | undefined) => {
  let category: any = await axios.get(`https://nestjs-virgo-production.up.railway.app/category`)
  let routes: any = await axios.get(`https://nestjs-virgo-production.up.railway.app/route`)
  let course: any = await axios.get(`https://nestjs-virgo-production.up.railway.app/courses/${id}`)
  let r_ = []
  let c_ = []
  for (let i = 0; i < routes.data.payload.length; i++) {
    const element = routes.data.payload[i];
    r_.push({ value: element['id'], label: element['name'] })
  }

  for (let i = 0; i < category.data.payload.length; i++) {
    const element = category.data.payload[i];
    c_.push({ value: element['id'], label: element['name'] })
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


  return [c_, r_, course.data.payload]
}

const editVideoInfo = async (id: string, body: any) => {
  const res = await axios.post(`https://nestjs-virgo-production.up.railway.app/videos/${id}`, body)
  window.location.reload()
  return res
}

const editCourseCover = async (id:string,body:any) => {
  const res =  await axios.post(`https://nestjs-virgo-production.up.railway.app/courses/${id}/uploadCover`,body)
  window.location.reload()
}

const newCourse = async (name:string) => {
  const res =  await axios.post(`https://nestjs-virgo-production.up.railway.app/courses`,{
    "name": name
  })
  return res.data
}

const newVideo = async (id:string,body:any) => {
  const res =  await axios.post(`https://nestjs-virgo-production.up.railway.app/courses/${id}/uploadVideo`,body,{timeout:1800000,headers:{ 'Access-Control-Allow-Origin': '*'}})
  return res.data
}


export default {
  post,
  getCourses,
  getCourseVideos,
  getUserInfo,
  updateCourse,
  getInfo,
  editVideoInfo,
  postScore,
  editCourseCover,
  newCourse,
  newVideo
}



