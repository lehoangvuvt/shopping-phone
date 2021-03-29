import React, { useEffect } from 'react';
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
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Menu from '../../components/Menu/Menu.js';
import Footer from '../../components/Footer/Footer.js';
import * as actions from '../../action/index';
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#df2029',
        '&:hover': {
            backgroundColor: '#df2029',
            color: 'white',
            filter: 'brightness(80%)'
        }
    },
}));

function SignUpPage(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repassword, setRepassword] = React.useState("");
    const [fullname, setFullname] = React.useState("");

    useEffect(() => {
        if (props.user) {
            props.history.push('/');
        };
    });
    const register = () => {
        let formatUsername = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        let formatEmail = /\S+@\S+\.\S+/;
        let bool = true;
        if (username.includes(' ') || username === '' || formatUsername.test(username)) {
            alert('Tên đăng nhập không thể có khoảng trống hoắc ký tự đặc biệt');
            bool = false;
        }
        if (password.length < 5) {
            alert('Mật khẩu không được dưới 5 ký tự');
            bool = false;
        };
        if (repassword !== password) {
            alert('Mật khẩu và nhập lại mật khảu không trùng nhau');
            bool = false;
        };
        if (fullname === "" || fullname.trim() === " ") {
            alert("Tên đầy đủ ko được rỗng");
            bool = false;
        }
        if (bool) {
            props.signUp({ username: username, password: password, fullname: fullname });
            alert('Đăng ký thành công');
            props.history.push('/login');
        };

    }
    return (
        <>
            <div className='login-page-container'>
                <Menu />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <i class="fas fa-won-sign"></i>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Ký
          </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        style={{width:'100%'}}
                                        id="username"
                                        label="Tên tài khoản"
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        name="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={fullname}
                                        onChange={(e) => { setFullname(e.target.value) }}
                                        variant="outlined"
                                        required
                                        style={{width:'100%'}}
                                        id="fullname"
                                        label="Tên đầy đủ"
                                        name="fullname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        style={{width:'100%'}}
                                        name="password"
                                        label="Mật khẩu"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        style={{width:'100%'}}
                                        name="repassword"
                                        onChange={(e) => { setRepassword(e.target.value) }}
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        id="repassword"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => { register() }}
                            >
                                Đăng Ký
            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Đăng nhập tại đây nếu bạn đã có tài khoản
                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.userData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (payload) => { dispatch(actions.signUp(payload)) },
        dispatch,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage));