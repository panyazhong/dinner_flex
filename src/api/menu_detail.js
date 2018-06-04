import axiosJSON from '@/common/js/axiosJSON'

export function getMenuDetail(data) {
  let url = 'static/json/menuDetail.json'
  let method = 'GET'
  return axiosJSON(method, url, data)
}
