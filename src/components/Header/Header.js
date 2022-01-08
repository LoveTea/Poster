import React from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const dispatch = useDispatch()
    const { isAuth, user } = useSelector((state) => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    Poster
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        {isAuth && (
                            <NavDropdown
                                title={user.email}
                                id='basic-nav-dropdown'
                            >
                                <NavDropdown.Item as={Link} to='/profile'>
                                    Профиль
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    as={Button}
                                    onClick={logoutHandler}
                                >
                                    Выйти
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
