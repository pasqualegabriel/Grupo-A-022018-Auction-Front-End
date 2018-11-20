import axios from 'axios'

let _auctionService = null

const auth = {
    client_id:"jsIbb85qC7j39hGLNleDWtye6v57tZLN",
    client_secret:"HXRAbP-iuFX0QzDoc1mxFJZx-1FL3SrZjRP7T2CoV2Jof_WIVbflYuW5bSIO2t91",
    audience:"http://localhost:8080/testApiAuction",
    grant_type:"client_credentials"
    }

// const config = {
//     headers: {'Authorization': "bearer " + localStorage.getItem('access_token')}
// };

/**
  --header 'content-type: application/json' \
  --data '{"client_id":"Nl60ys3tk2j9u5Rp45MzoH5Lb7CIgoUE",
  "client_secret":"TW68CqOu7VZvKmeXByuWmJYOXCxrhYztxh3abnNS64SpQzkl7NfBZDicYmuhdi2i",
  "audience":"http://localhost:8080/testA",
  "grant_type":"client_credentials"}'
 */

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
}

const bodyParameters = {
    index: 0,
    size: 10
}

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

    postToken = () => axios.post(`https://f-na-a.auth0.com/oauth/token`,auth, config) 

    getAuctions = (page, limit, a) => axios.post(`${port}auctions`, bodyParameters, a)

    getAuctionsTitle = (title, page, limit) => axios.get(`${port}auction/for`, bodyParameters, config)

    getRecentAuctions = (page, limit) => axios.get(`${port}auctions/recentAuctions`, bodyParameters, config)

    getAuctionsToFinish = (page, limit) => axios.get(`${port}auction/toFinish`, bodyParameters, config)

    getAuctionsTitleDescription = (title, description, page, limit) => axios.get(`${port}auction/${title}/${description}/${page}/${limit}`)

    auction = (anAuction) => axios.post(`${port}auction`, anAuction)

    getAuction = id => axios.get(`${port}auction/recover/${id}`)

    offer = (auctionId, bidder) => axios.post(`${port}auction/${auctionId}/offer/${bidder}`, {})

    firstOffer = (auctionId, bidder, maxAmount) => 
        axios.post(`${port}auction/first/offer/${auctionId}/${maxAmount}/${bidder}`, {})
}
    
export default AuctionService

/*

    @LogExecutionTime
    @GetMapping("/auctions/{index}/{size}")
    public Page<Auction> all(@PathVariable int index, @PathVariable int size){
        return auctionService.recoverAll(index,size);
    }

    @LogExecutionTime
    @GetMapping("/auction/recover/{id}")
    public Auction recover(@PathVariable("id") long id ){
        return auctionService.recoverById(id);
    }

    @LogExecutionTime
    @GetMapping("/auction/{emailAuthor}")
    public Auction recover(@PathVariable("emailAuthor") String emailAuthor ){
        return auctionService.recover(emailAuthor);
    }

    @LogExecutionTime
    @GetMapping("/auctions/recentAuctions/{index}/{size}")
    public  Page<Auction> recentAuctions(@PathVariable int index, @PathVariable int size){
        return auctionService.recoverAllOrderByPublicationDate(index,size);
    }

    @LogExecutionTime
    @GetMapping("/auction/{title}/{description}/{index}/{size}")
    public Page<Auction> allBy(@PathVariable("title") String title, @PathVariable String description,
                               @PathVariable int index, @PathVariable int size){
        return auctionService.recoverAllByTitleLikeAndDescriptionLike(title,description,index,size);
    }

    @LogExecutionTime
    @GetMapping("/auction/for/{title}/{index}/{size}")
    public Page<Auction> allBy(@PathVariable("title") String title, @PathVariable int index, @PathVariable int size){
        return auctionService.recoverAllByTitleLike(title,index,size);
    }

    @LogExecutionTime
    @GetMapping("/auction/toFinish/{index}/{size}")
    public Page<Auction> toFinish(@PathVariable int index, @PathVariable int size){
        return auctionService.recoverAuctionsToFinish(index,size);
    }

    @LogExecutionTime
    @GetMapping("/auction/toFinishBetween/{index}/{size}")
    public Page<Auction> toFinishBetween(@PathVariable int index, @PathVariable int size){
        return auctionService.recoverAuctionsToFinishBetween(LocalDateTime.now(),LocalDateTime.now().plusDays(1),index,size);
    }


    @LogExecutionTime
    @PutMapping("/auction")
    public Auction add(@RequestBody @Valid Auction anAuction){
        return auctionService.create(anAuction);
    }

    @LogExecutionTime
    @PostMapping("/auction")
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


    @LogExecutionTime
    @DeleteMapping("/auction/delete/{id}")
    public void delete(@PathVariable long id){
        auctionService.delete(id);
    }



}

*/