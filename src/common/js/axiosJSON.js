import axios from 'axios'
import Qs from 'qs'

axios.defaults.withCredentials = true

export default function axiosJSON(method, url, data, flag) {
  if (data && flag) {
    data = data
  } else {
    data = Qs.stringify(data)
  }

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data
    })
      .then(resp => {
        if (resp) {
          resolve(resp)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
