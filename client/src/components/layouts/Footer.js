import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Modal, Button, Form } from 'react-bootstrap'
import country_currencies from './../utils/country_currencies.json'

const Footer = () => {

    const [showCountrySettings, setSHowCountrySettings] = useState(false)

    const [country,setCountry] = useState()
    const [currency,setCurrency] = useState()

    const changeCountryAndCurrency = () => {
        console.log(country)
        const cc = country_currencies.filter(item => item.country == country)
        const currency = cc[0].currency_code
        setCurrency(currency)
        window.localStorage.setItem("country_currency",[country,currency])
        setSHowCountrySettings(false)
        window.location.reload(false)
    }

    useEffect(()=>{
        const cc = window.localStorage.getItem("country_currency")
        console.log(cc)
        if(cc){
            setCountry(cc.split(',')[0])
            setCurrency(cc.split(',')[1])
        }
    },[])

    return (
        <Fragment >
            <Row style={{ margin: 0 }}>
                <Col sm={1}><a href="https://www.linkedin.com/in/sujanchikkela/"><i class="fa fa-linkedin-square" style={{fontSize: '30px'}} aria-hidden="true" ></i></a></Col>
                <Col sm={7}>
                    <Button className='rounded' onClick={() => setSHowCountrySettings(true)} variant='outline-primary'>{country} {'     '}| {'      '}({currency}) </Button>
                </Col>
                <Col sm={4}>Copyright © 2022 Etsy, Inc. All rights reserved.   </Col>
                
            </Row>

            <Modal show={showCountrySettings}
                onHide={() => setSHowCountrySettings(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Country Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select aria-label="Country" onChange={(e)=>setCountry(e.target.value)}>
                        {country_currencies.map(item => (
                            <option>{item.country}</option>
                        ))}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setSHowCountrySettings(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => changeCountryAndCurrency()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


        </Fragment>
    )
}

export default Footer