import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import * as actions from '../../action/index';
import Menu from '../../components/Menu/Menu.js';
import Footer from '../../components/Footer/Footer.js';
import './style/style.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#df2029',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        fontSize: '15px',
    },
    submit: {
        backgroundColor: '#df2029',
        margin: theme.spacing(3, 0, 2),
        '&:hover': {
            backgroundColor: '#df2029',
            color: 'white',
            filter: 'brightness(80%)'
        }
    },
}));

function LoginPage(props) {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        props.login(username, password);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        setUsername("");
        setPassword("");
        setTimeout(() => {
            if (props.userData) {
                props.history.push('/');
            }
        }, 10);

    };
    useEffect(() => {
        if (props.userData) {
            props.history.push('/');
        };
    });
    return (
        <>
            <div className='login-page-container'>
                <Menu />
                <Container component="main" maxWidth="xs" height='20%'>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar} maxWidth="xs">
                            <i class="fas fa-won-sign"></i>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Nhập
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{width:'100%'}}
                                id="username"
                                label="Tên tài khoản"
                                name="username"
                                value={username}
                                onChange={(e) => { setUsername(e.target.value) }}

                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                style={{width:'100%'}}  
                                value={password}
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                id="password"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => { login(); }}
                            >
                                Đăng nhập
                             </Button>
                            {props.loginInfo.error === 'Invalid username or password' ?
                                <h4 style={{ 'color': '#df2029', 'fontWeight': 'bold', 'fontSize': '1.1vw' }}>Sai tên tài khoản hoặc mật khẩu</h4>
                                : null
                            }
                            <Grid container>

                                <Grid item>
                                    <Link href="/register" variant="h8">
                                        {"Đăng ký tại đây nếu bạn không có tài khoản"}
                                    </Link>
                                </Grid>

                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                    </Box>
                </Container>
            </div>
            <Footer />
        </>
    );
}

function mapStateToProps(state) {
    return {
        loginInfo: state.login,
        userData: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => { dispatch(actions.login(username, password)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));