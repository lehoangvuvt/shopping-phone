import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Loader from 'react-loader-spinner';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import * as actions from '../../action/index';
import './style/style.css';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginTop: '80px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#df2029',
        '&:hover': {
            backgroundColor: '#df2029',
            color: 'white',
            filter: 'brightness(80%)'
        },
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    buttonBack: {
        color: 'back',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Th??ng tin giao h??ng', 'Ph????ng th???c thanh to??n', 'Xem l???i ????n h??ng'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

function Checkout(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [orderId, setOrderId] = React.useState("");


    const getSelectedItemFromCart = () => {
        let items = [];
        props.cart.forEach(i => {
            if (i.isTicked) {
                items.push(i);
            }
        });
        return items;
    };

    const getStepContent = (step) => {
        if (!props.user) {
            props.history.push('/');
        } else {
            switch (step) {
                case 0:
                    return <AddressForm />;
                case 1:
                    return <PaymentForm />;
                case 2:
                    return <Review />;
                default:
                    throw new Error('Unknown step');
            }
        }
    };
    const getCurrentDateString = () => {
        let dateString = "";
        const date = new Date();
        let month = 0;
        let day = 0;
        if ((date.getMonth() + 1) < 10) {
            month = "0" + (date.getMonth() + 1);
        } else {
            month = date.getMonth + 1;
        }
        if (date.getDate() < 10) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }
        return dateString = day + '/' + month + '/' + date.getFullYear();
    }
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const username = props.user.username;
            const phoneNumber = props.placingOrderInformation.phone;
            const address = props.placingOrderInformation.address;
            let items = [];
            getSelectedItemFromCart().forEach(item => {
                const itemToAdd = { productId: item.id, quantity: item.amount };
                items.push(itemToAdd);
            });
            props.addNewOrder({ username: username, phoneNumber: phoneNumber, address: address, items: items });
        }
        if (props.placingOrderInformation.address !== null && props.placingOrderInformation.phone !== null) {
            setActiveStep(activeStep + 1);
        } else {
            alert("Vui l??ng nh???p v??o c??c tr?????ng c??n thi???u ho???c b??? sai (b??o ?????)");
        }
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleBackToCartPage = () => {
        props.history.push('/cart');
    }
    useEffect(() => {
        if (!props.user || props.user === null) {
            props.history.push('/');
        }
    }, []);
    const goToOrderPage = () => {

        localStorage.setItem('prevPath', 'checkout');
        props.history.push('/profile');
    }
    return (
        <React.Fragment>
            <Menu />
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Th??ng tin giao h??ng v?? thanh to??n
                        </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            props.addNewOrderProcess.status !== null ?
                                props.addNewOrderProcess.status === 200 ?
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            ????n h??ng c???a qu?? kh??ch ???? ???????c ?????t th??nh c??ng.
                </Typography>
                                        <Typography variant="subtitle1">
                                            ???n v??o <span onClick={() => { goToOrderPage() }} style={{ 'color': '#2980b9 ', 'cursor': 'pointer', 'textDecoration': 'underline' }}>????y</span> ????? theo d??i ????n h??ng.
                </Typography>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            V?? c??ng xin l???i ph???i th??ng b??o qu?? kh??ch ???? th???t b???i trong vi???c ?????t ????n h??ng.
            </Typography>
                                        <Typography variant="subtitle1">
                                            ???n v??o <span onClick={() => { props.history.push('/') }} style={{ 'color': '#2980b9 ', 'cursor': 'pointer', 'textDecoration': 'underline' }}>????y</span> ????? quay l???i trang ch???.
            </Typography>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </React.Fragment>
                                :
                                <React.Fragment>
                                    <Loader
                                        type="Oval"
                                        color="black"
                                        height={60}
                                        width={60}
                                        timeout={10000}
                                    />
                                    <h3>??ang ti???n h??ng x??c nh???n ????n h??ng. Vui l??ng ?????i ch??t...</h3>
                                </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep == 0 && (
                                            <Button onClick={handleBackToCartPage} className={classes.buttonBack}>
                                                <i class="fas fa-angle-double-left"></i> &nbsp;Quay l???i gi??? h??ng
                                            </Button>
                                        )}
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.buttonBack}>
                                                <i class="fas fa-chevron-left"></i> &nbsp;Quay l???i
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Ch???p nh???n' : 'Ti???p theo'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
            <Footer />
        </React.Fragment>
    );
}


function mapStateToProps(state) {
    return {
        cart: state.cartData,
        user: state.userData,
        placingOrderInformation: state.placingOrderInformation,
        addNewOrderProcess: state.addNewOrder,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewOrder: (payload) => { dispatch(actions.addNewOrder(payload)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout)); 