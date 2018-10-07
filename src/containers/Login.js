import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const styles = {
    loginStyle: {
        height: '100%',
        width: '500', 
        padding: '8em'
    }
}

export default ({verify, handleChange}) => {

    return ( 
          <div>
            <div className='login-form'>
            {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={styles.loginStyle} verticalAlign='middle' >
              <Grid.Column style={{ maxWidth: 500 }}>
                
                <Form size='large' >
                  <Segment stacked inverted>
                  <Header as='h2' color='teal' textAlign='center'>
                  {/* <Image src="../UNQ Black Logo.png" />  */}
                  Log-in to your account
                </Header>
                    <Form.Input name="name" onChange={handleChange} fluid icon='user' 
                                iconPosition='left' placeholder='Username' />
                    <Form.Input
                      fluid
                      name="password"
                      onChange={handleChange}
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />
        
                    <Button color='teal' fluid size='large' onClick={verify}>
                      Login
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    )
}
