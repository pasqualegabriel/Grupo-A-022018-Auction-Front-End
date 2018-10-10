let _sessionService = null

class SessionService {

  constructor () {
      if(!_sessionService) {
        _sessionService = this
      }
      else
        return _sessionService
  }

  isTokenExpired(token) {
    try {
        const dateNow = new Date()
        return token.exp < dateNow.getTime()
    }
    catch (err) {
        return false
    }
  }

  verifyRedirectToReferrer = () => {
    const aToken = JSON.parse(localStorage.getItem('token'))
    return !aToken || this.isTokenExpired(aToken)
  }
    
  removeToken = () => localStorage.removeItem('token')

  setToken = (aToken) => localStorage.setItem('token', JSON.stringify(aToken))
  
  getAuth = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const auth = 'Bearer-' + token.access_token
    const header = { headers: {"Authorization" : auth} }
    return header
  }

  getUserNameOfToken = () => {
    const aToken = JSON.parse(localStorage.getItem('token'))
    return aToken.username
  }

  getUser = () => {
    const aToken = JSON.parse(localStorage.getItem('token'))
    return aToken
  }

}

export default SessionService