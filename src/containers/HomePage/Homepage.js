import React from 'react';
import './style/style.css';
import PhoneManufacturer from './PhoneManufacturer.js';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import Menu from '../../components/Menu/Menu.js';
import Slideshow from '../../components/Slideshow/Slideshow.js';
import Footer from '../../components/Footer/Footer.js';



class Homepage extends React.Component {
    componentDidMount() {
        if (this.props.userData) {
            localStorage.setItem('roleId', this.props.userData.roleId);
        }
    }
    render() {      
        return (
            <>
                <div className="home-container">
                    <Menu />
                    <PhoneManufacturer />
                </div>
                <Footer />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPhoneList: () => { dispatch(actions.getAllPhoneList()) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);