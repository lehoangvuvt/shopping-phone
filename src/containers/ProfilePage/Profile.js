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
            alert("Vui lòng nhập vào trường còn thiếu (màu đỏ)");
        } else {
            this.props.changeProfileInfo({ username: username, fullname: fullname, phoneNumber: phone, address: address, email: email, birthday: dateString });
        }
    }
    changePassword = () => {
        this.setState({ isTogged: true });
        if (this.state.oldPassword === "") {
            alert("Vui lòng nhập mật khẩu hiện tại");
        } else if (this.state.newPassword === "") {
            alert("Vui lòng nhập mật khẩu mới");
        }
        else if (this.state.newPasswordRepeat === "") {
            alert("Vui lòng nhập lại mật khẩu mới");
        }
        else if (this.state.newPassword !== this.state.newPasswordRepeat) {
            alert("Mật khẩu mới không trùng nhau");
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
                orderStatusObj.name = "Đặt thành công";
                break;
            case 2:
                orderStatusObj.color = "#2ecc71";
                orderStatusObj.name = "Đang giao hàng";
                break;
            case 3:
                orderStatusObj.color = "#0084ff";
                orderStatusObj.name = "Hoàn thành";
                break;
            case 4:
                orderStatusObj.color = "orange";
                orderStatusObj.name = "Hủy";
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
                                Thông tin cá nhân
                            </div>
                        </div>
                        <div id='password-opt' className='submenu-options' onClick={() => { this.selectOption("password") }}>
                            <div>
                                <i class="fas fa-lock"></i>
                            </div>
                            <div>
                                Thay đổi mật khẩu
                            </div>
                        </div>
                        <div id='order-opt' className='submenu-options' onClick={() => { this.selectOption("orders") }}>
                            <div>
                                <i class="fas fa-shopping-basket"></i>
                            </div>
                            <div>
                                Lịch sử đơn hàng
                            </div>
                        </div>

                    </div>
                    <div className='profile-container-display'>
                        {this.state.currentOpt === 1 ?
                            <div>
                                <h1>Thông tin cá nhân</h1>
                                <div>Tên đầy đủ</div>
                                <div>
                                    <input
                                        style={{ 'border': this.state.fullname === "" ? '2px solid rgba(255,0,0,0.5)' : null }}
                                        type='text' value={this.state.fullname}
                                        name="fullname"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>Địa chỉ</div>
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
                                <div>Số điện thoại liên lạc</div>
                                <div>
                                    <input type='number' value={this.state.phone}
                                        name="phone"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>Ngày sinh</div>
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
                                        id="update-pass-btn">Cập nhập thông tin</button>
                                </div>
                            </div>
                            :
                            this.state.currentOpt === 2 ?
                                < div >
                                    <h1>Thay đổi mật khẩu</h1>
                                    <div>Nhập mật khẩu hiện tại</div>
                                    <div>
                                        <input type='password'
                                            style={{ 'border': this.state.isTogged && (this.state.oldPassword === "") ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="oldPassword"
                                            value={this.state.oldPassword}
                                            onChange={this.handleChange} />
                                    </div>
                                    <div>Nhập mật khẩu mới</div>
                                    <div>
                                        <input type='password' value={this.state.newPassword}
                                            style={{ 'border': this.state.isTogged && this.state.newPassword === "" ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="newPassword"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div>Nhập lại khẩu mới</div>
                                    <div>
                                        <input type='password' value={this.state.newPasswordRepeat}
                                            style={{ 'border': this.state.isTogged && (this.state.newPasswordRepeat === "" || this.state.newPasswordRepeat !== this.state.newPassword) ? '2px solid rgba(255,0,0,0.5)' : null }}
                                            name="newPasswordRepeat"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        {this.props.changePasswordProcess.status === 200 && this.state.isAppear ?
                                            <p style={{ 'color': '#3498db', 'fontWeight': 'bold' }}>Thay đổi mật khẩu thành công</p>
                                            : null
                                        }
                                        {this.props.changePasswordProcess.error !== false && this.state.isAppear ?
                                            <p style={{ 'color': '#e74c3c', 'fontWeight': 'bold' }}>Nhập sai mật khẩu hiện tại. Thay đổi mật khẩu thất bại</p>
                                            : null
                                        }
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => { this.changePassword(); }}
                                            id="update-pass-btn">Cập nhập mật khẩu</button>
                                    </div>
                                </div>
                                :
                                this.state.currentOpt === 3 ?
                                    <div>
                                        <h4>Lịch sử đơn hàng</h4>
                                        <br />
                                        <br />
                                        {this.props.userOrders.length > 0 ?
                                            this.props.userOrders.slice(this.state.startIndex, this.state.endIndex).map(order => {
                                                return (
                                                    <div className="order-holder">
                                                        <div>Mã đơn hàng: {order.orderId}</div>
                                                        <div>Ngày phát sinh: {dayTimeFormat(order.creationDate)}</div>
                                                        <div>Trạng thái:&nbsp;
                                                            {order.status !== 4 ?
                                                                <span style={{ 'fontSize': '14px', 'textTransform': 'uppercase', 'fontWeight': 'bold', 'color': this.getOrderStatusObj(order.status).color }}>
                                                                    {this.getOrderStatusObj(order.status).name}
                                                                </span>
                                                                :
                                                                <span
                                                                    onClick={() => { alert('Lý do hủy đơn hàng: ' + order.description) }}
                                                                    style={{ 'textDecoration': 'underline', 'cursor': 'pointer', 'fontSize': '14px', 'textTransform': 'uppercase', 'fontWeight': 'bold', 'color': this.getOrderStatusObj(order.status).color }}>
                                                                    {this.getOrderStatusObj(order.status).name}
                                                                </span>
                                                            }
                                                        </div>
                                                        <div
                                                            onClick={() => { this.getOrderDetails(order.orderId, order.phone, order.address) }}>
                                                            Chi tiết
                                                        </div>
                                                    </div>

                                                )
                                            })
                                            : <div className="order-holder">
                                                <div>Không có đơn hàng nào</div>
                                            </div>
                                        }
                                        <div className="page-button">
                                            <button
                                                onClick={() => { this.gotToPrevOrdersPage() }}
                                                disabled={this.state.startIndex === 0 ? true : false}
                                                className={this.state.startIndex === 0 ? "button-disabled" : null}>trang trước</button>
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
                                            ><i class="fas fa-arrow-left"></i> &nbsp;Quay lại</h3>
                                            <h2>Chi tiết đơn hàng #{this.state.orderId}</h2>
                                            <br />
                                            <br />
                                            {this.props.orderItems ?
                                                <>
                                                    {this.props.orderItems.listItem.map(item => {
                                                        return (
                                                            <div className="items-holder">
                                                                <div>ID sản phẩm: {item.productId}</div>
                                                                <div>Giá đơn vị: {currencies.vietnamCurrency(item.price)}</div>
                                                                <div>Số lượng: {item.quantity} (cái)</div>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="items-holder-last">
                                                        <div>
                                                            Địa chỉ giao hàng: {this.props.orderItems.address}
                                                        </div>
                                                        <div>
                                                            Số điện thoại liên lạc: {this.props.orderItems.phoneNumber}
                                                        </div>
                                                        <div>
                                                            Tổng đơn giá: {this.getTotalPrice()}
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
