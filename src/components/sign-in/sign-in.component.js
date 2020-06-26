import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {signInWithGoogle} from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state={
            email:'',
            password:''
        }
    }

    handleSumbit = event => {
        event.preventDefault();

        this.setState({email:'', password:''})
    }

    handleChange = event =>{
        const {value, name} = event.target;
         this.setState({ [name]: value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2> I have an account already</h2>
                <span>Sign in with your email and password</span>
                
                <form onSubmit={this.handleSumbit}>
                    <FormInput name='email' 
                        type='email'
                        value={this.state.email}
                        handleChange= {this.handleChange}
                        label='email'
                        required/>
                    
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={this.state.password} 
                        handleChange= {this.handleChange}
                        label='password'
                        required/>
                    
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;