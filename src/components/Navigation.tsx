import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

type NavigationProps = {
    isLoggedIn: boolean,
    handleClick: ()=>void
}

export default function Navigation({ isLoggedIn, handleClick }:NavigationProps) {

    return (
        <Navbar bg='success' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>React Blog</Navbar.Brand>
                <Nav className='me-auto'>
                    { isLoggedIn ? (
                        <>
                            <Nav.Link as={Link} to='/'>Create Post</Nav.Link>
                            <Nav.Link as='button' onClick={handleClick}>Log Out</Nav.Link>
                        </>
                    ):(
                        <>
                        <Nav.Link as={Link} to='/register' >Sign Up</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                        
                        </>

                    )}
                </Nav>
            </Container>
        </Navbar>
        
    )
}