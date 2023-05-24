import http from '../../../../services/http'

export const getListInProgress = async () => {
  return await http.post('https://jsonplaceholder.typicode.com/todos/1')
}