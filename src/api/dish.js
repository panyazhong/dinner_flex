import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function addDish(data) {
  let url = URL + 'addDish'
  let method = 'POST'
  return axiosJSON(method, url ,data)
}

export function getDish(data) {
  let url = URL + 'getDish'
  let method = 'GET'
  return axiosJSON(method, url ,data)
}
