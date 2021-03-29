import React from 'react';
import { connect } from 'react-redux';
import * as currencies from '../../utils/currencyFormat';
import * as actions from '../../action/index';

class Overview extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        this.props.getTopOrderPhones();
    }
    render() {
        return (
            <div id='overview-container'>
                <div></div>
                <div>
                    <div>
                        Top điện thoại được đặt nhiều nhất
                    </div>
                    <div>
                        {this.props.topOrderPhones.length > 0 ?
                            this.props.topOrderPhones.slice(0, 5).map((phone, i) =>
                                <div>
                                    <div>
                                        {i + 1}
                                    </div>
                                    <div>
                                        {phone.phoneName}
                                    </div>
                                    <div>
                                        {phone.quantity} sản phẩm được đặt
                                    </div>
                                </div>
                            )
                            :
                            null
                        }
                    </div>
                </div>

                <div></div>
                <div></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        topOrderPhones: state.topOrderPhones,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopOrderPhones: () => { dispatch(actions.getTopOrderPhones()) },
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);