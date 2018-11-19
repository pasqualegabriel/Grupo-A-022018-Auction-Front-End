import React from 'react'
import { Link } from 'react-router-dom';
import {setItem} from '../services/LocalStorageService'
import { Image, Card, List } from 'semantic-ui-react'

const blue = {
    color:'#140e63',
    fontSize: '21px'
}

const st = {
    textAlign       : 'center',
    // border          : '1px solid #e6e6e6',
    backgroundColor : '#f7f7f7',
    width: '158px',
    // padding: '2 50px',
    margin: '10px',
    height: 'available'
}

const st2 = {
    height: '122px'
}

const stitle = {color:'black'}

export default ({auction}) => {

    return (

      <List.Item>
        <Card style={st}>
            <Image 
                src={auction.photos}
                style={st2}
            />
            <Card.Content>
            <Card.Header style={stitle}>{auction.title}</Card.Header>
            <Card.Meta style={stitle}>$ {auction.price}</Card.Meta>
            <Card.Description>{auction.emailAuthor}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link style={blue} to={'/detail'} onClick={()=>setItem('auction', auction)}>
                Details
                </Link> 
            </Card.Content>
        </Card>
       </List.Item>
    )
}




