import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getDishByType(data) {
  let url = URL + 'getDish'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
