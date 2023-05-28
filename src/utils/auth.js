import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserNmaeKey = 'UserNmae'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserNmae() {
  return Cookies.get(UserNmaeKey)
}

export function setUserNmae(UserNmae) {
  return Cookies.set(UserNmaeKey, UserNmae)
}

export function removeUserNmae() {
  return Cookies.remove(UserNmaeKey)
}
