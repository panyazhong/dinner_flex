import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function login(data) {
  let url = URL + 'auth/login'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
