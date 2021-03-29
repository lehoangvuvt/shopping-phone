import React from 'react';
import './style/style.css';
import Menu from '../../components/Menu/Menu.js';
import Footer from '../../components/Footer/Footer.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../action/index';
import * as currencies from '../../utils/currencyFormat';


class PhoneListByM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            endIndex: 12,
        }
    }
    componentDidMount() {
        const mName = this.props.location.pathname.split('/')[2];
        this.props.getPhoneListByM(mName);
    }
    nextPage = () => {
        this.setState({
            startIndex: this.state.startIndex + 12,
            endIndex: this.state.endIndex + 12,
        });

    }
    prevPage = () => {
        this.setState({
            startIndex: this.state.startIndex - 12,
            endIndex: this.state.endIndex - 12,
        });

    }
    render() {
        return (
            <>
                <div className="phone-list-by-m-container">
                    <Menu />
                    <div className="dir-des">
                        <i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;Điện thoại&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;Nhà sản xuất&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;{this.props.location.pathname.split('/')[2]}
                    </div>
                    <div className="phone-list-by-m-holder">
                        {this.props.phoneListByM.length > 0 ?
                            this.props.phoneListByM.slice(this.state.startIndex, this.state.endIndex).map(phone =>
                                <div onClick={() => {
                                    this.props.history.push(`/phone/${phone.productID}`)
                                }}>
                                    <div>
                                        <img src={phone.imageURL} />
                                    </div>
                                    <div>{phone.phoneName}</div>
                                    <div>{currencies.vietnamCurrency(phone.price)}</div>
                                </div>
                            )
                            :
                            <>
                                <h2 className="not-found-txt">Xin lỗi. Cửa hàng chúng tôi hiện thời không có sản phẩm thuộc nhà sản xuất {this.props.location.pathname.split('/')[2]}</h2>
                            </>
                        }
                    </div>
                    {this.props.phoneListByM.length > 0 ?
                        <div className="button-page-phone-list-by-m">
                            <button
                                disabled={this.state.startIndex === 0 ? true : false}
                                className={this.state.startIndex === 0 ? "disabled-btn" : null}
                                onClick={() => { this.prevPage(); }}
                            >trang trước</button>
                            <button
                                disabled={this.state.startIndex + 12 >= this.props.phoneListByM.length ? true : false}
                                className={this.state.startIndex + 12 >= this.props.phoneListByM.length ? "disabled-btn" : null}
                                onClick={() => { this.nextPage(); }}
                            >trang sau</button>
                        </div>
                        : null
                    }
                </div>
                <Footer />
            </>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        getPhoneListByM: (name) => { dispatch(actions.getPhoneListByMName(name)) },
        dispatch,
    }
}
function mapStateToProps(state) {
    return {
        phoneListByM: state.phoneListByM,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneListByM));