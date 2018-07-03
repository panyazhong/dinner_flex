import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getNewestDish(data) {
  let url = URL + 'getNewestDish'
  let method = 'GET'
  return axiosJSON(method, url, data)
}
