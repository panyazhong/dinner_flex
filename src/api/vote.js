import axiosJSON from '@/common/js/axiosJSON'
import {URL} from '@/api/config'

export function getVotes(data) {
  let url = URL + 'getVotes'
  let method = 'POST'
  return axiosJSON(method, url, data)
}

export function vote(data) {
  let url = URL + 'vote'
  let method = 'POST'
  return axiosJSON(method, url, data)
}
