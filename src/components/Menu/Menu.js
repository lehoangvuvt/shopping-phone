import React from 'react';
import './style/style.css';
import { withRouter } from 'react-router-dom';
import LoginPage from '../../containers/LoginPage/LoginPage';
import * as actions from '../../action/index';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchtxt: "",
            selectedName: "",
            isOnClick: false,
        };
    }
    redirectPage(link) {
        this.props.history.push(`${link}`);
    }
    openLoginPopup() {
        const popup = document.getElementById("login-popup");
        popup.style.display = "flex";
        popup.focus();
    }
    getTotalAmount = () => {
        let amount = 0;
        this.props.cart.forEach(i => {
            amount = amount + i.amount;
        });
        return amount;
    }
    componentDidMount() {
        this.props.getTop3SearchValues();
    }
    openMiniMenu = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    handleSearch = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    logOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('roleId');
        this.setState({ isOpen: false });
        this.props.logout();
        this.props.history.push('/');
    }
    searchByName = () => {
        if (this.state.searchtxt.trim() !== '' || this.state.searchtxt.trim() !== '') {
            setTimeout(() => {
                this.props.history.push('/');
            }, 50);
            setTimeout(() => {
                this.props.history.push(`/phonenamelike=${this.state.searchtxt}`);
            }, 100);
        } else {
            alert('Vui lòng nhập tên sản phầm cần tìm kiếm vào thanh tìm kiếm');
        }
        if (this.state.searchtxt === '*') {
            this.props.getAllPhoneList();
            setTimeout(() => {
                this.props.history.push('/');
            }, 50);
            setTimeout(() => {
                this.props.history.push(`/phonenamelike=${this.state.searchtxt}`);
            }, 100);
        }
    }
    render() {
        return (
            <>
                <div className="menu-container">
                    <div className="menu-container-sub-menu">
                        <div onClick={() => {
                            this.redirectPage("/");
                        }}>
                            Trang chủ
                        </div>
                        {!this.props.userData ?
                            <div onClick={() => {
                                this.props.resetLoginState();
                                this.redirectPage("/login");
                            }}>
                                Đăng nhập
                        </div>
                            :
                            <div style={{ 'filter': 'brightness(100%)', 'minWidth': '10%', 'color': this.state.isOpen ? 'red' : 'white', 'background': this.state.isOpen ? 'white' : 'rgba(0,0,0,0)' }} onClick={() => {
                                this.openMiniMenu();
                            }}>
                                TÀI KHOẢN {this.props.userData.username}&nbsp; {this.state.isOpen ? <i class="fas fa-sort-up"></i> : <i class="fas fa-sort-down"></i>}
                            </div>
                        }
                        {this.state.isOpen ?
                            this.props.userData.roleId === 2 ?
                                <div className="mini-menu">
                                    <div
                                        onClick={() => { this.props.history.push('/profile'); }}
                                    ><i style={{ 'fontSize': '1vw' }} class="fas fa-user-circle"></i>&nbsp;&nbsp;&nbsp;Quản lý tài khoản</div>
                                    <div
                                        onClick={() => { this.logOut(); }}
                                    ><i style={{ 'fontSize': '1vw' }} class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;&nbsp;Đăng xuất</div>
                                </div>
                                :
                                <div className="mini-menu-admin">
                                    <div
                                        onClick={() => { this.props.history.push('/profile'); }}
                                    ><i style={{ 'fontSize': '1vw' }} class="fas fa-user-circle"></i>&nbsp;&nbsp;&nbsp;Quản lý tài khoản</div>
                                    <div
                                        onClick={() => { this.props.history.push('/admin'); }}
                                    ><i style={{ 'fontSize': '1vw' }} class="fas fa-user-cog"></i>&nbsp;&nbsp;&nbsp;Trang quản trị</div>
                                    <div
                                        onClick={() => { this.logOut(); }}
                                    ><i style={{ 'fontSize': '1vw' }} class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;&nbsp;Đăng xuất</div>
                                </div>
                            :
                            null}
                        {!this.props.userData ?
                            <div onClick={() => {
                                this.redirectPage("/register");
                            }}>
                                Đăng ký
                        </div>
                            :
                            null
                        }
                    </div>
                    {(window.location.href.split('/')[3] !== 'checkout' && window.location.href.split('/')[3] !== 'profile' && window.location.href.split('/')[3] !== 'admin') ?
                        < div className="menu-container-toolbar">
                            <div className="menu-container-toolbar-logo">
                                <i class="fas fa-won-sign"></i>ephone
                        </div>
                            <div className="menu-container-toolbar-search">
                                <div className="menu-container-toolbar-search-bar">
                                    {this.props.allPhones !== null ?
                                        <Autocomplete
                                            onClickCapture={() => { this.setState({ isOnClick: true }) }}
                                            inputValue={this.state.searchtxt}
                                            onChange={(e, value) => { this.setState({ selectedName: value.phoneName, searchtxt: value.phoneName }) }}
                                            onInputChange={(e, value) => { this.setState({ selectedName: "", searchtxt: value }) }}
                                            id="free-solo-demo"
                                            open={this.state.isOnClick && this.state.searchtxt.length > 2 && this.state.selectedName === "" ? true : false}
                                            freeSolo
                                            onBlur={() => { if (this.state.searchtxt !== '') { this.setState({ isOnClick: false }) } }}
                                            style={{ background: 'white', width: 500, height: 100, right: 100 }}
                                            options={this.props.allPhones !== null ? this.props.allPhones : [{ name: '' }]}
                                            getOptionLabel={(option) => this.props.allPhones !== null ? option.phoneName : [{ name: '' }]}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Nhập tên sản phẩm muốn tìm kiếm" margin="normal" variant="filled" />
                                            )}
                                        />
                                        : null
                                    }
                                </div>
                                <div className="menu-container-toolbar-search-button">
                                    <div onClick={() => { this.searchByName() }}>
                                        <i class="fa fa-search"></i>
                                    </div>
                                </div>
                                {this.state.isOnClick && this.props.top3SearchValues !== null && this.state.searchtxt === '' ?
                                    <div
                                        onMouseLeave={() => { this.setState({ isOnClick: false }) }}
                                        className='top-search-value-bar'>
                                        <div>
                                            Từ khóa thông dụng
                                        </div>
                                        <div>
                                            {this.props.top3SearchValues.map(value =>
                                                <div

                                                    onClick={() => {
                                                        this.setState({ searchtxt: value.searchValue, isOnClick: false });
                                                    }}
                                                >{value.searchValue} ({value.weight} lượt tìm kiếm)</div>)}
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="menu-container-toolbar-cart">
                                <i
                                    onClick={() => { this.props.history.push('/cart') }}
                                    class="fa fa-shopping-cart"></i>
                                {this.props.cart && this.props.cart.length > 0 ?
                                    <div className="menu-container-toolbar-cart-amount">
                                        {this.props.totalAmount}
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        : null
                    }
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartData,
        userData: state.userData,
        totalAmount: state.totalCartQuantity,
        allPhones: state.allPhones,
        top3SearchValues: state.top3SearchValues,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPhoneListByPhoneName: (name) => { dispatch(actions.getPhoneListByName(name)) },
        resetLoginState: () => { dispatch(actions.resetLoginState()) },
        logout: () => { dispatch(actions.logout()) },
        getAllPhoneList: () => { dispatch(actions.getAllPhoneList()) },
        getTop3SearchValues: () => { dispatch(actions.getTop3SearchValue()) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));