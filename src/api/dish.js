import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function addDish(data) {
  let url = URL + 'addDish'
  let method = 'POST'
  return axiosJSON(method, url ,data)
}

export function getDish(data) {
  // let url = URL + 'getDish'
  let url = 'http://serve.dapanpro.com:8000/getType'
  let method = 'GET'
  return axiosJSON(method, url ,data)
}

export function getDishType() {
  let url = URL + 'getDishType'
  let method = 'GET'
  return axiosJSON(method, url)
}
