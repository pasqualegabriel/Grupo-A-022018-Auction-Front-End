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

    getAuctions = () => axios.get('http://localhost:8080/auctions')

    auction = (anAuction) => axios.post('http://localhost:8080/auction', anAuction)

    // getAuctions = id => axios.get('http://localhost:8080/auctionById/' + id)
    
}
    
export default AuctionService