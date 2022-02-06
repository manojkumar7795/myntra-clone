import React from 'react'
import {  Col, Row, Toast } from 'react-bootstrap';




const MToast = (props) => {
    
    return (
        <Row>
            <Col lg={6} className='showToast'>
                <Toast show={props.data.visible} delay={3000} autohide bg={props.data.type} onClose={() => props.MToastCloseHandler({ visible: false })}>
                    <Toast.Header>
                        <strong className="me-auto">{props.data.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{props.data.description}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export default MToast;
