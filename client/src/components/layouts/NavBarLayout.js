import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, NavDropdown, Container, InputGroup, FormControl, Form, Button, Col, Row, Tooltip, OverlayTrigger, Badge } from 'react-bootstrap'
import Signup from '../auth/Signup'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const NavBarLayout = props => {
  const [showModal, setShowModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [cartItems, setCartItems] = useState()
  const [searchParameter, setSearchParameter] = useState()
  const [search, setSearch] = useState(false)


  toast.configure()

  useEffect(async () => {
    const user = await axios.post(constants.uri + "/users/auth")
    if (user.data) {
      //LoggedIN
      setLoggedIn(true)
      const { data } = await axios.post(constants.uri + "/order/cart-items", { userId: user.data.id })
      if (data) {
        setCartItems(data.length)
        window.localStorage.setItem('cart', data.length)
      }
    } else {
      setLoggedIn(false)
    }
  }, [])

  useEffect(async () => {
    const user = await axios.post(constants.uri + "/users/auth")
    const { data } = await axios.post(constants.uri + "/order/cart-items", { userId: user.data.id })
    if (data) {
      setCartItems(data.length)
    }
  }, [window.localStorage.getItem('cart')])

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.setItem("userdetails", "")
    setLoggedIn(false)
    window.location.reload(false)
    toast.success("Logged Out")
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    console.log(searchParameter)
    setSearch(true)
  }

  if (search) {
    return <Navigate to={`/products/${searchParameter}`} />
    
  }

  return (
    <Fragment>
      <Navbar style={{backgroundColor:"#FDEBD2"}}  variant="dark" expand="lg">
        <Container fluid>

          <Col sm={1}></Col>

          <Col sm={3}>
            <Navbar.Brand href="#"><Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}
            ><span style={{fontStyle: 'Arial', fontSize: 28, fontWeight: 'bold' }}>ETSY 🛍</span></Link></Navbar.Brand>
          </Col>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Col sm={6}>
              <Form className="d-flex" style={{ width: "100%" }}>
                <FormControl
                  type="search"
                  variant="outline-secondary"
                  placeholder="Search for anything here."
                  className="me-1 rounded"
                  aria-label="Search"
                  name="searchParameter"
                  value={searchParameter}
                  onChange={(e) => setSearchParameter(e.target.value)}
                />
                <Button variant="outline-secondary" className='rounded' onClick={(e) => searchSubmit(e)}> <i class="fa fa-search" aria-hidden="true"></i></Button>
              </Form>
            </Col>

            


            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              {loggedIn && (
                <>
                  <Nav.Link><Link to="/profile" >
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Favorites</Tooltip>}>
                      <i class="fa fa-heart-o"  style={{ color: 'red', fontSize: '30px' }} aria-hidden="true"></i>
                    </OverlayTrigger>
                  </Link></Nav.Link>

                  <Nav.Link></Nav.Link>


                  <Nav.Link>
                    <Link to="/shop">
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Start Selling on ETSY!</Tooltip>}>
                        <i class="fa fa-home" style={{ color: 'black', fontSize: '30px' }} aria-hidden="true"></i>
                      </OverlayTrigger>
                    </Link>
                  </Nav.Link>

                  <Nav.Link></Nav.Link>

                  <NavDropdown title={(<i class="fa fa-user-circle" style={{fontSize: '30px', color: 'black'}}aria-hidden="true"></i>)} id="basic-nav-dropdown">
                    <NavDropdown.Item ><Link to="/shop/myShops" style={{ textDecoration: 'none', color: 'black' }}><span>My Shops</span></Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/myOrders" style={{ textDecoration: 'none', color: 'black' }}><span>My Purchases</span></Link></NavDropdown.Item>
                    <NavDropdown.Item ><Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}><span>My Profile</span></Link></NavDropdown.Item>
                    
                    
                  </NavDropdown>

                  <Nav.Link></Nav.Link>

                  <Nav.Link>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'black', fontSize:'25px' }}>
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i><Badge style={{
                        fontSize: 12,
                        backgroundColor: '#ff0000', color: '#fff', paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5, verticalAlign: 'top', marginLeft: '-5px'
                      }} pill bg="success">{cartItems}</Badge>

                    </Link>

                  </Nav.Link>
                </>
              )}

            </Nav>
            {!loggedIn && (
              <Button variant="primary" onClick={() => setShowModal(true)}>Sign-in 🔒</Button>
            )}

            {loggedIn && (
              <Button variant="primary" onClick={(e) => logout(e)}>Logout ❗️</Button>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        showModal && (
          <Signup
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )
      }
    </Fragment >

  )
}

NavBarLayout.propTypes = {}

export default NavBarLayout