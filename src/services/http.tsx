import axios from "axios";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from 'uuid';
// const blobServiceClient = new BlobServiceClient("DefaultEndpointsProtocol=https;AccountName=virgoeducation;AccountKey=Gr8XFkzOt+/vUr9OwUy6SXcTBD91M8jWcEnPkrTGiefJzGAzxwIB4Er8Lzo4Xp7/f6yWcQgTh0pN+AStZfPzLw==;EndpointSuffix=core.windows.net");
const base_url = import.meta.env.VITE_BASE_URL;
const base_url_azure_store = import.meta.env.VITE_BASE_URL_AZURE_STORE;
const base_url_azure_sas = import.meta.env.VITE_AZURE_STORE_SAS;
const post = async (url: string) => {
  const result = await axios({
    method: "get",
    url: url,
    headers: { "X-Custom-Header": "virgo" },
  });
  return result;
};

const getUsers = async () => {
  const res = await axios.get(`${base_url}/user`);
  return res.data;
};

const getCourses = async () => {
  const courses_res = await axios.get(base_url + "/courses", {
    headers: {
      "Access-Control-Allow-Origin": true,
    },
  });
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
    const res = await axios.get(`${base_url}/courses/${courseId}`, {
      headers: {
        "Access-Control-Allow-Origin": true,
      },
    });
    return res.data;
  } catch (error) {
    return "ERROR AL TRAER VIDEOS PARA LAS CARDS";
  }
};

const getUserInfo = async (email: String) => {
  const res = await axios.get(`${base_url}/user/${email}`);
  return res.data.payload;
};

const updateCourse = async (id: string, field: string, data: any) => {
  let body: any = {};
  body[field] = data;
  console.log(body);
  const res = await axios.put(`${base_url}/courses/${id}`, body);
  return res;
};

