import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import * as currencies from '../../utils/currencyFormat';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
    { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Phương thức thanh toán', detail: 'Thanh toán tại nhà (COD)' },
    { name: 'Số điện thoại khách hàng', detail: '+84 949661867' },
];

const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
        fontSize: '20px',
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));


function Review(props) {

    const classes = useStyles();

    const getSelectedItemFromCart = () => {
        let items = [];
        props.cart.forEach(i => {
            if (i.isTicked) {
                items.push(i);
            }
        });
        return items;
    };
    const getTotalPrice = () => {
        let total = 0;
        props.cart.forEach(i => {
            if (i.isTicked) {
                total = total + (i.price * i.amount);
            };
        });
        return total;
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Tóm tăt đơn hàng
      </Typography>
            <List disablePadding>
                {getSelectedItemFromCart().map(product => (
                    <ListItem className={classes.listItem} key={product.id}>
                        <ListItemText primary={product.name} secondary={product.amount + ' × ' + currencies.vietnamCurrency(product.price)} />
                        <Typography variant="body2">{currencies.vietnamCurrency(product.price * product.amount)}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem} >
                    <ListItemText primary="Tổng cộng" />
                    <Typography className={classes.total} variant="subtitle1">
                        {currencies.vietnamCurrency(getTotalPrice())}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Địa chỉ giao hàng
          </Typography>
                    <Typography gutterBottom>{props.user.lastName} {props.user.firstName}</Typography>
                    <Typography gutterBottom>{props.placingInfo.address}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={12}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Thông tin thanh toán
          </Typography>
                    <Grid container>
                        <React.Fragment key={"method"}>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Phương thức thanh toán</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{props.placingInfo.paymentMethod}</Typography>
                            </Grid>
                        </React.Fragment>
                        <React.Fragment key={"phone"}>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Số điện thoại liên lạc</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{props.placingInfo.phone}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    return {
        cart: state.cartData,
        user: state.userData,
        placingInfo: state.placingOrderInformation,
    }
}

export default connect(mapStateToProps)(Review);