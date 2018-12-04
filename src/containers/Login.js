import React from 'react'
import './LoginCss.css'

const titleS = {
    textAlign: 'center'
}

export default ({ auth, getTranslation, changeLanguage }) => {

    const ingles = () => {
        changeLanguage('en')
    }
    
    const latino = () => {
        changeLanguage('es')
    }

    return ( 
        <div>
            <div style={{textAlign:'right'}}>
                <button type="submit" style={{display: 'inline-block'}} onClick={ingles}>{getTranslation('idiom-en')}</button>
                <button type="submit" style={{display: 'inline-block'}} onClick={latino}>{getTranslation('idiom-es')}</button>
            </div>
        <div style={titleS}>

            <h6>Pasquale Gabriel - Autalan Fernando Nahuel</h6>
            <h1>Subasteando A Cara De Perro</h1>
            <h3>{getTranslation('let')}</h3>
            <img src="https://dslv9ilpbe7p1.cloudfront.net/Z6vfSk5ZX0y22ZcB3V3XRQ_store_header_image" alt="Snow" 
                            onClick={() => auth.login()}/>
        </div>
        </div>
    )
}

/*
https://react.semantic-ui.com/collections/form/#states-error
*/
