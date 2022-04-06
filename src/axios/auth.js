import Cookies from 'js-cookie'

const TokenKey = 'mob-bi'
// const domain = 'mob.com' // Cookies设置的对此域名可见
const domain = ''

export function getToken () {
  return Cookies.get(TokenKey, { domain })
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, {
    domain,
    expires: 7
  })
}

export function removeToken () {
  // return Cookies.remove(TokenKey)
  return Cookies.set(TokenKey, '', {
    domain
  })
}

export function reLogin (href = window.location.href) {

}
