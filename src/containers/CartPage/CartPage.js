import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import * as currencies from '../../utils/currencyFormat';
import './style/style.css';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTickAll: false,
        }
    }
    checkIfTickAll() {
        let bool = true;
        this.props.cart.forEach(i => {
            if (!i.isTicked) {
                bool = false;
            }
        });
        setTimeout(() => {
            if (bool) {
                this.setState({ isTickAll: true });
            } else {
                this.setState({ isTickAll: false });
            }
        }, 1);
    }
    handleTickAll = () => {
        this.setState({
            isTickAll: !this.state.isTickAll,
        });
        setTimeout(() => {
            this.props.tickAll(this.state.isTickAll);
        }, 1);
    }
    handleTickItem = (id) => {
        this.props.tickOne(id);
        this.checkIfTickAll();
    }
    deleteItems = () => {
        this.props.deleteItems();
    }
    componentDidMount() {
        this.checkIfTickAll();
    }
    addAmount = (id) => {
        this.props.addItemAmountFromCart(id);
    }
    minusAmount = (id) => {
        this.props.minusItemAmountFromCart(id);
    }
    getClickedItem = () => {
        let clickedItem = 0;
        this.props.cart.forEach(i => {
            if (i.isTicked) {
                clickedItem = clickedItem + i.amount;
            }
        });
        return clickedItem;
    }
    getTotalItemsCost = () => {
        let total = 0;
        this.props.cart.forEach(i => {
            if (i.isTicked) {
                total = total + (i.amount * i.price);
            };
        });
        return total;
    }
    redirectToCheckoutPage = () => {
        if (this.props.userData) {
            if (this.getTotalItemsCost() > 0) {
                this.props.history.push('/checkout');
            } else {
                alert('Vui lòng chọn ít nhất 1 món');
            }
        } else {
            this.props.history.push('login');
        };
    }
    render() {
        let cart = null;
        if (this.props.cart && this.props.cart.length > 0) {
            cart = this.props.cart.map(i => {
                return (
                    <div>
                        <div>
                            <input
                                checked={i.isTicked}
                                onChange={() => {
                                    this.handleTickItem(i.id);
                                }}
                                type="checkbox" />
                        </div>
                        <div>
                            <div>
                                <img src={i.img} />
                            </div>
                            <div>
                                <div>
                                    {i.name}
                                </div>
                                <div>
                                    {i.manufacturer}
                                </div>
                            </div>
                            <div>
                                {currencies.vietnamCurrency(i.price)}
                            </div>
                        </div>
                        <div>
                            <div><i
                                onClick={() => { this.minusAmount(i.id) }}
                                class="fas fa-minus-square"></i></div>
                            <div>{i.amount}</div>
                            <div><i
                                onClick={() => { this.addAmount(i.id) }}
                                class="fas fa-plus-square"></i></div>
                        </div>
                    </div>
                )
            });
        };
        return (
            <>
                <div className="cart-container">
                    <Menu />
                    {this.props.cart && this.props.cart.length > 0 ?
                        <div className="cart-main">
                            <div className="cart-main-product-list">
                                <div>
                                    <div>
                                        <input onChange={this.handleTickAll}
                                            checked={this.state.isTickAll}
                                            type="checkbox" />
                                    </div>
                                    <div>
                                        Chọn tất cả ({this.props.cart.length} sản phẩm)
                                </div>
                                    <div onClick={() => { this.deleteItems() }}>
                                        Xóa
                                </div>
                                </div>
                                <div>
                                    {cart}
                                </div>
                            </div>
                            <div className="cart-main-info-panel">
                                <div>
                                    Thông tin đơn hàng
                            </div>
                                <div>
                                    <div>
                                        Tạm tính ({this.getClickedItem()} sản phẩm)
                              </div>
                                    <div>
                                        {currencies.vietnamCurrency(this.getTotalItemsCost())}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        Phí giao hàng (miễn phí)
                              </div>
                                    <div>
                                        {currencies.vietnamCurrency(this.getTotalItemsCost() * 0)}
                                    </div>
                                </div>
                                <div>
                                </div>
                                <div>
                                    <div>
                                        Tổng cộng
                              </div>
                                    <div>
                                        {currencies.vietnamCurrency(this.getTotalItemsCost() * 0 + this.getTotalItemsCost())}
                                    </div>
                                </div>
                                <div>
                                    <input
                                        onClick={() => { this.redirectToCheckoutPage(); }}
                                        type="submit" value="Xác nhận giỏ hàng" />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="cart-main">
                            <center>
                                <h2>Hiện tại bạn không có sản phẩm nào trong giỏ hàng. Bấm vào <span
                                    onClick={() => { this.props.history.push('/'); }}
                                    style={{ 'color': '#3498db', 'cursor': 'pointer', 'textDecoration': 'underline' }}>đây</span> để quay lại trang chủ.</h2>
                            </center>
                        </div>
                    }
                </div>
                <Footer />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartData,
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tickAll: (status) => { dispatch(actions.tickAllCartItems(status)) },
        tickOne: (id) => { dispatch(actions.tickCartItem(id)) },
        deleteItems: () => { dispatch(actions.deleteItemsFromCart()) },
        addItemAmountFromCart: (id) => { dispatch(actions.addItemAmountFromCart(id)) },
        minusItemAmountFromCart: (id) => { dispatch(actions.minusItemAmountFromCart(id)) },
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);