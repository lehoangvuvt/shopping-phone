import React from 'react';
import { connect } from 'react-redux';
import './style/style.css';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import * as actions from '../../action/index';

class UserManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetailMode: false,
            changeRoleMode: false,
            prevStatusModeChange: '',
            selectedRole: 'member',
        }
    }
    componentDidMount() {
        this.props.getAllUsers();
    }
    switchToDetails = (username) => {
        this.props.getUserDetails(username);
        this.setState({ userDetailMode: true });

    }
    getRoleName = (id) => {
        let roleName = null;
        switch (id) {
            case 1:
                roleName = 'admin';
                break;
            case 2:
                roleName = 'member';
                break;
            default:
                roleName = 'unknown';
                break;
        };
        return roleName.toUpperCase();
    }
    changeRole = (e) => {
        this.setState({ selectedRole: e.target.value });
    }
    submitRole = (username) => {
        this.setState({ changeRoleMode: false });
        let roleId = null;
        if (this.state.selectedRole === 'admin') {
            roleId = 1;
        } else if (this.state.selectedRole === 'member') {
            roleId = 2;
        };
        this.props.changeUserRole({ username: username, roleId: roleId });
        setTimeout(() => {
            this.props.history.push('/');
        }, 10)
        setTimeout(() => {
            this.props.history.push('/admin');
        }, 11)
    }
    ban = (username) => {
        this.props.banAccount(username);
    }
    unban = (username) => {
        this.props.unbanAccount(username);
    }
    getStatus = (status) => {
        if (status) {
            return "Hoạt động";
        } else {
            return "Vô hiệu hóa";
        }
    }
    render() {
        return (
            this.state.userDetailMode === false ?
                <div id="users-table" className='all-users-container'>
                    <div className="header-table">
                        <div>No</div>
                        <div>Tên tài khoản</div>
                        <div>Tên đầy đủ</div>
                        <div>Loại tài khoản</div>
                        <div>Trạng thái</div>
                        <div></div>
                        <div></div>
                    </div>
                    {!this.props.getAllUsersProcess.isLoading && this.props.allUsers !== null ?
                        this.props.allUsers.length > 0 ?
                            this.props.allUsers.map((user, i) => {
                                return (
                                    <div>
                                        <div>{i + 1}</div>
                                        <div
                                            onClick={() => { this.switchToDetails(user.username); }}
                                            style={{ 'color': '#2980b9', 'cursor': 'pointer' }}>{user.username}</div>
                                        <div>{user.fullname}</div>
                                        {!user.isChangeStatusMode ?
                                            <div
                                                style={{ 'color': user.roleId === 1 ? '#e74c3c' : '#27ae60', 'fontSize': '14px', 'fontWeight': 'bold' }}
                                            >{this.getRoleName(user.roleId)}</div>
                                            :
                                            <div>
                                                <select style={{ 'color': this.state.selectedRole === 'admin' ? '#e74c3c' : '#2ecc71', 'cursor': 'pointer', 'fontWeight': 'bold', 'textTransform': 'uppercase' }} value={this.state.selectedRole} onChange={this.changeRole}>
                                                    <option
                                                        value='admin'
                                                        style={{ 'color': '#e74c3c', 'fontWeight': 'bold', 'textTransform': 'uppercase' }}>Admin</option>
                                                    <option
                                                        value='member'
                                                        style={{ 'color': '#2ecc71', 'fontWeight': 'bold', 'textTransform': 'uppercase' }}>Member</option>
                                                </select>
                                            </div>
                                        }
                                        <div
                                            style={{ 'color': user.status ? 'blue' : 'red', 'fontSize': '11px', 'fontWeight': 'bold' }}
                                        >{this.getStatus(user.status).toUpperCase()}</div>
                                        {user.roleId !== 1 ?
                                            <>
                                                {!user.isChangeStatusMode ?
                                                    <div
                                                        onClick={() => {
                                                            this.setState({ prevStatusModeChange: user.username });
                                                            this.props.changeStatusMode(this.state.prevStatusModeChange);
                                                            this.props.changeStatusMode(user.username);
                                                            this.props.history.push('/admin');
                                                        }}
                                                    >Đổi quyền</div>
                                                    :
                                                    <div >
                                                        <p
                                                            className='accept-role-btn'
                                                            style={{ 'background': '#e74c3c', 'color': 'white' }}
                                                            onClick={() => { this.submitRole(user.username) }}>
                                                            Xác nhận đổi quyền
                                                        </p>
                                                    </div>
                                                }
                                                {user.status ?
                                                    <div style={{ 'color': 'red' }}
                                                        onClick={() => { this.ban(user.username) }}
                                                    >Vô hiệu hóa tài khoản</div>
                                                    :
                                                    <div
                                                        onClick={() => { this.unban(user.username) }}
                                                    >Mở lại tài khoản</div>
                                                }
                                            </>
                                            :
                                            <>
                                                <div></div>
                                                <div></div>
                                            </>
                                        }
                                    </div>)
                            }
                            )
                            :
                            <div>
                                <div>Không tìm thấy người dùng nào</div>
                            </div>
                        :
                        <Loader
                            type="Oval"
                            color="black"
                            height={60}
                            width={60}
                            timeout={10000}
                        />
                    }

                </div>
                :
                <div id="users-details-table" className='users-details-container'>
                    <div className="header-table">
                        <div>Tên đầy đủ</div>
                        <div>Ngày sinh</div>
                        <div>Địa chỉ</div>
                        <div>Số điện thoại</div>
                        <div>Email</div>
                    </div>
                    {!this.props.getUserDetailsProcess.isLoading && this.props.userDetails !== null ?
                        <>
                            <div>
                                <div>{this.props.userDetails.fullname}</div>
                                <div>{this.props.userDetails.birthday}</div>
                                <div>{this.props.userDetails.address}</div>
                                <div>{this.props.userDetails.phone}</div>
                                <div>{this.props.userDetails.email}</div>
                            </div>
                            <div>
                                <div
                                    onClick={() => { this.setState({ userDetailMode: false }) }}
                                    className='back-btn-user-details'>
                                    <i class="fas fa-arrow-left"></i>&nbsp;quay lại
                                </div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </>
                        : <Loader
                            type="Oval"
                            color="black"
                            height={60}
                            width={60}
                            timeout={10000}
                        />
                    }

                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allUsers: state.allUsers,
        getAllUsersProcess: state.getAllUsers,
        userDetails: state.userDetails,
        getUserDetailsProcess: state.getUserDetails,
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllUsers: () => { dispatch(actions.getAllUsers()) },
        getUserDetails: (username) => { dispatch(actions.getUserDetails(username)) },
        changeAdminSubOpt: (opt) => { dispatch(actions.changeAdminSubOpt(opt)) },
        changeStatusMode: (username) => { dispatch(actions.changeStatusMode(username)) },
        banAccount: (username) => { dispatch(actions.banAccount(username)) },
        unbanAccount: (username) => { dispatch(actions.unbanAccount(username)) },
        changeUserRole: (payload) => { dispatch(actions.changeUserRole(payload)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserManager));