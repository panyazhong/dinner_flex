import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function register(data) {
  let url = URL + 'register'
  let method = 'POST'
  return axiosJSON(method, url ,data)
}
