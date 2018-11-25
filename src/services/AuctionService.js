import axios from 'axios'

let _auctionService = null

const auth = {
    client_id:"jsIbb85qC7j39hGLNleDWtye6v57tZLN",
    client_secret:"HXRAbP-iuFX0QzDoc1mxFJZx-1FL3SrZjRP7T2CoV2Jof_WIVbflYuW5bSIO2t91",
    audience:"http://localhost:8080/testApiAuction",
    grant_type:"client_credentials"
}

const config = {
    headers: {
        'Authorization': "bearer " + localStorage.getItem('key'),
        'Content-Type': 'application/json',
    }
};

const configAuth = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const port = 'http://localhost:8080/'

// const port = 'http://b4b99871.ngrok.io/'

class AuctionService {

    constructor () {
        if(!_auctionService) {
            _auctionService = this
        }
        else {
            return _auctionService
        }
    }

    postToken = () => {
        axios.post(`https://f-na-a.auth0.com/oauth/token`,auth, configAuth)
        .then(t => {
            localStorage.setItem('key', t.data.access_token)
            console.log('set token')
        }).catch(err => console.log("token fail"))
    } 

    getAuctions = (index, size) => axios.post(`${port}auctions`, {
        index, 
        size
    }, config)

    getRecentAuctions = (index, size) => axios.post(`${port}auctions/recentAuctions`, {
        index, 
        size
    }, config)

    getAuctionsToFinish = (index, size) => axios.post(`${port}auction/toFinish`, {
        index, 
        size
    }, config)

    getAuctionsTitleDescription = (title, description, index, size) => axios.post(`${port}auction/title_and_description` , {
        title, 
        description, 
        index,
        size
    }, config)

    auction = anAuction => axios.put(`${port}new/auction`, anAuction, config)

    getAuction = id => axios.get(`${port}auction/recover/${id}`, config)

    offer = (auctionId, bidder) => axios.post(`${port}auction/${auctionId}/offer/${bidder}`, {}, config)

    firstOffer = (auctionId, bidder, maxAmount) => 
        axios.post(`${port}auction/first/offer/${auctionId}/${maxAmount}/${bidder}`, {}, config)
}
    
export default AuctionService

/*
    @GetMapping("/auction/recover/{id}")
    @GetMapping("/auction/{emailAuthor}")
    
    @PutMapping("/new/auction")
    @PostMapping("/auctions")
    @PostMapping("/auctions/recentAuctions")
    @PostMapping("/auction/title_and_description")
    @PostMapping("/auction/title")
    @PostMapping("/auction/toFinish")
    @PostMapping("/auction/toFinishBetween")
    @PostMapping("/auction/update")
    @PostMapping("/auction/{auctionId}/offer/{bidder}")
    @PostMapping("/auction/first/offer/{auctionId}/{maxAmount}/{bidder}")

    @DeleteMapping("/auction/delete/{id}")

*/