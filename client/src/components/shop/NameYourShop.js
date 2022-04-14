import axios from 'axios'
import React, { Fragment, useState } from 'react'
import { Button, InputGroup, Card, FormControl, Badge } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import constants from './../../utils/constants.json'

const NameYourShop = () => {
    const [name, setName] = useState("")
    const [nameAvailable, setNameAvailable] = useState(false)
    const [show,setShow] = useState(false)

    const [registered,setRegistered] = useState(false)

    const checkAvailability = async (e) => {
        e.preventDefault()
        setShow(true)
        const res = await axios.post(constants.uri+"/shop/check-availablity", { name })
        if (res.status === 200) {
            setNameAvailable(true)
        } else if (res.status === 201) {
            setNameAvailable(false)
        } else {
            setNameAvailable(false)
        }
    }

    const createNewShop = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(constants.uri+"/shop/add",{name})
            if(res.data){
                toast.dark("Registered your new shop")
                setRegistered(true)
            }
        } catch (error) {
            toast.dark("Sorry! Try registering agian")
        }
    }

    if(registered){
        return <Navigate to={`/shop/${name}/home`}/>
    }
    return (
        <Fragment>
            <div style={{ marginLeft: "15%", marginRight: "15%", marginTop: "10%" }}>
                <h3 style={{ textAlign: 'center' }}>Name your new Shop</h3>
                <h5 style={{ fontWeight: "lighter", textAlign: 'center' }}>Choose a beautiful name for your shop</h5>
            </div>
            <br />
            <Card>
                <Card.Body style={{ marginLeft: "15%", marginRight: "15%" }}>
                    <InputGroup >
                        <FormControl
                            placeholder="Enter your new shop name"
                            aria-label="name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2"><Button variant="secondary" onClick={(e) => checkAvailability(e)}>Check Availability</Button></InputGroup.Text>
                    </InputGroup>
                </Card.Body>
            </Card>
            <br />

            {nameAvailable && name && show && (
                <div style={{ marginLeft: "15%", marginRight: "15%", textAlign: 'center' }}>
                    <h3><Badge bg="success"><i class="fa fa-check" aria-hidden="true"></i>{' '} Name available to choose</Badge></h3><br />
                    <Button variant="outline-success" className='rounded' onClick={(e)=>createNewShop(e)}>Register your new Shop</Button>
                    {/* <Link to={`/shop/${name}/home`}><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Create your new Shop ?</span></Link> */}
                </div>
            )}

            {!nameAvailable && name && show && (
                <div style={{ marginLeft: "15%", marginRight: "15%", textAlign: 'center' }}>
                    <h3><Badge bg="danger"><i class="fa fa-face-pensive" aria-hidden="true"></i>{' '} Name already taken! Try Again.</Badge></h3><br />
                </div>
            )}


        </Fragment>
    )
}

export default NameYourShop