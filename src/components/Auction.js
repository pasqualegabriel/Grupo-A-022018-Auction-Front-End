import React from 'react'
import { Link } from 'react-router-dom';
import {setItem} from '../services/LocalStorageService'
import { Image, List, Card } from 'semantic-ui-react'

const blue = {
    color:'#140e63',
    fontSize: '21px'
}

const st = {
    textAlign       : 'center',
    border          : '1px solid #e6e6e6',
    backgroundColor : '#e6e6e6',
    width: '206px'
}

const st2 = {
    height: '190px'
}

export default ({auction}) => {

    return (

      <List.Item>
        <Card style={st}>
            <Image 
                src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg' 
                style={st2}
            />
            <Card.Content>
            <Card.Header>{auction.title}</Card.Header>
            <Card.Meta>{auction.emailAuthor}</Card.Meta>
            <Card.Description>{auction.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link style={blue} to={'/auction'} onClick={()=>setItem('auction', auction)}>
                Details
                </Link> 
            </Card.Content>
        </Card>
      </List.Item>
    )
}




