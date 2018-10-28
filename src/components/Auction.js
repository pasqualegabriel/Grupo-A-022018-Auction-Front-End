import React from 'react'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {setItem} from '../services/LocalStorageService'

const style1={
    height: '100%',
    width: '100%',
    display: 'block'
}
const divStyle={
    height: '50%',
    width: '50%',
    
}
const divStyle2={
    height: '70%',
    width: '70%',
    
}

const blue = {
    color:'#140e63',
    fontSize: '21px'
}

const green = {
    color:'#0f5611'
}

const white = {
    color:'#010007'
}

export default ({auction}) => {

    return (


            <div class="col-md-4" style={divStyle}>
                <div class="card mb-4 shadow-sm" style={divStyle2}>
                    <img class="card-img-top" style={style1} src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg'  data-holder-rendered="true"/>
                <div class="card-body">
                    <p class="card-text">{auction.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                    </div>
                </div>
                </div>
            </div>

    //  <Item style={style1} >
    //   <Item.Image size='tiny' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg' />

    //   <Item.Content>
    //     <Link style={blue} to={'/auction'} onClick={()=>setItem('auction', auction)}>
    //       {auction.title}
    //     </Link> 
    //     <Item.Meta style={green}>$ {auction.price}</Item.Meta>
    //     <Item.Description style={white}>
    //       {auction.description}
    //     </Item.Description>
    //     <Item.Extra style={green}>{auction.emailAuthor}</Item.Extra>
    //   </Item.Content>
    // </Item>
    )
}




