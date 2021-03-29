import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './HomePage/Homepage';
import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import CartPage from './CartPage/CartPage';
import Checkout from './CheckoutPage/Checkout';
import About from './AboutPage/About';
import Profile from './ProfilePage/Profile';
import PhoneDetails from './PhoneDetailsPage/PhoneDetails';
import PhoneListByM from './PhoneListByMPage/PhoneListByM';
import AdminPortal from './AdminPortalPage/AdminPortal';
import PhoneListByName from './PhoneListByNamePage/PhoneListByName';
import { connect } from 'react-redux';
import * as actions from '../action/index';
import '../css/all.css';
import 'antd/dist/antd.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (localStorage.getItem('username') !== null) {
            this.props.login(localStorage.getItem('username'), localStorage.getItem('password'));
        }
        setTimeout(() => {
            this.props.getAllPhoneList();
        }, 500);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Homepage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={SignUpPage} />
                    <Route path='/cart' component={CartPage} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/about' component={About} />
                    <Route path='/manufacturer/:name' component={PhoneListByM} />
                    <Route path='/phonenamelike=:name' component={PhoneListByName} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/admin' component={AdminPortal} />
                    <Route path='/phone/:id' component={PhoneDetails} />
                </Switch>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => { dispatch(actions.login(username, password)) },
        getAllPhoneList: () => { dispatch(actions.getAllPhoneList()) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);