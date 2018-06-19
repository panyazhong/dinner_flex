import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getUserInfoById(data) {
  let url = URL + 'getUserInfoById'
  let method = 'POST'
  return axiosJSON(method, url, data)
}

export function modifyUser(data) {
  let url = URL + 'modifyUser'
  let method = 'POST'
  return axiosJSON(method, url, data, 1)
}
