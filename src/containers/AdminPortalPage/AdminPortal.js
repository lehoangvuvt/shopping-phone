import React from 'react';
import './style/style.css';
import Menu from '../../components/Menu/Menu.js';
import AdminSubMenu from '../../components/AdminSubMenu/AdminSubMenu';
import UserManager from './UserManager';
import PhoneManager from './PhoneManager';
import OrderManager from './OrderManager';
import Overview from './Overview';
import * as actions from '../../action/index';
import { connect } from 'react-redux';


class AdminPortal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

        if (this.props.user && localStorage.getItem('username') !== null) {
            if (this.props.user.roleId !== 1) {
                this.props.history.push('/');
            };
        } else if (!this.props.user && localStorage.getItem('username') !== null) {
            if (localStorage.getItem('roleId') == 1) {
                this.props.history.push('/');
                this.props.history.push('/admin');
            } else {
                this.props.history.push('/');
            }
        } else if (!this.props.user && localStorage.getItem('username') === null) {
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <>
                <div className="admin-portal-container">
                    <Menu />
                    <AdminSubMenu />
                    {this.props.adminOpt === 0 ?
                        <>
                            <Overview />
                        </>
                        :
                        this.props.adminOpt === 1 ?
                            <>
                                <h1 id='title-text-admin'>Quản lý thành viên</h1>
                                <UserManager />
                            </>
                            :
                            this.props.adminOpt === 2 ?
                                <>
                                    <h1 id='title-text-admin'>Quản lý sản phẩm</h1>
                                    <PhoneManager />
                                </>
                                :
                                this.props.adminOpt === 3 ?
                                    <>
                                        <h1 id='title-text-admin'>Quản lý đơn hàng</h1>
                                        <OrderManager />
                                    </>
                                    :
                                    this.props.adminOpt === 4 ?
                                        <>
                                            <h1 id='title-text-admin'>Quản lý thành viên</h1>
                                            <UserManager />
                                        </>
                                        : null
                    }
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData,
        adminOpt: state.adminOpt,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => { dispatch(actions.getAllUsers()) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal);