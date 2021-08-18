import React, { Component } from 'react';
import { Homepage } from './pages/homepage/hompage.component';
import { Switch,Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInandSignUpPage from './pages/sign-in and sign-up/sign-in-and-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
            this.setState({
              currentUser:{
                id: snapShot.id,
                ...snapShot.data()
              }
            });

           
        });
        
      }
      this.setState({currentUser : userAuth});
    })
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }
 render(){
  return (
    <div className="App">
    <Header currentUser={this.state.currentUser}/>
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/shop' component={ShopPage} />
      <Route path='/signin' component={SignInandSignUpPage}/>
    </Switch>
      
    </div>
  );
 }
}

export default App;
