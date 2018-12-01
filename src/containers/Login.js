import React from 'react'
import './LoginCss.css'

export default ({ auth, getTranslation }) => {

    return ( 

        <div className="container">
            <img src="https://dslv9ilpbe7p1.cloudfront.net/Z6vfSk5ZX0y22ZcB3V3XRQ_store_header_image" alt="Snow" 
                    onClick={() => auth.login()}/>
            {/* <button className="btn" >
                {getTranslation('login')  }      
            </button> */}
        </div> 
    )
}

/*
https://react.semantic-ui.com/collections/form/#states-error
*/
