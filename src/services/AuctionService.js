import axios from 'axios'

let _auctionService = null

class AuctionService {

    constructor () {
        if(!_auctionService) {
            _auctionService = this
        }
        else
            return _auctionService
    }

    getAuctions = () => axios.get('http://localhost:8080/auctions/0/15')

    auction = (anAuction) => axios.post('http://localhost:8080/auction', anAuction)

    // getAuctions = id => axios.get('http://localhost:8080/auctionById/' + id)

    offer = (auctionId, bidder) => axios.post(`http://localhost:8080/auction/${auctionId}/offer/${bidder}`, {})

    firstOffer = (auctionId, bidder, maxAmount) => 
        axios.post(`/auction/first/offer/${auctionId}/${maxAmount}/${bidder}`, {})
}
    
export default AuctionService