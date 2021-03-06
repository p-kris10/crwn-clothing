import React, { Component } from 'react';
import { Homepage } from './pages/homepage/hompage.component';
import { Switch,Route,Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInandSignUpPage from './pages/sign-in and sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import { connect } from 'react-redux';
import './App.css';
import {setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser  } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
            setCurrentUser({
              currentUser:{
                id: snapShot.id,
                ...snapShot.data()
              }
            });

           
        });
        
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }
 render(){
  return (
    <div className="App">
    <Header/>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/checkout' component={CheckoutPage} />
      <Route exact path='/signin' render={()=>
       this.props.currentUser ? (<Redirect to='/'/>)
      : (<SignInandSignUpPage />)
      }
      />
    </Switch>
      
    </div>
  );
 }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
