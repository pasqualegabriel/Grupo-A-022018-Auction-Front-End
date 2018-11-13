import auth0 from 'auth0-js'

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: 'f-na-a.auth0.com',
        clientID: 'lfabrL7McTLJdqLUF7MI61Efx7gZ37rH',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor() {
        this.login = this.login.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

}
