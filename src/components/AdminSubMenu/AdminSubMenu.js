import React from 'react';
import './style/style.css';
import * as actions from '../../action/index';
import { connect } from 'react-redux';

class AdminSubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOpt: this.props.adminOpt,
            show: true,
        }
    }
    changeOpt = (opt) => {
        this.setState({
            currentOpt: opt,
        });
        this.props.changeAdminSubOpt(opt);
        this.openNav();
    }
    componentDidMount() {
        this.props.getPendingOrdersCount();
        const nav = document.getElementById('nav');
        const openBtn = document.getElementById('open-nav-btn');
        nav.style.left = '-228px';
        openBtn.style.left = '0px';
        setTimeout(() => {
            nav.style.left = '0px';
            openBtn.style.left = '229px';
        }, 50);
    }
    closeNav = () => {
        this.setState({ show: false });
        const nav = document.getElementById('nav');
        const openBtn = document.getElementById('open-nav-btn');
        nav.style.left = '-228px';
        openBtn.style.left = '0px';
        const usersTable = document.getElementById('users-table');
        const ordersTable = document.getElementById('orders-table');
        const phonesTable = document.getElementById('phones-table');
        const userDetailsTable = document.getElementById('users-details-table');
        const addPhoneContainer = document.getElementById('add-phone-container');
        const orderDetailsTable = document.getElementById('orders-detail-table');
        if (this.props.adminOpt === 1) {
            if (usersTable !== null) {
                usersTable.style.left = '10%';
                usersTable.style.width = '80%';
                usersTable.style.height = '75%';
            }
            else {
                userDetailsTable.style.left = '10%';
                userDetailsTable.style.width = '80%';
                userDetailsTable.style.height = '28%';
            }
        }
        if (this.props.adminOpt === 2) {
            if (phonesTable !== null) {
                phonesTable.style.left = '5%';
                phonesTable.style.width = '90%';
                phonesTable.style.height = '75%';
            } else {
                addPhoneContainer.style.left = '5%';
                addPhoneContainer.style.width = '90%';
                addPhoneContainer.style.height = "480px";
            }
        }
        if (this.props.adminOpt === 3) {
            if (ordersTable !== null) {
                ordersTable.style.left = '10%';
                ordersTable.style.width = '80%';
                ordersTable.style.height = '75%';
            } else {
                orderDetailsTable.style.left = '10%';
                orderDetailsTable.style.width = '80%';
                orderDetailsTable.style.height = '600px';
            }
        }
    }
    openNav = () => {
        this.setState({ show: true });
        const nav = document.getElementById('nav');
        const openBtn = document.getElementById('open-nav-btn');
        nav.style.left = '0px';
        openBtn.style.left = '229px';
        const usersTable = document.getElementById('users-table');
        const ordersTable = document.getElementById('orders-table');
        const phonesTable = document.getElementById('phones-table');
        const userDetailsTable = document.getElementById('users-details-table');
        const addPhoneContainer = document.getElementById('add-phone-container');
        const orderDetailsTable = document.getElementById('orders-detail-table');
        if (this.props.adminOpt === 1) {
            if (usersTable !== null) {
                usersTable.style.left = '20%';
                usersTable.style.width = '65%';
                usersTable.style.height = '63%';
            }
            else {
                userDetailsTable.style.left = '20%';
                userDetailsTable.style.width = '65%';
                userDetailsTable.style.height = '28%';
            }
        }
        if (this.props.adminOpt === 2) {
            if (phonesTable !== null) {
                phonesTable.style.left = '20%';
                phonesTable.style.width = '75%';
                phonesTable.style.height = '63%';
            } else {
                addPhoneContainer.style.left = '20%';
                addPhoneContainer.style.width = '75%';
                addPhoneContainer.style.height = "500px";
            }
        }
        if (this.props.adminOpt === 3) {
            if (ordersTable !== null) {
                ordersTable.style.left = '20%';
                ordersTable.style.width = '65%';
                ordersTable.style.height = '63%';
            } else {
                orderDetailsTable.style.left = '22%';
                orderDetailsTable.style.width = '62%';
                orderDetailsTable.style.height = '500px';
            }
        }
    }
    toggle = () => {
        if (this.state.show) {
            this.closeNav();
        } else {
            this.openNav();
        };
    }
    render() {
        return (
            <>
                <div
                    onClick={() => { this.toggle() }}
                    id="open-nav-btn">
                    {this.state.show ?
                        <i class="fas fa-ellipsis-v"></i>
                        :
                        <i class="fas fa-ellipsis-h"></i>
                    }</div>
                <div
                    id='nav' className="admin-sub-menu">
                    <div onClick={() => { this.closeNav() }}>
                        <i class="fas fa-times"></i>
                    </div>
                    
                    <div
                        onClick={() => { this.changeOpt(1) }}
                        className={this.state.currentOpt === 1 ? "selected-sub-menu-admin" : null}>
                        <div><i class="fas fa-users-cog"></i></div>
                        <div>Quản lý thành viên</div>
                    </div>
                    <div
                        onClick={() => { this.changeOpt(2) }}
                        className={this.state.currentOpt === 2 ? "selected-sub-menu-admin" : null}>
                        <div><i class="fas fa-mobile-alt"></i></div>
                        <div>Quản lý sản phẩm</div>
                    </div>
                    <div
                        onClick={() => { this.changeOpt(3) }}
                        className={this.state.currentOpt === 3 ? "selected-sub-menu-admin" : null}>
                        <div><i class="far fa-sticky-note"></i></div>
                        <div>Quản lý đơn hàng {this.props.count > 0 ? <span className='noti-order-num'>{this.props.count}</span> : null}</div>
                    </div>
                </div>
            </>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeAdminSubOpt: (opt) => { dispatch(actions.changeAdminSubOpt(opt)) },
        getPendingOrdersCount: () => { dispatch(actions.getPendingOrdersCount()) },
        dispatch,
    }
}

function mapStateToProps(state) {
    return {
        count: state.pendingOrdersCount,
        adminOpt: state.adminOpt,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSubMenu);