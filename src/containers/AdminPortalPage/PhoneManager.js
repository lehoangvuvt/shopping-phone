import React from 'react';
import { connect } from 'react-redux';
import AddPhone from './AddPhone';
import UpdatePhone from './UpdatePhone';
import './style/style.css';
import * as currencies from '../../utils/currencyFormat';
import * as actions from '../../action/index';
import Loader from 'react-loader-spinner';

class PhoneManager extends React.Component {
    constructor() {
        super();
        this.state = {
            addphoneMode: false,
            updatePhoneMode: false,
            ascendingModeName: true,
            ascendingModeMName: true,
            ascendingModePrice: true,
            ascendingModeQuantity: true,
        }
    }
    componentDidMount() {
        this.props.getAllPhones();
    }
    switchToAddPhonePage = () => {
        this.setState({ addphoneMode: true });
    }
    render() {
        return (
            !this.state.addphoneMode && !this.state.updatePhoneMode ?
                <>
                    <div id='phones-table' className='all-phones-container'>
                        <div className="header-table" >
                            <div>No</div>
                            <div>ID</div>
                            {this.state.ascendingModeName ?
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeName: false });
                                        this.props.sortByPhoneNameAZ();
                                    }}
                                >Tên điện thoại&nbsp;<i style={{ 'fontSize': '18px' }} class='fas fa-sort-alpha-down'></i></div>
                                :
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeName: true });
                                        this.props.sortByPhoneNameZA();
                                    }}
                                >Tên điện thoại&nbsp;<i style={{ 'fontSize': '18px' }} class='fas fa-sort-alpha-down-alt'></i></div>
                            }
                            {this.state.ascendingModeMName ?
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeMName: false });
                                        this.props.sortByMNameAZ();
                                    }}
                                >Nhà sản xuất&nbsp;<i style={{ 'fontSize': '18px' }} class='fas fa-sort-alpha-down'></i></div>
                                :
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeMName: true });
                                        this.props.sortByMNameZA();
                                    }}
                                >Nhà sản xuất&nbsp;<i style={{ 'fontSize': '18px' }} class='fas fa-sort-alpha-down-alt'></i></div>
                            }
                            {this.state.ascendingModeQuantity ?
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeQuantity: false });
                                        this.props.sortByQuantityAsc();
                                    }}
                                >Số lượng&nbsp;<i style={{ 'fontSize': '18px' }} class="fas fa-sort-numeric-down"></i></div>
                                :
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModeQuantity: true });
                                        this.props.sortByQuantityDes();
                                    }}
                                >Số lượng&nbsp;<i style={{ 'fontSize': '18px' }} class="fas fa-sort-numeric-down-alt"></i></div>
                            }
                            {this.state.ascendingModePrice ?
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModePrice: false });
                                        this.props.sortByPriceAsc();
                                    }}
                                >Giá&nbsp;<i style={{ 'fontSize': '18px' }} class="fas fa-sort-numeric-down"></i></div>
                                :
                                <div style={{ 'cursor': 'pointer' }}
                                    onClick={() => {
                                        this.setState({ ascendingModePrice: true });
                                        this.props.sortByPriceDes();
                                    }}
                                >Giá&nbsp;<i style={{ 'fontSize': '18px' }} class="fas fa-sort-numeric-down-alt"></i></div>
                            }
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        {
                            !this.props.getAllPhoneProcess.isLoading && this.props.allPhones !== null ?
                                this.props.allPhones.length > 0 ?
                                    this.props.allPhones.map((phone, i) => {
                                        return (
                                            <div style={{ 'opacity': phone.status ? '1' : '0.6' }}>
                                                <div>{i + 1}</div>
                                                <div>{phone.productID}</div>
                                                <div>{phone.phoneName}</div>
                                                <div>{phone.manufactor}</div>
                                                <div>{phone.quantity} (cái)</div>
                                                <div>{currencies.vietnamCurrency(phone.price)}</div>
                                                <div><img src={phone.imageURL} /></div>
                                                <div
                                                    onClick={() => {
                                                        this.props.getPhoneDetails(phone.productID);
                                                        this.setState({
                                                            phoneDetails: {
                                                                productID: phone.productID,
                                                                phoneName: phone.phoneName,
                                                                manufactor: phone.manufactor,
                                                                quantity: phone.quantity,
                                                                imageURL: phone.imageURL,
                                                                imageName: phone.imageName,
                                                                price: phone.price,
                                                                year: phone.year,
                                                                description: phone.description,
                                                            },
                                                            updatePhoneMode: true
                                                        });
                                                    }}
                                                >Chỉnh sửa</div>
                                                {phone.status ?
                                                    <div
                                                        onClick={() => { this.props.inactivePhone(phone.productID) }}
                                                    ><i class="fas fa-eye-slash"></i></div>
                                                    :
                                                    <div
                                                        onClick={() => { this.props.activePhone(phone.productID) }}
                                                    ><i class="fas fa-eye"></i></div>
                                                }
                                            </div>)
                                    }
                                    )
                                    :
                                    <div>
                                        <div>Không tìm thấy điện thoại nào</div>
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
                    <div
                        onClick={() => { this.switchToAddPhonePage() }}
                        className='add-phone-btn'>Thêm sản phẩm mới&nbsp;<i class="fas fa-plus"></i></div>
                </>
                :
                this.state.addphoneMode && !this.state.updatePhoneMode ?
                    <>
                        <button
                            onClick={() => {
                                this.props.getAllPhones();
                                this.setState({ addphoneMode: false })
                            }}
                            className='back-to-all-phone-btn'><i class="fas fa-arrow-left"></i>&nbsp;quay lại</button>
                        <AddPhone />
                    </>
                    :
                    !this.state.addphoneMode && this.state.updatePhoneMode ?
                        <>
                            <button
                                onClick={() => {
                                    this.props.getAllPhones();
                                    this.setState({ updatePhoneMode: false })
                                }}
                                className='back-to-all-phone-btn'><i class="fas fa-arrow-left"></i>&nbsp;quay lại</button>
                            <UpdatePhone phoneDetails={this.state.phoneDetails} />
                        </>
                        :
                        null
        )
    }
}

function mapStateToProps(state) {
    return {
        allPhones: state.allPhones,
        getAllPhoneProcess: state.getAllPhones,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPhoneDetails: (phoneID) => { dispatch(actions.getPhoneDetails(phoneID)) },
        getAllPhones: () => { dispatch(actions.getAllPhones()) },
        sortByPhoneNameAZ: () => { dispatch(actions.sortByPhoneNameAZ()) },
        sortByPhoneNameZA: () => { dispatch(actions.sortByPhoneNameZA()) },
        sortByMNameAZ: () => { dispatch(actions.sortByMNameAZ()) },
        sortByMNameZA: () => { dispatch(actions.sortByMNameZA()) },
        sortByPriceAsc: () => { dispatch(actions.sortByPriceAsc()) },
        sortByPriceDes: () => { dispatch(actions.sortByPriceDes()) },
        sortByQuantityAsc: () => { dispatch(actions.sortByQuantityAsc()) },
        sortByQuantityDes: () => { dispatch(actions.sortByQuantityDes()) },
        inactivePhone: (productID) => { dispatch(actions.inactivePhone(productID)) },
        activePhone: (productID) => { dispatch(actions.activePhone(productID)) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneManager);