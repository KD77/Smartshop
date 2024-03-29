import React from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPages from "./pages/shop/shop.component.jsx";
import CheckoutPage from './pages/checkout/checkout.component';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';


class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser}=this.props;
    // fetching data from the database
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef= await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
         setCurrentUser({
            
              id: snapShot.id,
              ...snapShot.data()
         
        
          });

         
        });
        
      }
      else {
       
       setCurrentUser(userAuth);

      }
     
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPages} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/signin" render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (
            <SignInAndSignUpPage/>
          )
        } />
        
        </Switch>
      </div>
    );
  }
}

const mapStateToProps =createStructuredSelector({
  currentUser: selectCurrentUser
});


const mapDispatchToprops= dispatch=>({
  setCurrentUser: user=> dispatch(setCurrentUser(user))

})

export default connect(mapStateToProps, mapDispatchToprops) (App);
