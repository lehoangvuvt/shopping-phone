import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../action/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: 'xxx',
            phone: 'xxx',
        }
    }
    componentWillMount() {
        if (!this.props.user) {
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        const placingInfo = this.props.placingOrderInformation;
        this.setState({
            address: this.props.user.address ? this.props.user.address : ' ',
            phone: this.props.user.phone ? this.props.user.phone : ' ',
        });
        this.props.inputInformation({ fieldName: 'address', value: this.props.user.address });
        this.props.inputInformation({ fieldName: 'phone', value: this.props.user.phone });
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        if (name === "address") {
            if (value.length === 0 || value.trim() === "") {
                this.props.inputInformation({ fieldName: e.target.name, value: null });
            } else {
                this.props.inputInformation({ fieldName: e.target.name, value: e.target.value });
            }
        }
        if (name === "phone") {
            if (/^\d+$/.test(value) === false) {
                this.props.inputInformation({ fieldName: e.target.name, value: null });
            } else {
                this.props.inputInformation({ fieldName: e.target.name, value: e.target.value });
            }
        }
        e.preventDefault();
    }
    handleAddressError = () => {
        if (this.state.address.length === 0 || this.state.address.trim() === "") {
            return true;
        } else {
            return false;
        }
    }
    handlePhoneError = () => {
        if (this.state.phone.length === 0 || this.state.phone.trim() === "" || /^\d+$/.test(this.state.phone) === false) {
            return true;
        } else {
            return false;
        };
    }
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Th??ng tin giao h??ng
      </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="fullname"
                            name="fullname"
                            label="T??n ?????y ?????"
                            fullWidth
                            disabled
                            autoComplete="fullname"
                            value={this.props.user.fullname}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="phone"
                            name="phone"
                            label="S??? ??i???n tho???i li??n l???c"
                            error={this.handlePhoneError() ? true : false}
                            fullWidth
                            autoComplete="billing address-line2"
                            value={this.state.phone}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="?????a ch??? giao h??ng"
                            error={this.handleAddressError() ? true : false}
                            fullWidth
                            autoComplete="billing address-line2"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData,
        placingOrderInformation: state.placingOrderInformation,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inputInformation: (payload) => { dispatch(actions.inputOrderPlacingInformation(payload)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddressForm));