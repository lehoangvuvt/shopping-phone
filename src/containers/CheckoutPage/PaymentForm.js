import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../../action/index';

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 'Thanh toán tại nhà (COD)',
        }
    }
    componentDidMount() {
        this.props.inputInformation({ fieldName: "paymentMethod", value: this.state.method });
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ method: value });
        setTimeout(() => {
            this.props.inputInformation({ fieldName: "paymentMethod", value: { value } });
        }, 10);
    }
    render() {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Phương thức thanh toán
      </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <select className="select-method-box" onChange={this.handleChange} value={this.state.method}>
                            <option value="Thanh toán tại nhà (COD)" nam>Thanh toán tại nhà (COD)</option>
                        </select>
                    </Grid>
                </Grid>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </React.Fragment >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        inputInformation: (payload) => { dispatch(actions.inputOrderPlacingInformation(payload)) },
        dispatch
    }
}

export default connect(null, mapDispatchToProps)(PaymentForm);