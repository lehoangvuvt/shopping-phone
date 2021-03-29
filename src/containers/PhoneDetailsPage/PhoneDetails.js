import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import BeautyStars from 'beauty-stars';
import * as currencies from '../../utils/currencyFormat';
import './style/style.css';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import Rating from '@material-ui/lab/Rating';


class PhoneDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTickAll: false,
            star: 1,
            rateMode: false,
        }
    }
    componentDidMount() {
        const phoneID = this.props.location.pathname.split('/')[2];
        this.props.getPhoneDetails(phoneID);
        this.props.getPhoneRating(phoneID);
    }
    addToCart = (phoneDetails) => {
        this.props.addToCart(phoneDetails);
    }
    getCurrentDateString = () => {
        let dateString = "";
        const date = new Date();
        let month = 0;
        let day = 0;
        if ((date.getMonth() + 1) < 10) {
            month = "0" + (date.getMonth() + 1);
        } else {
            month = date.getMonth + 1;
        }
        if (date.getDate() < 10) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }
        return dateString = day + '/' + month + '/' + date.getFullYear();
    }
    ratePhone = () => {
        if (!this.props.userData) {
            alert('Vui lòng đăng nhập để được đánh giá sản phẩm');
        } else {
            this.setState({ rateMode: true });
        }
    }
    sendRate = () => {
        const username = this.props.userData.username;
        const date = this.getCurrentDateString();
        const phoneID = this.props.location.pathname.split('/')[2];
        const rating = this.state.star;
        this.props.sendPhoneRate({ productId: phoneID, username: username, ratingPoint: rating });
        setTimeout(() => {
            this.props.history.push('/');
        }, 10);
        setTimeout(() => {
            this.props.history.push(`/phone/${this.props.location.pathname.split('/')[2]}`);
        }, 11);
    }
    render() {
        return (
            <>
                <div className="phone-big-container">
                    <Menu />
                    {this.props.phoneDetails !== null ?
                        <div className="phone-container">
                            <div>
                                <img src={this.props.phoneDetails.imageURL}></img>
                            </div>
                            <div>
                                <div>
                                    {this.props.phoneDetails.phoneName}
                                </div>
                                <div>
                                    <div>
                                        <Rating
                                            size={'large'}
                                            name="half-rating-read" value={this.props.phoneDetails.ratingPoint.toFixed(1)} precision={0.1} readOnly />
                                    </div>
                                    <div>
                                        {this.props.phoneDetails.ratingPoint !== 0 ? this.props.phoneDetails.ratingPoint.toFixed(1) : 0}/5
                                    </div>
                                </div>
                                <div>
                                    <span style={{ 'color': 'black' }}>Năm sản xuất:&nbsp;&nbsp;{this.props.phoneDetails.year}</span>
                                </div>
                                <div>
                                    <span style={{ 'color': 'black' }}>Thương hiệu:</span> &nbsp;&nbsp;{this.props.phoneDetails.manufactor}
                                </div>
                                <div>
                                    {this.props.phoneDetails.description}
                                </div>
                                <div>
                                    {currencies.vietnamCurrency(this.props.phoneDetails.price)}
                                </div>
                                <div>
                                    <div onClick={() => {
                                        this.addToCart(this.props.phoneDetails)
                                    }}>
                                        Thêm vào giỏ hàng
                                    </div>
                                    <div>
                                        <button onClick={() => { this.ratePhone() }}>
                                            Đánh giá sản phẩm
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        :
                        null
                    }
                    {this.state.rateMode ?
                        <div id='rate-pop-up'>
                            <div>
                                <i
                                    onClick={() => { this.setState({ rateMode: false }) }}
                                    class="fas fa-times"></i>
                            </div>
                            <div>
                                <Rating
                                    name="simple-controlled"
                                    value={this.state.star}
                                    precision={1}
                                    onChange={(event, newValue) => {
                                        if (newValue === null) {
                                            this.setState({ star: 0 });
                                        } else {
                                            this.setState({ star: newValue });
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                {this.state.star}/5
                            </div>
                            <div>
                                <button
                                    onClick={() => { this.sendRate() }}
                                >Gửi đánh giá</button>
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <Footer />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        phoneDetails: state.phoneDetails,
        totalRate: state.totalRate,
        rateTime: state.rateTime,
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPhoneDetails: (phoneID) => { dispatch(actions.getPhoneDetails(phoneID)) },
        addToCart: (payload) => { dispatch(actions.addToCart(payload)) },
        getPhoneRating: (phoneID) => { dispatch(actions.getPhoneRating(phoneID)) },
        sendPhoneRate: (payload) => { dispatch(actions.sendPhoneRate(payload)) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetails);