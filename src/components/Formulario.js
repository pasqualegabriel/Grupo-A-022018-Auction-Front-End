import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css'
import { Form, Button } from 'semantic-ui-react';
import { NotificationContainer } from 'react-notifications'

const styles = {
    box: {
            margin          : 'auto',
            marginBottom    : 'center',
            backgroundColor : 'white',
            textAlign       : 'center',
            border          : '1px solid #e6e6e6',
            padding         : '5em', 
            width           : '50%',
         }
}

export default class Formularies extends Component {
    
    render(){
        return (
            <div>
            <div style={styles.box}>
                {this.prop.formularies.map( aFormulary =>
                        <Form.Field>
                            <Form.Input name="mail" 
                                        onChange={this.handleChange}
                                        fluid
                                        placeholder='Email' 
                                        icon={this.verifyMail} 
                                        />
                        </Form.Field>
                       
                    )}
                <Button
                        type='submit'
                        primary
                        fluid
                        >
                        Registrarte
                </Button>
                
                <NotificationContainer/>
            </div>
        </div>
        )
          
      }

}