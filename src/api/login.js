import axiosJSON from '@/common/js/axiosJSON'

export function login(data) {
  let url = 'http://git.urzz.me:50180/auth/login'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
