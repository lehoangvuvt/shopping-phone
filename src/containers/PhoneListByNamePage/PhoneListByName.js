import React from 'react';
import './style/style.css';
import Menu from '../../components/Menu/Menu.js';
import Footer from '../../components/Footer/Footer.js';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../action/index';
import Slider from '@material-ui/core/Slider';
import * as currencies from '../../utils/currencyFormat';
import Loader from 'react-loader-spinner';


class PhoneListByName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startIndex: 0,
            endIndex: 12,
            manufacturerFilterList: [],
            filterManuToggle: false,
            priceRange: [0, 0],
        }
    }
    componentDidMount() {


        const pName = this.props.location.pathname.split('=')[1];
        if (pName === '*') {
            this.props.getAllPhoneList();
            this.props.getAllManufacturer();
            this.props.getTop1Price();
        } else {
            this.props.getPhoneListByName(pName);
        }
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
    selectManufacturer = (i) => {
        this.setState({ filterManuToggle: true });
        let bool = false;
        this.state.manufacturerFilterList.forEach(m => {
            if (m === i) {
                bool = true;
            };
        })
        if (!bool) {
            this.setState({
                manufacturerFilterList: [...this.state.manufacturerFilterList, i]
            });
        } else {
            this.setState({
                manufacturerFilterList: this.state.manufacturerFilterList.filter(m => m !== i),
            });
        }
        setTimeout(() => {
            if (this.state.manufacturerFilterList.length > 0) {
                this.props.filterByManufacturerAllSearch(this.state.manufacturerFilterList);
            } else {
                if (this.props.priceRange.length === 0) {
                    this.setState({ filterManuToggle: false });
                } else {
                    this.props.filterByPrice({ priceRange: this.state.priceRange });
                }
            }
        }, 100);
    }
    handlePriceChange = (event, newValue) => {
        this.setState({ priceRange: newValue });
    };
    filterByPrice = () => {
        this.setState({ filterManuToggle: true });
        const priceRange = this.state.priceRange;
        this.props.filterByPrice({ priceRange: priceRange });
    }
    render() {
        return (
            this.props.location.pathname.split('=')[1] !== '*' ?
                <>
                    <div className="phone-list-by-m-container">
                        <Menu />
                        <div className="dir-des">
                            <i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;Điện thoại&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;Tìm kiếm theo tên&nbsp;&nbsp;"{this.props.location.pathname.split('=')[1]}" ({this.props.phoneListByName !== null ? this.props.phoneListByName.length : 0} sản phẩm)
                    </div>
                        <div className="phone-list-by-m-holder">
                            {
                                !this.props.getPhoneListByNameProcess.isLoading && this.props.phoneListByName !== null ?
                                    this.props.phoneListByName.length > 0 ?
                                        this.props.phoneListByName.slice(this.state.startIndex, this.state.endIndex).map(phone =>
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
                                            <h2 className="not-found-txt">Xin lỗi. Cửa hàng chúng tôi hiện thời không có sản phẩm nào có tên hợp với mô tả "{this.props.location.pathname.split('=')[1]}"</h2>
                                        </>
                                    :
                                    <>
                                        <Loader
                                            type="ThreeDots"
                                            color="black"
                                            height={40}
                                            width={40}
                                            timeout={10000}
                                        />
                                    </>
                            }
                        </div>
                        {this.props.phoneListByName && this.props.phoneListByName.length > 0 ?
                            <div className="button-page-phone-list-by-m">
                                <button
                                    disabled={this.state.startIndex === 0 ? true : false}
                                    className={this.state.startIndex === 0 ? "disabled-btn" : null}
                                    onClick={() => { this.prevPage(); }}
                                >trang trước</button>
                                <button
                                    disabled={this.state.startIndex + 12 >= this.props.phoneListByName.length ? true : false}
                                    className={this.state.startIndex + 12 >= this.props.phoneListByName.length ? "disabled-btn" : null}
                                    onClick={() => { this.nextPage(); }}
                                >trang sau</button>
                            </div>
                            : null
                        }
                    </div>
                    <Footer />
                </>
                :
                <>
                    <div className="phone-list-by-m-container">
                        <Menu />
                        <div className="dir-des">
                            <i class="fas fa-mobile-alt"></i>&nbsp;&nbsp;Điện thoại&nbsp;&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;&nbsp;Tìm kiếm theo tên&nbsp;&nbsp;"{this.props.location.pathname.split('=')[1]}" ({this.props.allPhones !== null ? this.props.allPhones.length : 0} sản phẩm)
                    </div>
                        <div className='filter-panel'>
                            <div>
                                <div>Lọc theo thương hiệu </div>
                                <div>
                                    {!this.props.getAllManufacturerProcess.isLoading && this.props.allManufacturer !== null ?
                                        this.props.allManufacturer.length > 0 ?
                                            this.props.allManufacturer.map(i =>
                                                <div>
                                                    <Checkbox
                                                        style={{ color: 'red' }}
                                                        size='small'
                                                        onClick={() => { this.selectManufacturer(i.name) }}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />&nbsp;{i.name}&nbsp;({i.count} sản phẩm)
                                                </div>
                                            )
                                            :
                                            null
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            {!this.props.getTop1PriceProcess.isLoading && this.props.top1Price !== 0 ?
                                <>
                                    < div >
                                        <div>Lọc theo giá </div>
                                        <div>
                                            <div>
                                                <Slider
                                                    style={{ color: 'red' }}
                                                    max={this.props.top1Price}
                                                    value={this.state.priceRange}
                                                    onChange={this.handlePriceChange}
                                                    valueLabelDisplay="off"
                                                    aria-labelledby="range-slider"
                                                    step={1000000}

                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                từ
                                        </div>
                                            <div>
                                                {currencies.vietnamCurrency(this.state.priceRange[0])}
                                            </div>
                                            <div>
                                                đến
                                        </div>
                                            <div>
                                                {currencies.vietnamCurrency(this.state.priceRange[1])}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => { this.filterByPrice() }}>Lọc</button>
                                    </div>
                                </>
                                : null
                            }
                        </div>

                        <div className="phone-list-by-m-holder">
                            {
                                !this.state.filterManuToggle ?
                                    !this.props.getPhoneListByNameProcess.isLoading && this.props.allPhones !== null ?
                                        this.props.allPhones.length > 0 ?
                                            this.props.allPhones.slice(this.state.startIndex, this.state.endIndex).map(phone =>
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
                                                <h2 className="not-found-txt">Xin lỗi. Cửa hàng chúng tôi hiện thời không có sản phẩm nào có tên hợp với mô tả "{this.props.location.pathname.split('=')[1]}"</h2>
                                            </>
                                        :
                                        <>
                                            <Loader
                                                type="ThreeDots"
                                                color="black"
                                                height={40}
                                                width={40}
                                                timeout={10000}
                                            />
                                        </>
                                    :
                                    this.props.filterByManufacturerAllSearchState !== null ?
                                        this.props.filterByManufacturerAllSearchState.length > 0 ?
                                            this.props.filterByManufacturerAllSearchState.slice(this.state.startIndex, this.state.endIndex).map(phone =>
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
                                                <h2 className="not-found-txt">Xin lỗi. Cửa hàng chúng tôi hiện thời không có sản phẩm nào có tên hợp với mô tả "{this.props.location.pathname.split('=')[1]}"</h2>
                                            </>
                                        :
                                        <>
                                            <Loader
                                                type="ThreeDots"
                                                color="black"
                                                height={40}
                                                width={40}
                                                timeout={10000}
                                            />
                                        </>
                            }
                        </div>
                        {
                            !this.state.filterManuToggle?
                                this.props.allPhones && this.props.allPhones.length > 0 ?
                                    <div className="button-page-phone-list-by-m">
                                        <button
                                            disabled={this.state.startIndex === 0 ? true : false}
                                            className={this.state.startIndex === 0 ? "disabled-btn" : null}
                                            onClick={() => { this.prevPage(); }}
                                        >trang trước</button>
                                        <button
                                            disabled={this.state.startIndex + 12 >= this.props.allPhones.length ? true : false}
                                            className={this.state.startIndex + 12 >= this.props.allPhones.length ? "disabled-btn" : null}
                                            onClick={() => { this.nextPage(); }}
                                        >trang sau</button>
                                    </div>
                                    : null
                                :
                                this.props.filterByManufacturerAllSearchState !== null && this.props.allPhones.length > 0 ?
                                    <div className="button-page-phone-list-by-m">
                                        <button
                                            disabled={this.state.startIndex === 0 ? true : false}
                                            className={this.state.startIndex === 0 ? "disabled-btn" : null}
                                            onClick={() => { this.prevPage(); }}
                                        >trang trước</button>
                                        <button
                                            disabled={this.state.startIndex + 12 >= this.props.allPhones.length ? true : false}
                                            className={this.state.startIndex + 12 >= this.props.allPhones.length ? "disabled-btn" : null}
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
        getPhoneListByName: (name) => { dispatch(actions.getPhoneListByName(name)) },
        getAllPhoneList: () => { dispatch(actions.getAllPhoneList()) },
        getAllManufacturer: () => { dispatch(actions.getAllManufacturer()) },
        filterByManufacturerAllSearch: (payload) => { dispatch(actions.filterByManufacturerAllSearch(payload)) },
        getTop1Price: () => { dispatch(actions.getTop1Price()) },
        filterByPrice: (payload) => { dispatch(actions.filterByPrice(payload)) },
        dispatch,
    }
}
function mapStateToProps(state) {
    return {
        phoneListByName: state.phoneListByName,
        allPhones: state.allPhones,
        allManufacturer: state.allManufacturer,
        getAllManufacturerProcess: state.getAllManufacturer,
        getPhoneListByNameProcess: state.getPhoneListByName,
        filterByManufacturerAllSearchState: state.filterByManufacturerAllSearch,
        top1Price: state.top1Price,
        priceRange: state.priceRange,
        getTop1PriceProcess: state.getTop1Price,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneListByName));