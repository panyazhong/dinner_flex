import axiosJSON from '@/common/js/axiosJSON'

export function addDish(data) {
  let url = 'http://localhost:8090/addDish'
  let method = 'POST'
  return axiosJSON(method, url ,data)
}
