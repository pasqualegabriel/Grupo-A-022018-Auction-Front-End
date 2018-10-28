import React from 'react'
import { Link } from 'react-router-dom';
import {setItem} from '../services/LocalStorageService'
import { Image, Card } from 'semantic-ui-react'

const blue = {
    color:'#140e63',
    fontSize: '21px'
}

const st = {
    // textAlign       : 'center',
    // border          : '1px solid #e6e6e6',
    backgroundColor : '#e6e6e6',
    width: '158px',
    // padding: '2 50px',
    margin: '10px'
}

const st2 = {
    height: '122px'
}

const st3 = {
    width: '12px'
    // height: '122px'
}

export default ({auction}) => {

    return (

    //   <List.Item>
        <Card style={st}>
            <Image 
                src='https://www.crystalcommerce.com/wp-content/uploads/2018/09/square_gow4-notxt.jpg' 
                style={st2}
            />
            <Card.Content>
            <Card.Header>{auction.title}</Card.Header>
            <Card.Meta>$ {auction.price}</Card.Meta>
            <Card.Description style={st3}>{auction.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link style={blue} to={'/detail'} onClick={()=>setItem('auction', auction)}>
                Details
                </Link> 
            </Card.Content>
        </Card>
    //   </List.Item>
    )
}




