import React from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withRouter } from 'react-router-dom';
import './style/style.css';
import Modal from '@material-ui/core/Modal';
import * as currencies from '../../utils/currencyFormat';
import * as actions from '../../action/index';
import { dayTimeFormat } from '../../utils/dayTimeFormat';

class OrderManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsMode: false,
            openModal: false,
            orderId: '',
            orderStatus: 0,
            orderStatusToChange: 0,
            cancelTxt: '',
        }
    }
    componentDidMount() {
        this.props.getAllOrders();
    }
    handleOpen = (orderId, status, description) => {
        if (description !== null) {
            this.setState({
                cancelTxt: description,
            });
        }
        this.setState({
            orderStatus: status + "",
            orderId: orderId,
            openModal: true
        });
    };
    handleCancelTxt = (e) => {
        this.setState({
            cancelTxt: e.target.value,
        });
    }
    handleClose = () => {
        this.setState({ openModal: false });
    };
    getOrderStatusObj = (statusCode) => {
        let orderStatusObj = { color: "", name: "" };
        switch (statusCode + "") {
            case "1":
                orderStatusObj.color = "#e74c3c";
                orderStatusObj.name = "Đặt thành công";
                break;
            case "2":
                orderStatusObj.color = "#2ecc71";
                orderStatusObj.name = "Đang giao hàng";
                break;
            case "3":
                orderStatusObj.color = "#0084ff";
                orderStatusObj.name = "Hoàn thành";
                break;
            case "4":
                orderStatusObj.color = "orange";
                orderStatusObj.name = "Hủy";
                break;
            default:
                break;
        }
        return orderStatusObj;
    }
    goToOrderDetails = (orderId) => {
        this.props.getOrderDetails(orderId);
        this.setState({ orderDetailsMode: true });
    }
    getTotalPrice = () => {
        const orderItems = this.props.orderItems.listItem;
        let price = 0;
        orderItems.forEach(item => {
            price += item.price * item.quantity;
        });
        return currencies.vietnamCurrency(price);
    }
    handleChange = (e) => {
        this.setState({ orderStatusToChange: e.target.value });
    };
    updateOrderStatus = () => {
        if (this.state.orderStatusToChange === "2") {
            this.props.setOrderStatusTo2(this.state.orderId);
            this.setState({
                openModal: false,
            });
            setTimeout(() => {
                this.props.history.push('/');
            }, 100);
            setTimeout(() => {
                this.props.history.push('/admin');
            }, 150);
        } else if (this.state.orderStatusToChange === "3") {
            this.props.setOrderStatusTo3(this.state.orderId);
            this.setState({
                openModal: false,
            });
            setTimeout(() => {
                this.props.history.push('/');
            }, 100);
            setTimeout(() => {
                this.props.history.push('/admin');
            }, 150);
        } else {
            if (this.state.cancelTxt !== "" && this.state.cancelTxt.trim() !== "") {
                this.props.setOrderStatusTo4({ orderId: this.state.orderId, description: this.state.cancelTxt });
                this.setState({
                    openModal: false,
                });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 100);
                setTimeout(() => {
                    this.props.history.push('/admin');
                }, 150);
            } else {
                alert('Vui lòng nhập lý do hủy đơn hàng');
            };
        };
    }
    render() {
        return (
            !this.state.orderDetailsMode ?
                <>
                    <div id='orders-table' className='orders-manager-container'>
                        <div className="header-table">
                            <div>No</div>
                            <div>ID</div>
                            <div>Chủ đơn hàng</div>
                            <div>Số điện thoại</div>
                            <div>Ngày phát sinh</div>
                            <div>Trạng thái</div>
                            <div></div>
                            <div></div>
                        </div>
                        {this.props.allOrders.length > 0 ?
                            this.props.allOrders.map((order, i) => {
                                return (
                                    <div>
                                        <div>{i + 1}</div>
                                        <div>{order.orderId}</div>
                                        <div>{order.username}</div>
                                        <div>{order.phoneNumber}</div>
                                        <div>{dayTimeFormat(order.creationDate)}</div>
                                        {order.status !== 4 ?
                                            <div
                                                style={{ 'color': this.getOrderStatusObj(order.status).color }}
                                            >{this.getOrderStatusObj(order.status).name}</div>
                                            :
                                            <div
                                                onClick={() => { alert('Lý do hủy đơn hàng: ' + order.description) }}
                                                style={{ 'textDecoration': 'underline', 'cursor': 'pointer', 'color': this.getOrderStatusObj(order.status).color }}
                                            >{this.getOrderStatusObj(order.status).name}</div>
                                        }
                                        <div
                                            onClick={() => { this.goToOrderDetails(order.orderId); }}
                                        >Chi tiết</div>
                                        {order.status !== 4 && order.status !== 3 ?
                                            <div
                                                onClick={() => {
                                                    this.handleOpen(order.orderId, order.status, order.description)
                                                }}
                                            >Cập nhập</div>
                                            :
                                            order.status === 4 ?
                                                <div
                                                    onClick={() => {
                                                        alert('Không thể cập nhập trạng thái đơn hàng đã bị hủy')
                                                    }}
                                                    className='disable-cancel-order'>Cập nhập</div>
                                                :
                                                order.status === 3 ?
                                                    <div
                                                        onClick={() => {
                                                            alert('Không thể cập nhập trạng thái đơn hàng đã hoàn thành')
                                                        }}
                                                        className='disable-cancel-order'>Cập nhập</div>
                                                    : null
                                        }
                                    </div>)
                            }
                            )
                            : null}

                    </div>
                    <Modal
                        open={this.state.openModal}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div className='modal-status-order'>
                            <div>Cập nhập trạng thái cho đơn hàng #{this.state.orderId}</div>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Trạng thái hiện tại: <span style={{ 'color': this.getOrderStatusObj(this.state.orderStatus).color }}>{this.getOrderStatusObj(this.state.orderStatus).name}</span></FormLabel>
                                    <FormLabel component="legend">Trạng thái sẽ cập nhập: <span style={{ 'color': this.getOrderStatusObj(this.state.orderStatusToChange).color }}>{this.getOrderStatusObj(this.state.orderStatusToChange).name}</span></FormLabel>
                                    <RadioGroup aria-label="orderStatusToChange" name="orderStatusToChange" value={this.state.orderStatusToChange} onChange={this.handleChange}>
                                        <FormControlLabel
                                            disabled={this.state.orderStatus === '2' || this.state.orderStatus === '3' ? true : false}
                                            style={{ 'color': this.getOrderStatusObj(2).color, 'cursor': this.state.orderStatus === '2' || this.state.orderStatus === '3' ? 'not-allowed' : 'pointer' }}
                                            value="2" control={<Radio style={{ 'color': this.getOrderStatusObj(2).color }} />} label="Đang giao hàng" />
                                        <FormControlLabel
                                            disabled={this.state.orderStatus === '3' ? true : false}
                                            style={{ 'color': this.getOrderStatusObj(3).color, 'cursor': this.state.orderStatus === '3' ? 'not-allowed' : 'pointer' }}
                                            value="3" control={<Radio style={{ 'color': this.getOrderStatusObj(3).color }} />} label="Hoàn thành" />
                                        <FormControlLabel
                                            style={{ 'color': this.getOrderStatusObj(4).color }}
                                            value="4" control={<Radio style={{ 'color': this.getOrderStatusObj(4).color }} />} label="Hủy" />
                                        <input
                                            className="txt-cancel"
                                            name='cancelTxt'
                                            value={this.state.cancelTxt}
                                            onChange={this.handleCancelTxt}
                                            style={{ 'border': this.state.orderStatusToChange === "4" ? '2px solid orange' : '2px solid rgba(0,0,0,0.1)' }}
                                            type='text' placeholder='Nhập lý do hủy đơn hàng' disabled={this.state.orderStatusToChange === "4" ? false : true} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div>
                                <button
                                    onClick={() => { this.updateOrderStatus() }}
                                >Cập nhập</button>
                            </div>
                        </div>
                    </Modal>
                </>
                :
                this.props.orderItems ?
                    <div id='orders-detail-table' className='orders-detail-container'>
                        <h3 className='back-to-order-manager'
                            onClick={() => { this.setState({ orderDetailsMode: false }) }}
                        ><i class="fas fa-arrow-left"></i> &nbsp;Quay lại</h3>
                        <h2 className='order-detail-title'>Chi tiết đơn hàng #{this.props.orderItems.orderId}</h2>
                        <br />
                        <br />
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
                    </div>
                    : null
        )
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.allUsers,
        allOrders: state.allOrders,
        orderItems: state.orderDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => { dispatch(actions.getAllUsers()) },
        getAllOrders: () => { dispatch(actions.getAllOrders()) },
        getOrderDetails: (orderId) => { dispatch(actions.getOrderDetails(orderId)) },
        setOrderStatusTo2: (orderId) => { dispatch(actions.setOrderStatusTo2(orderId)) },
        setOrderStatusTo3: (orderId) => { dispatch(actions.setOrderStatusTo3(orderId)) },
        setOrderStatusTo4: (orderId) => { dispatch(actions.setOrderStatusTo4(orderId)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderManager));