import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHandbag } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import { fAuth } from './confing/confing';

const Header = () => {
        // const [searchValue, setSearchValue] = useState('')

    const handleLogout = () => {
        fAuth.signOut()
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")

    }

    if (localStorage.getItem('localCart')) {
        var {totalQty } = JSON.parse(localStorage.getItem('localCart'));
    } 
        const userName = JSON.parse(localStorage.getItem('userName'))
    const getSearchData=(e)=>{
        if (e.charCode === 13) {
        const searchValue =  e.target.value
        // setSearchValue(searchValue)
        window.open(`/products/?q=${searchValue}`, '_self')
        }
    }
    
        
   


    return (
        <div className="mainHeader row">
            <div className="logo-container">
                <a href="/" className="logo-anchor"><i></i></a>
            </div>
            <div className="search-box">
                <input type="search" name="search" className="search-input" onKeyPress={getSearchData} placeholder="Search by product tag" />
                <img src="../images/search-icon.png" alt="search-logo" className='search-icon' />
            </div>
            <Link to='/wishlist' className='headerWishList'>
                <AiOutlineHeart />
                <span>Wishlist</span>
            </Link>
            <Link to="/checkout/cart" className='headerAddToBag'>
                <BsHandbag className='productBag' />
                <span className='no-of-products'>{totalQty == 0 ? null :totalQty}</span>
                <span className='bagTitle'>Bag</span>
            </Link>
            {!userName && <div className='rightside'>
                <span><Link to="/singup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="/login" className='navlink'>LOGIN</Link></span>
            </div>}
            {userName && <div className='rightside'>
                <span><Link to="/user/account" className='navlink'>{userName}</Link></span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}

export default Header
