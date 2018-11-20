import axios from 'axios'

let _auctionService = null

const port = 'http://localhost:8080/'

// const port = 'http://34bc4f57.ngrok.io/'

class AuctionService {

    constructor () {
        if(!_auctionService) {
            _auctionService = this
        }
        else
            return _auctionService
    }

    getAuctions = (page, limit) => axios.get(`${port}auctions/${page}/${limit}`)

    getAuctionsTitle = (title, page, limit) => axios.get(`${port}auction/for/${title}/${page}/${limit}`)

    getRecentAuctions = (page, limit) => axios.get(`${port}auctions/recentAuctions/${page}/${limit}`)

    getAuctionsToFinish = (page, limit) => axios.get(`${port}auction/toFinish/${page}/${limit}`)

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