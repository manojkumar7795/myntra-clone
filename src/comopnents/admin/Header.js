import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = (props) => {
    return (
        <div className="header">
            <div className="heading">
                {props.heading}
            </div>
            {props.action &&
                <Link to={props.action.url}><Button variant="outline-success">{props.action.title} </Button></Link>
            }
        </div>
    )
}

export default Header
