import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getMenuDetail(data) {
  let url = 'static/json/menuDetail.json'
  let method = 'GET'
  return axiosJSON(method, url, data)
}
