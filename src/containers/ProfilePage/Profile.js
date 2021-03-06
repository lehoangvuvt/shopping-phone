import React from 'react';
import './style/style.css';
import Menu from '../../components/Menu/Menu';
import { connect } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import { getBirthdayFromString } from '../../utils/getBirthdayFromString';
import { dayTimeFormat } from '../../utils/dayTimeFormat';
import * as currencies from '../../utils/currencyFormat';
import * as actions from '../../action/index';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOpt: 1,
            birthday: this.generateDateString(),
            oldPassword: "",
            newPassword: "",
            newPasswordRepeat: "",
            fullname: this.props.user ? this.props.user.fullname : null,
            address: this.props.user ? this.props.user.address : null,
            phone: this.props.user ? this.props.user.phone : null,
            email: this.props.user ? this.props.user.email : null,
            isTogged: false,
            orderAddress: "",
            orderPhone: "",
            orderId: "",
            startIndex: 0,
            endIndex: 5,
            endPage: false,
            isAppear: false,
        }
    }
    selectOption = (opt) => {
        this.setState({ isAppear: false, isTogged: false });
        const profileClass = document.getElementById('profile-opt');
        const orderClass = document.getElementById('order-opt');
        const passwordClass = document.getElementById('password-opt');
        switch (opt) {
            case 'profiles':
                this.setState({ currentOpt: 1 });
                profileClass.className = 'submenu-options-selected';
                orderClass.className = 'submenu-options';
                passwordClass.className = 'submenu-options';
                break;
            case 'password':
                this.setState({ currentOpt: 2 });
                passwordClass.className = 'submenu-options-selected';
                profileClass.className = 'submenu-options';
                orderClass.className = 'submenu-options';
                break;
            case 'orders':
                this.setState({ currentOpt: 3 });
                orderClass.className = 'submenu-options-selected';
                profileClass.className = 'submenu-options';
                passwordClass.className = 'submenu-options';
                break;
            default:
                break;
        }
    }
    generateDateString = () => {
        if (this.props.user && this.props.user.birthday !== null) {
            let day = getBirthdayFromString(this.props.user.birthday).day;
            let month = getBirthdayFromString(this.props.user.birthday).month;
            let year = getBirthdayFromString(this.props.user.birthday).year;
            if (day < 10) {
                day = "0" + day;
            } else {
                day = day + "";
            };
            if (month < 10) {
                month = "0" + month;
            } else {
                month = month + "";
            }
            return year + "-" + month + "-" + day;
        } else {

        }
    }
    componentDidMount() {
        if (this.props.user && localStorage.getItem('username') !== null) {
            if (this.state.currentOpt === 3) {
                this.selectOption('orders');
            } else {
                this.selectOption('profiles');
            };
            localStorage.setItem('prevPath', "");
            this.props.getUserOrders(this.props.user ? this.props.user.username : null);
        } else if (!this.props.user && localStorage.getItem('username') !== null) {
            setTimeout(() => {
                this.props.history.push('/');
            }, 5);
            setTimeout(() => {
                this.props.history.push('/profile');
            }, 10);
        } else if (!this.props.user && localStorage.getItem('username') === null) {
            this.props.history.push('/');
        }
    }
    componentWillMount() {
        if (localStorage.getItem('prevPath') === 'checkout') {
            this.setState({ currentOpt: 3 });
        } else {
            this.setState({ currentOpt: 1 });
        }
    }
    changeDate = (e) => {
        const { value, name } = e.target;
        const date = value;
        const day = date.split('-')[2];
        const month = date.split('-')[1];
        const year = date.split('-')[0];
        const updatedBirthDay = year + "-" + month + "-" + day;
        if (value === "") {
            this.setState({ birthday: this.generateDateString() });
        } else {
            this.setState({ birthday: updatedBirthDay });
        }
    }
    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    updateProfileInfo = () => {
        const fullname = this.state.fullname;
        const address = this.state.address;
        const username = this.props.user.username;
        const phone = this.state.phone;
        const day = this.state.birthday.split('-')[2];
        const month = this.state.birthday.split('-')[1];
        const year = this.state.birthday.split('-')[0];
        const dateString = month + '-' + day + '-' + year;
        const email = this.state.email;
        if (this.state.fullname === "") {
            alert("Vui l??ng nh???p v??o tr?????ng c??n thi???u (m??u ?????)");
        } else {
            this.props.changeProfileInfo({ username: username, fullname: fullname, phoneNumber: phone, address: address, email: email, birthday: dateString });
        }
    }
    changePassword = () => {
        this.setState({ isTogged: true });
        if (this.state.oldPassword === "") {
            alert("Vui l??ng nh???p m???t kh???u hi???n t???i");
        } else if (this.state.newPassword === "") {
            alert("Vui l??ng nh???p m???t kh???u m???i");
        }
        else if (this.state.newPasswordRepeat === "") {
            alert("Vui l??ng nh???p l???i m???t kh???u m???i");
        }
        else if (this.state.newPassword !== this.state.newPasswordRepeat) {
            alert("M???t kh???u m???i kh??ng tr??ng nhau");
        } else {
            this.props.changePassword({ username: this.props.user.username, oldPassword: this.state.oldPassword, newPassword: this.state.newPassword });
            this.setState({
                oldPassword: "",
                newPassword: "",
                newPasswordRepeat: "",
            });
            this.setState({ isAppear: true, isTogged: false });
        }
    }
    getOrderStatusObj = (statusCode) => {
        let orderStatusObj = { color: "", name: "" };
        switch (statusCode) {
            case 1:
                orderStatusObj.color = "#e74c3c";
                orderStatusObj.name = "?????t th??nh c??ng";
                break;
            case 2:
                orderStatusObj.color = "#2ecc71";
                orderStatusObj.name = "??ang giao h??ng";
                break;
            case 3:
                orderStatusObj.color = "#0084ff";
                orderStatusObj.name = "Ho??n th??nh";
                break;
            case 4:
                orderStatusObj.color = "orange";
                orderStatusObj.name = "H???y";
                break;
            default:
                break;
        }
        return orderStatusObj;
    }
    getOrderDetails = (orderId, phone, address) => {
        this.setState({
            orderId: orderId,
            orderAddress: address,
            orderPhone: phone,
        })
        this.props.getOrderDetails(orderId);
        this.setState({ currentOpt: 4 });
    }
    getTotalPrice = () => {
        const orderItems = this.props.orderItems.listItem;
        let price = 0;
        orderItems.forEach(item => {
            price += item.price * item.quantity;
        });
        return currencies.vietnamCurrency(price);
    }
    goToNextOrdersPage = () => {
        this.setState({
            startIndex: this.state.startIndex + 5,
            endIndex: this.state.endIndex + 5,
            endPage: false,
        });
    }
    gotToPrevOrdersPage = () => {
        if (this.state.startIndex !== 0) {
            this.setState({
                startIndex: this.state.startIndex - 5,
                endIndex: this.state.endIndex - 5,
            });
        };
    }
    render() {
        return (
            <>
                <Menu />
                <div className='profile-container'>
                    <div className='profile-container-sub-menu'>
                        <div>
                            <div>{this.props.user ? this.props.user.username : null}</div>
                            <div>{this.state.fullname}</div>
                        </div>
                        <div id="profile-opt" className='submenu-options-selected' onClick={() => { this.selectOption("profiles") }}>
                            <div>
                                <i class="far fa-id-badge"></i>
                            </div>
                            <div>
                                Th??ng tin c?? nh??n
                            </div>
                        </div>
                        <div id='password-opt' className='submenu-options' onClick={() => { this.selectOption("password") }}>
                            <div>
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                Thay ?????i m???t kh???u
                            </div>
                        </div>
                        <div id='order-opt' className='submenu-options' onClick={() => { this.selectOption("orders") }}>
                            <div>
                                <i class="fas fa-shopping-basket"></i>
                            </div>
                            <div>
                                L???ch s??? ????n h??ng
                            </div>
                        </div>

                    </div>
                    <div className='profile-container-display'>
                        {this.state.currentOpt === 1 ?
                            <div>
                                <h1>Th??ng tin c?? nh??n</h1>
                                <div>T??n ?????y ?????</div>
                                <div>
                                    <input
                                        style={{ 'border': this.state.fullname === "" ? '2px solid rgba(255,0,0,0.5)' : null }}
                                        type='text' value={this.state.fullname}
                                        name="fullname"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>?????a ch???</div>
                                <div>
                                    <input
                                        type='text' value={this.state.address}
                                        name="address"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>Email</div>
                                <div>
                                    <input
                                        type='email' value={this.state.email}
                                        name="email"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>S??? ??i???n tho???i li??n l???c</div>
                                <div>
                                    <input type='number' value={this.state.phone}
                                        name="phone"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>Ng??y sinh</div>
                                <div>
                                    <input
                                        type='date'
                                        onChange={this.changeDate}
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={() => { this.updateProfileInfo() }}
                                        id="update-pass-btn">C???p nh???p th??ng tin</button>
                                </div>
                            </div>
                            :
                            this.state.currentOpt === 2 ?
                                < div >
                                    <h1>Thay ?????i m???t kh???u</h1>
                                    <div>Nh???p m???t kh???u hi???n t???i</div>
                                    <div>
                                        <input type='password'
                                            style={{ 'border': this.state.isTogged && (this.state.oldPassword === "") ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="oldPassword"
                                            value={this.state.oldPassword}
                                            onChange={this.handleChange} />
                                    </div>
                                    <div>Nh???p m???t kh???u m???i</div>
                                    <div>
                                        <input type='password' value={this.state.newPassword}
                                            style={{ 'border': this.state.isTogged && this.state.newPassword === "" ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="newPassword"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>Nh???p l???i kh???u m???i</div>
                                    <div>
                                        <input type='password' value={this.state.newPasswordRepeat}
                                            style={{ 'border': this.state.isTogged && (this.state.newPasswordRepeat === "" || this.state.newPasswordRepeat !== this.state.newPassword) ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="newPasswordRepeat"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        {this.props.changePasswordProcess.status === 200 && this.state.isAppear ?
                                            <p style={{ 'color': '#3498db', 'fontWeight': 'bold' }}>Thay ?????i m???t kh???u th??nh c??ng</p>
                                            : null
                                        }
                                        {this.props.changePasswordProcess.error !== false && this.state.isAppear ?
                                            <p style={{ 'color': '#e74c3c', 'fontWeight': 'bold' }}>Nh???p sai m???t kh???u hi???n t???i. Thay ?????i m???t kh???u th???t b???i</p>
                                            : null
                                        }
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => { this.changePassword(); }}
                                            id="update-pass-btn">C???p nh???p m???t kh???u</button>
                                    </div>
                                </div>
                                :
                                this.state.currentOpt === 3 ?
                                    <div>
                                        <h4>L???ch s??? ????n h??ng</h4>
                                        <br />
                                        <br />
                                        {this.props.userOrders.length > 0 ?
                                            this.props.userOrders.slice(this.state.startIndex, this.state.endIndex).map(order => {
                                                return (
                                                    <div className="order-holder">
                                                        <div>M?? ????n h??ng: {order.orderId}</div>
                                                        <div>Ng??y ph??t sinh: {dayTimeFormat(order.creationDate)}</div>
                                                        <div>Tr???ng th??i:&nbsp;
                                                            {order.status !== 4 ?
                                                                <span style={{ 'fontSize': '14px', 'textTransform': 'uppercase', 'fontWeight': 'bold', 'color': this.getOrderStatusObj(order.status).color }}>
                                                                    {this.getOrderStatusObj(order.status).name}
                                                                </span>
                                                                :
                                                                <span
                                                                    onClick={() => { alert('L?? do h???y ????n h??ng: ' + order.description) }}
                                                                    style={{ 'textDecoration': 'underline', 'cursor': 'pointer', 'fontSize': '14px', 'textTransform': 'uppercase', 'fontWeight': 'bold', 'color': this.getOrderStatusObj(order.status).color }}>
                                                                    {this.getOrderStatusObj(order.status).name}
                                                                </span>
                                                            }
                                                        </div>
                                                        <div
                                                            onClick={() => { this.getOrderDetails(order.orderId, order.phone, order.address) }}>
                                                            Chi ti???t
                                                        </div>
                                                    </div>

                                                )
                                            })
                                            : <div className="order-holder">
                                                <div>Kh??ng c?? ????n h??ng n??o</div>
                                            </div>
                                        }
                                        <div className="page-button">
                                            <button
                                                onClick={() => { this.gotToPrevOrdersPage() }}
                                                disabled={this.state.startIndex === 0 ? true : false}
                                                className={this.state.startIndex === 0 ? "button-disabled" : null}>trang tr?????c</button>
                                            <button
                                                onClick={() => { this.goToNextOrdersPage() }}
                                                disabled={this.state.startIndex + 5 >= this.props.userOrders.length ? true : false}
                                                className={this.state.startIndex + 5 >= this.props.userOrders.length ? "button-disabled" : null}
                                            >trang sau</button>
                                        </div>
                                    </div>
                                    : this.state.currentOpt === 4 ?
                                        <div>
                                            <h3
                                                onClick={() => { this.setState({ currentOpt: 3 }) }}
                                            ><i class="fas fa-arrow-left"></i> &nbsp;Quay l???i</h3>
                                            <h2>Chi ti???t ????n h??ng #{this.state.orderId}</h2>
                                            <br />
                                            <br />
                                            {this.props.orderItems ?
                                                <>
                                                    {this.props.orderItems.listItem.map(item => {
                                                        return (
                                                            <div className="items-holder">
                                                                <div>ID s???n ph???m: {item.productId}</div>
                                                                <div>Gi?? ????n v???: {currencies.vietnamCurrency(item.price)}</div>
                                                                <div>S??? l?????ng: {item.quantity} (c??i)</div>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="items-holder-last">
                                                        <div>
                                                            ?????a ch??? giao h??ng: {this.props.orderItems.address}
                                                        </div>
                                                        <div>
                                                            S??? ??i???n tho???i li??n l???c: {this.props.orderItems.phoneNumber}
                                                        </div>
                                                        <div>
                                                            T???ng ????n gi??: {this.getTotalPrice()}
                                                        </div>
                                                    </div>

                                                </>
                                                : null
                                            }

                                        </div>
                                        : null
                        }
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData,
        userOrders: state.userOrders,
        orderItems: state.orderDetails,
        changePasswordProcess: state.changePassword,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => { dispatch(actions.login(username, password)) },
        changeProfileInfo: (payload) => { dispatch(actions.changeProfileInfo(payload)) },
        changePassword: (payload) => { dispatch(actions.changePassword(payload)) },
        logout: () => { dispatch(actions.logout()) },
        getUserOrders: (username) => { dispatch(actions.getUserOrders(username)) },
        getOrderDetails: (orderId) => { dispatch(actions.getOrderDetails(orderId)) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
