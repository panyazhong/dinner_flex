import axios from 'axios'
import Qs from 'qs'

export default function axiosJSON(method, url, data) {
  if (data) {
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
