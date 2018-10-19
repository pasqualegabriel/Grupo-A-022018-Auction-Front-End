import React from 'react'
import { Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {setItem} from '../services/LocalStorageService'

const style1 = { 
    border          :'1px solid #2d2e2f',
    backgroundColor :'rgb(27, 28, 29)',
    marginLeft      :'45px',
    padding         :'3px',
    margin          :'22px',
    align           :'center'
}

const blue = {
    color:'#adf2f4'
}

const green = {
    color:'#d5fcb5'
}

const white = {
    color:'#ffffff'
}

export default ({auction}) => {

    return ( 
     <Item style={style1} >
      <Item.Image size='tiny' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg' />

      <Item.Content>
        <Link style={blue} to={'/auction'} onClick={()=>setItem('auction', auction)}>
          {auction.title}
        </Link> 
        <Item.Meta style={green}>$ {auction.price}</Item.Meta>
        <Item.Description style={white}>
          {auction.description}
        </Item.Description>
        <Item.Extra style={green}>{auction.emailAuthor}</Item.Extra>
      </Item.Content>
    </Item>
    )
}
