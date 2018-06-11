import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function register(data) {
  let url = 'http://git.urzz.me:50180/auth/register'
  let method = 'POST'
  return axiosJSON(method, url ,data)
}
