import React, { useState } from 'react'
import { Button, Col, Row, Toast } from 'react-bootstrap';


const ShowToast = (props) => {
    return (
        <Row>
            <Col lg={6}>
                <Toast onClose={() => props.onClose()} show={props.state} delay={3000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default ShowToast
