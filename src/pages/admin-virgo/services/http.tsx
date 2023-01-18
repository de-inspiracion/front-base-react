import axios from "axios"

const post = async (url: string) => {
  const result = await axios({
    method: 'get',
    url: url,
    headers: {'X-Custom-Header': 'virgo'}
  })
  return result;
}

export default {
  post
}