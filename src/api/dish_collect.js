import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getCollect(data) {
  let url = URL + 'getCollect'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
