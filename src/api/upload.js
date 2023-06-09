import request from '@/utils/request'

export function upload_img(data) {
  return request({
    url: '/upload/img',
    method: 'post',
    data
  })
}
