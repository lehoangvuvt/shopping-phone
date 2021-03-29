import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import { withRouter } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'

class PhoneManufacturer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getManufacturer();
    }
    render() {
        let manufacturers = null;
        if (this.props.manufacturers && this.props.manufacturers.length > 0) {
            manufacturers = this.props.manufacturers.map((i, n) => {
                return (
                    <div
                        onClick={() => {
                            this.props.history.push(`/manufacturer/${i.name.toLowerCase()}`);
                        }}
                        style={{ 'background': `url("${i.img}")` }}>
                        <h1>{i.name}</h1>
                    </div>
                )
            })
        };
        return (
            <div className="phone-manufacturer-container">
                {
                    (!this.props.loading && this.props.manufacturers) ?
                        <div className="phone-manufacturer-title">
                            Hãng điện thoại
                        </div> : null
                }
                <div className="phone-manufacturer">
                    {(this.props.loading && !this.props.manufacturers) ?
                        <Loader
                            type="ThreeDots"
                            color="black"
                            height={30}
                            width={30}
                            timeout={10000}
                        />
                        :
                        manufacturers
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        manufacturers: state.getManufacturer.manufacturers,
        loading: state.getManufacturer.loading,
        error: state.getManufacturer.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getManufacturer: () => dispatch(actions.getManufacturer()),
        dispatch
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhoneManufacturer));