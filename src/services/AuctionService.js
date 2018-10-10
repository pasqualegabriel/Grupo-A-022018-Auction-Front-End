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

}
    
export default AuctionService