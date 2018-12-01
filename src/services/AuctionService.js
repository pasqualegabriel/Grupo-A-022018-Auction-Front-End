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

    getPopularAuctions = (index, size) => axios.post(`${port}auctions/popular`, {
        index, 
        size
    }, config)

    getAuctionsToFinish = (index, size) => axios.post(`${port}auction/toFinish`, {
        index, 
        size
    }, config)

    getAuctionsTitleDescriptionEmail = (title, description, userName, index, size) => axios.post(`${port}auctions/title_and_description_and_user_name` , {
        title, 
        description, 
        userName,
        index,
        size
    }, config)

    auction = anAuction => axios.put(`${port}new/auction`, anAuction, config)

    update = anAuction => axios.post(`${port}auction/update`, anAuction, config)

    getAuction = id => axios.get(`${port}auction/recover/${id}`, config)

    offer = (auctionId, bidder) => axios.post(`${port}auction/${auctionId}/offer/${bidder}`, {}, config)

    getAuctionsUsers = (usersName, index, size) => axios.post(`${port}auctions/users/participate`, {
        usersName,
        index, 
        size
    }, config)

    firstOffer = (auctionId, bidder, maxAmount) => 
        axios.post(`${port}auction/first/offer/${auctionId}/${maxAmount}/${bidder}`, {}, config)
}
    
export default AuctionService

/*
@GetMapping("/auction/popular")
    public Auction recover(){return auctionService.popularAuction();}



    @GetMapping("/auction/recover/{id}")
    public Auction recover(@PathVariable("id") long id ){
        return auctionService.recoverById(id);
    }
    @GetMapping("/auction/{emailAuthor}")
    public Auction recover(@PathVariable("emailAuthor") String emailAuthor ){
        return auctionService.recover(emailAuthor);
    }


    @PutMapping("/new/auction")
    public Auction add(@RequestBody @Valid Auction anAuction){
        return auctionService.create(anAuction);
    }

    @PostMapping("/auctions")
    public Page<Auction> all(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAll(aPage);
    }



    @PostMapping("/auctions/title_and_description_and_user_name")
    public  Page<Auction> allByTitleAndDescriptionAndUserName(@RequestBody @Valid RequestPage aPage){
        return auctionService.findAllByTitleLikeAndDescriptionLikeAndEmailAuthorLike(aPage);
    }

    @PostMapping("/auctions/recentAuctions")
    public  Page<Auction> recentAuctions(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllOrderByPublicationDate(aPage);
    }


    @PostMapping("/auction/title_and_description")
    public Page<Auction> allByTitleAndDescription(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllByTitleLikeAndDescriptionLike(aPage);
    }


    @PostMapping("/auction/title")
    public Page<Auction> allByTitle(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAllByTitleLike(aPage);
    }


    @PostMapping("/auction/toFinish")
    public Page<Auction> allToFinish(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAuctionsToFinish(aPage);
    }


    @PostMapping("/auction/toFinishBetween")
    public Page<Auction> allToFinishBetween(@RequestBody @Valid RequestPage aPage){
        return auctionService.recoverAuctionsToFinishBetween(aPage);
    }

    @PostMapping("/auction/update")
    public Auction update(@RequestBody @Valid Auction anAuction){
        return auctionService.update(anAuction);
    }


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



    @DeleteMapping("/auction/delete/{id}")
    public void delete(@PathVariable long id){
        auctionService.delete(id);
    }


*/