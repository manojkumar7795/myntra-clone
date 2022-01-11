import React, { useState } from 'react'
import { Button, Col, Row, Toast } from 'react-bootstrap';


const toast = {};

const MToast = () => {

    const [toastState, setToastState] = useState({
        visible: false,
        title: '',
        description: '',
        type: ''
    });

    toast.success = (title, description) => {
        setToastState(() => {
            return {
                visible: true,
                type: 'success',
                title: title,
                description: description
            }
        });
    }

    toast.error = (title, description) => {
        setToastState(() => {
            return {
                visible: true,
                type: 'danger',
                title: title,
                description: description
            }
        });
    }

    return (
        <Row>
            <Col lg={6} className='showToast'>
                <Toast show={toastState.visible} delay={3000} autohide bg={toastState.type} onClose={() => setToastState({ visible: false })}>
                    <Toast.Header>
                        <strong className="me-auto">{toastState.title}</strong>
                    </Toast.Header>
                    <Toast.Body>{toastState.description}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

export { MToast, toast };
