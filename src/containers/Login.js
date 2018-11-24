import React from 'react'

export default ({ auth, getTranslation }) => {

    return ( 
        <button onClick={() => auth.login()}>
          Log In            
        </button>
    )
}

/*
https://react.semantic-ui.com/collections/form/#states-error
*/
