
import React, { useEffect, useState } from 'react'
import { Button, Input, Link, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './Login.css'
import { setAlert } from '../actions/alert'
import { register, login, logout } from '../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from '../layout/alert';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    root: {
        '& > * + *': {
        marginLeft: theme.spacing(2),
        },
    },
    button: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    link: {
        textDecoration: 'none'
    }
}))

const Login = ({ setAlert, register, login, isAuthenticated, loading, logout }) => {
    const classes = useStyles();
    const [ open, setOpen ] = useState(false);
    const [ modalStyle ] = useState(getModalStyle);
    const [ openSignIn, setOpenSignIn ] = useState(false);
    const [ headerOpen, setHeaderOpen ] = useState(false);
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        const openHeader = () => {
            if (localStorage.token) {
                setHeaderOpen(true);
            } else {
                setHeaderOpen(false)
            }}
            openHeader()
    }, [headerOpen]);

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const signUp = async (event) => {
        event.preventDefault()
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, email, password })
        }
        setOpen(false)
    };

    const signIn = async (event) => {
        event.preventDefault()
        
        login(email, password)
        
        setOpenSignIn(false)
    };

    const changeModal = () => {
        if (open) {
            setOpen(false)
            setOpenSignIn(true)
        } else {
            setOpenSignIn(false)
            setOpen(true)
        }
    };

    return (
        <div className="login">
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="signup" onSubmit={(e) => signIn(e)}>
                        <Input 
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <Input 
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <Button type="submit">Sign In</Button>
                    </form>
                    <div className="swap">
                        Dont have an account? <br />
                        <Link to="#" onClick={changeModal}>
                        Sign Up
                        </Link>
                    </div>
                </div>
            </Modal>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="signup" onSubmit={(e) => signUp(e)}>
                        <Input 
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <Input 
                            placeholder="Email"
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                        />
                        <Input 
                            placeholder="Password"
                            type="password"
                            name='password'
                            value={password}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                            required
                        />
                        <Input 
                            placeholder="Confirm Password"
                            type="password"
                            name='password2'
                            value={password2}
                            onChange={(e) => onChange(e)}
                            minLength='6'
                            required
                        />
                        <Button type="submit">Sign Up</Button>
                    </form>
                    <div className="swap">
                        Already have an account? <br />
                        <Link to="#" onClick={changeModal}>
                        Sign In
                        </Link>
                    </div>
                </div>
            </Modal>

            <div className="appheader">
                <h1>Covid Tracking</h1>
                <Alert />
                {isAuthenticated ? (
                    <div>
                        <Link
                            href='/myaccount'
                            className={classes.link}
                        >
                            <Button variant="contained" className={classes.button}>My Account</Button>
                        </Link>
                        <Link
                            href='/'
                            className={classes.link}
                        >
                            <Button variant="contained" className={classes.button}  onClick={() => logout()} >Logout</Button>
                        </Link>
                    </div>
                ): (
                    <div>
                        <Button variant="contained" className={classes.button} onClick={() => setOpenSignIn(true)}>Sign In</Button>
                        <Button variant="contained" className={classes.button} onClick={() => setOpen(true)}>Sign Up</Button>
                    </div>
                )}
            </div>
        </div>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
})

export default connect(mapStateToProps, { setAlert, register, login, logout })(Login);