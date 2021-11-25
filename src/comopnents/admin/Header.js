import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <div className="header">
            <div className="heading">
                {props.heading}
            </div>
            {props.action && <Button variant="outline-success">
                <Link to={props.action.url}>{props.action.title}</Link>
            </Button>}
        </div>
    )
}

export default Header
