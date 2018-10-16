import React from 'react'

export default ({auction}) => {

    return ( 
        <div class='ui card' width="%100">
            <img src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/God_of_War_4_cover.jpg/220px-God_of_War_4_cover.jpg'
            alt='subasta' class='ui image' width="100" height="100"/>
            <div class='content'>
                <div class='header'>{auction.title}</div>
                <div class='meta'>$ {auction.price}</div>
                <div class='description'>
                    {auction.description}
                </div>
            </div>
            <div class='extra content'>
                <a>
                <i aria-hidden='true' class='user icon' />
                    {auction.emailAuthor}
                </a>
            </div>
        </div>
    )
}
