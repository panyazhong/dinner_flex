import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getMenuDetail(data) {
  let url = URL + 'getDishById'
  let method = 'POST'
  return axiosJSON(method, url, data)
}

export function addToVote(data) {
  let url = URL + 'addToVote'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
