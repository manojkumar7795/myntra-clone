import React from 'react'

const Header = () => {
    return (
        <div className="header row">
            <div className="logo-container">
                <a href="/" className="logo-anchor"><i></i></a>
                
            </div>
            
            <div className="search-box">
                <input type="search" name="search" className="search-input" placeholder="Search for products, brands and more" />
                <img src="images/search-icon.png" alt="search-logo" className='search-icon' />
            </div>
        </div>
    )
}

export default Header