const getInfo = async (id: string | undefined) => {
  let category: any = await axios.get(`${base_url}/category`);
  let routes: any = await axios.get(`${base_url}/route`);
  let course: any = await axios.get(`${base_url}/courses/${id}`);
  let tags: any =await axios.get(`${base_url}/tags/`);
  
  
  let r_ = [];
  let c_ = [];
  let t_ = [];

  for (let i = 0; i < routes.data.payload.length; i++) {
    const element = routes.data.payload[i];
    r_.push({ value: element["id"], label: element["name"] });
  }

  for (let i = 0; i < tags.data.payload.length; i++) {
    const element = tags.data.payload[i];
    t_.push({ value: element["_id"], label: element["name"] });
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

  let aux3 = [];
  for (let i = 0; i < course.data.payload.tags.length; i++) {
    aux3.push(course.data.payload.tags[i]["_id"]);
  }

  

  course.data.payload.route = aux2;
  course.data.payload.category = aux;
  return [c_, r_, course.data.payload,t_];
};

const editVideoInfo = async (id: string, body: any) => {
  console.log("id ", id, "body", body)
  const res = await axios.post(`${base_url}/videos/${id}`, body);
  // console.log(res.data)
  // window.location.reload();
  return res;
};

const editCourseCover = async (id: string, body: any) => {
  const res = await axios.post(`${base_url}/courses/${id}/uploadCover`, body);
  return res.data.payload.url;
};

const newCourse = async (name: string) => {
  const res = await axios.post(`${base_url}/courses`, {
    name: name,
  });
  return res.data;
};

const newVideo = async (id: string, file: any) => {
  
  try {
    const result = await uploadFile(file, id)
    console.log("result info : ", result)
    const res = await axios.post(`${base_url}/courses/${id}/video/new`, result);
    console.log("result info res: ", res)
    return res.data;
  } catch (error) {
    console.log("error ,", error)
  }

};

const infoToVideo = (fileParts: string) => {
  const nameParts = fileParts[0].split('-');
  const name = nameParts[1] || 'sin nombre';
  const num = nameParts[0] || 0;
  return {
    num,
    name,
  };
}
const uploadFile = async (file: any, course: string) => {
  const blobServiceClient = new BlobServiceClient(base_url_azure_sas);
  const fileParts = file.name.split('.');
  const extension = fileParts[fileParts.length - 1];
  const fileName = `${course}-${uuidv4()}.${extension}`;
  const containerClient = blobServiceClient.getContainerClient("");
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  // blobServiceClient.setProperties({ defaultServiceVersion: '2019-02-02' });
  const { num, name } = infoToVideo(fileParts);
  await blockBlobClient.uploadData(file)
  const url = base_url_azure_store +  'videos/' +  fileName
  return {url, num, name};
};

const getRoutes = async () => {
  const res = await axios.get(`${base_url}/route`);
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
  const res = await axios.post(`${base_url}/user/courseCertificate`, body);
  const base64String = res.data.toString("base64");

  const linkSource = `data:application/pdf;base64,${res.data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = `CERTIFICATE ${body.userName} - ${body.courseName}`;
  downloadLink.click();
};

const getStatistics = async (idUser: any) => {
  const res = await axios.get(`${base_url}/user/${idUser}/progressInfo`);
  return res;
};

const getQuestions = async (idVideo: string) => {
  const res = await axios.get(`${base_url}/videos/${idVideo}/questions`);
  return res;
};

const addQuestions = async (idVideo: string, body: any) => {
  const bodyQuestion = { questions: body };
  const res = await axios.post(
    `${base_url}/videos/${idVideo}/questions`,
    bodyQuestion
  );
  return res;
};

const getFiles = async (idVideo: string) => {
  const res = await axios.get(`${base_url}/videos/${idVideo}/files`);
  return res;
};

const deleteFile = async (idVideo: string, file: string) => {
  const res = await axios.delete(`${base_url}/videos/${idVideo}/file/${file}`);
  return res;
};

const deleteVideo = async (idVideo: string, idCourse: string) => {
  const res = await axios.delete(`${base_url}/courses/${idCourse}/video/${idVideo}`);
  return res;
};

const getDirective = async () => {
  const res = await axios.get(`${base_url}/directive`);
  return res;
};

const getCoursesDirective = async (idDirective: string) => {
  const res = await axios.get(`${base_url}/courses/directive/${idDirective}`);
  return res;
};

const usersDirective = async (idDirective: string) => {
  const res = await axios.get(`${base_url}/user/directive/${idDirective}`);
  return res;
};

const verifyUploaded = async (idVideo: string) => {
  const res = await axios.get(`${base_url}/videos/${idVideo}/verifyUpload`);
  return res;
};
const validateAnswers = async (videoId: String, answers: any) => {
  let body = {
    responses: answers.map((element: any) => {
      return {
        numberQuestion: element.number,
        numberOption: element.option_number,
      };
    }),
  };
  const res = await axios.post(
    `${base_url}/videos/${videoId}/questions/verify`,
    body
  );
  const verification = res.data.payload;

  return verification;
};

const getGeneralStatistics = async (directives:any) => {
  const res = await axios.get(
    `${base_url}/user/info/professors`,
  )
  if(directives.length > 0){
    const validData = res.data.filter((row:any)=>directives.includes(row.school))
    return validData;
  }
  return res.data
}

const getCourseVideosFinished = async (courseId: String, userId: string) => {
  try {
    const res = await axios.get(`${base_url}/courses/${courseId}/videosFinished`, {
      headers: {
        "userId": userId,
      },
    });
    return res.data;
  } catch (error) {
    return "ERROR AL TRAER VIDEOS PARA LAS CARDS";
  }
};
const uploadUsers = async () => {
  await await axios.get(
    `${base_url}/user/load/fromFile`
  )
}

const assingRoutes = async (courseId:string) => {
  console.log(courseId)
 const routes = await (await axios.get(`${base_url}/route`)).data.payload
 const mapRoutes:any = {}
  for (let i = 0; i < routes.length; i++) {
      mapRoutes[routes[i].id] = routes[i].name
  }
  let r_ = []
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].courses.length; j++) {
      if(routes[i].courses[j].id === courseId){
        r_.push(routes[i].courses)
      }
    }
  }
  r_ = r_.flat(1)
  r_ = r_.filter((course)=>course.id !== courseId)
  return r_
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
  getCoursesDirective,
  usersDirective,
  validateAnswers,
  verifyUploaded,
  deleteVideo,
  getGeneralStatistics,
  uploadUsers,
  getCourseVideosFinished,
  assingRoutes
};
