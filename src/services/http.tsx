import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL
console.log(base_url)
const post = async (url: string) => {
  const result = await axios({
    method: "get",
    url: url,
    headers: { "X-Custom-Header": "virgo" },
  });
  return result;
};

const getUsers = async () => {
  const res = await axios.get(
    `${base_url}/user`
  );
  return res.data;
};

const getCourses = async () => {
  const courses_res = await axios.get(
    base_url + "/courses",
    {
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    }
  );
  return courses_res;
};

// Post de Score
const postScore = async (id: string, score: number) => {
  const result = await axios({
    method: "post",
    url: `${base_url}/videos/${id}/score`,
    data: {
      score,
    },
  });
  return result;
};

const getCourseVideos = async (courseId: String) => {
  try {
    const res = await axios.get(
      `${base_url}/courses/${courseId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": true,
        },
      }
    );
    return res.data;
  } catch (error) {
    return "ERROR AL TRAER VIDEOS PARA LAS CARDS";
  }
};

const getUserInfo = async (email: String) => {
  const res = await axios.get(
    `${base_url}/user/${email}`
  );
  return res.data.payload;
};

const updateCourse = async (id: string, field: string, data: any) => {
  let body: any = {};
  body[field] = data;
  console.log(body);
  const res = await axios.put(
    `${base_url}/courses/${id}`,
    body
  );
  return res;
};

const getInfo = async (id: string | undefined) => {
  let category: any = await axios.get(
    `${base_url}/category`
  );
  let routes: any = await axios.get(
    `${base_url}/route`
  );
  let course: any = await axios.get(
    `${base_url}/courses/${id}`
  );

  let r_ = [];
  let c_ = [];
  for (let i = 0; i < routes.data.payload.length; i++) {
    const element = routes.data.payload[i];
    r_.push({ value: element["id"], label: element["name"] });
  }

  for (let i = 0; i < category.data.payload.length; i++) {
    const element = category.data.payload[i];
    c_.push({ value: element["id"], label: element["name"] });
  }

  let aux = [];
  for (let i = 0; i < course.data.payload.category.length; i++) {
    aux.push(course.data.payload.category[i]["id"]);
  }

  let aux2 = [];
  for (let i = 0; i < course.data.payload.route.length; i++) {
    aux2.push(course.data.payload.route[i]["_id"]);
  }

  course.data.payload.route = aux2;
  course.data.payload.category = aux;

  return [c_, r_, course.data.payload];
};

const editVideoInfo = async (id: string, body: any) => {
  const res = await axios.post(
    `${base_url}/videos/${id}`,
    body
  );
  window.location.reload();
  return res;
};

const editCourseCover = async (id: string, body: any) => {
  const res = await axios.post(
    `${base_url}/courses/${id}/uploadCover`,
    body
  );
  window.location.reload();
};

const newCourse = async (name: string) => {
  const res = await axios.post(
    `${base_url}/courses`,
    {
      name: name,
    }
  );
  return res.data;
};

const newVideo = async (id: string, body: any) => {
  const res = await axios.post(
    `${base_url}/courses/${id}/uploadVideo`,
    body,
    { timeout: 1800000, headers: { "Access-Control-Allow-Origin": "*" } }
  );
  return res.data;
};

const getRoutes = async () => {
  const res = await axios.get(
    `${base_url}/route`
  );
  return res;
};

const editUserVideoProgress = async (userId: String, body: any) => {
  try {
    const res = await axios.post(
      `${base_url}/user/${userId}/course/inProgress`,
      body
    );
    return res;
  } catch (error) {
    console.log(error);
    return `Error al mandar progreso del video del usuario ${userId}`;
  }
};

const getCertificate = async (body: any) => {
  const res = await axios.post(
    `${base_url}/user/courseCertificate`,
    body
  );
  const base64String = res.data.toString("base64");

  const linkSource = `data:application/pdf;base64,${res.data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = `CERTIFICATE ${body.userName} - ${body.courseName}`;
  downloadLink.click();
};

const getStatistics = async (idUser: any) => {
  const res = await axios.get(
    `${base_url}/user/${idUser}/progressInfo`
  );
  return res;
};

const getQuestions = async (idVideo: string) => {
  const res = await axios.get(
    `${base_url}/videos/${idVideo}/questions`
  );
  return res;
}

const addQuestions = async (idVideo: string, body: any) => {
  const bodyQuestion = { questions: body}
  const res = await axios.post(
    `${base_url}/videos/${idVideo}/questions`,
    bodyQuestion
  );  
  return res;
}

const getFiles = async (idVideo: string) => {
  const res = await axios.get(
    `${base_url}/videos/${idVideo}/files`
  );
  return res;
}

const deleteFile = async (idVideo: string, file: string) => {
  const res = await axios.delete(
    `${base_url}/videos/${idVideo}/file/${file}`
  );
  return res;
}

const getDirective = async () => {
  const res = await axios.get(
    `${base_url}/directive`
  );
  return res;
};

const validateAnswers = async( videoId: String, answers:any)=>{

  let body = {
    responses: answers.map((element:any)=> {
      return {
        numberQuestion: element.number,
        numberOption: element.option_number
      }
    })
  }
  const res = await axios.post(`${base_url}/videos/${videoId}/questions/verify`,body)
  const verification = res.data.payload
  
  return verification
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
  newVideo,
  getRoutes,
  editUserVideoProgress,
  getCertificate,
  getStatistics,
  getQuestions,
  addQuestions,
  getFiles,
  deleteFile,
  getUsers,
  getDirective,
  validateAnswers
};
