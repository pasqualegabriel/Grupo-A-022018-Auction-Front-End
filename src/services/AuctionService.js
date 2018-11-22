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

/**
  --header 'content-type: application/json' \
  --data '{"client_id":"Nl60ys3tk2j9u5Rp45MzoH5Lb7CIgoUE",
  "client_secret":"TW68CqOu7VZvKmeXByuWmJYOXCxrhYztxh3abnNS64SpQzkl7NfBZDicYmuhdi2i",
  "audience":"http://localhost:8080/testA",
  "grant_type":"client_credentials"}'
 */

const configAuth = {
    headers: {
        'Content-Type': 'application/json',
    }
}

// const bodyParameters = {
//     index: 0,
//     size: 10
// }

const port = 'http://localhost:8080/'

// const port = 'http://e8925c6d.ngrok.io/'

class AuctionService {

    constructor () {
        if(!_auctionService) {
            _auctionService = this
        }
        else {
            return _auctionService}
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

    getAuctionsTitleDescription = (title, description, index, size) => axios.get(`${port}auction/title_and_description` , {
        title, 
        description, 
        index,
        size
    }, config)

    auction = anAuction => axios.post(`${port}auction`, anAuction, config)

    getAuction = id => axios.get(`${port}auction/recover/${id}`)

    offer = (auctionId, bidder) => axios.post(`${port}auction/${auctionId}/offer/${bidder}`, {}, config)

    firstOffer = (auctionId, bidder, maxAmount) => 
        axios.post(`${port}auction/first/offer/${auctionId}/${maxAmount}/${bidder}`, {}, config)
}
    
export default AuctionService

/*
   
    @LogExecutionTime
    @PutMapping("/new/auction")
    public Auction add(@RequestBody @Valid Auction anAuction){
        return auctionService.create(anAuction);
    }
    @LogExecutionTime
    @PostMapping("/auctions")
    public Page<Auction> all(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAll(aPage);
    }


    @LogExecutionTime
    @PostMapping("/auctions/recentAuctions")
    public  Page<Auction> recentAuctions(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllOrderByPublicationDate(aPage);
    }

    @LogExecutionTime
    @PostMapping("/auction/title_and_description")
    public Page<Auction> allByTitleAndDescription(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllByTitleLikeAndDescriptionLike(aPage);
    }

    @LogExecutionTime
    @PostMapping("/auction/title")
    public Page<Auction> allByTitle(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllByTitleLike(aPage);
    }

    @LogExecutionTime
    @PostMapping("/auction/toFinish")
    public Page<Auction> allToFinish(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAuctionsToFinish(aPage);
    }

    @LogExecutionTime
    @PostMapping("/auction/toFinishBetween")
    public Page<Auction> allToFinishBetween(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAuctionsToFinishBetween(aPage);
    }


    @LogExecutionTime
    @PostMapping("/auction/update")
    public Auction update(@RequestBody @Valid Auction anAuction){
        return auctionService.update(anAuction);
    }

    @LogExecutionTime
    @PostMapping("/auction/{auctionId}/offer/{bidder}")
    public Auction offer(@PathVariable("auctionId") long auctionId, @PathVariable("bidder") String bidder){
        return auctionService.offer(auctionId, bidder);
    }

    @PostMapping("/auction/first/offer/{auctionId}/{maxAmount}/{bidder}")
    public Auction firstOffer(@PathVariable("auctionId") long auctionId,
                              @PathVariable("maxAmount") long maxAmount,
                              @PathVariable("bidder") String bidder){
        return auctionService.firstOffer(auctionId, maxAmount, bidder);
    }

*/