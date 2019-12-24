import React from "react";
import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component';
import { auth,signInWithGoogle} from './../../firebase/firebase.utils';

import CustomButton from "../custom-button /custom-button.component";


class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  handelSubmit = async event => {
    event.preventDefault();
    const { email, password}=this.state;

    try{
      await auth.signInWithEmailAndPassword(email, password);
       this.setState({ email: "", password: "" });
    }catch(error){
console.log(error);
    }

    
  };
  handelChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });

  };

  render() {
    return (
      <div className="sign-in">
        <h1> I already have an account</h1>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handelSubmit}>
          <FormInput
            name="email"
            type="email"
            autoComplete="username"
            value={this.state.email}
            handelChange={this.handelChange}
            label="email"
            required
          />
          
          <FormInput
            name="password"
            type="password"
            autoComplete="current-password"
            value={this.state.password}
            handelChange={this.handelChange}
            label="password"
            required
          />
          <div className="buttons">

          <CustomButton type="submit"  > Sign In </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn > Sign In With Google </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
export default SignIn;
