import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import Logo from '../../img/logo.png';
import Home from '../../img/home-32.png'
import Add from '../../img/round-add-button-32.png';
/*
import Tag from '../../img/tag-32.png';
import Favorit from '../../img/star-32.png';
import Cart from '../../img/shopping-cart-32.png';
*/
const Navbar = () =>{
    return (
        <div className='header'>
            <div className='headerLogo'>
                <Link to='/'> <img  id='logo'src={Logo} alt='logo'></img> </Link>
            </div>
            <nav className='sidebar'>
                <ul className='elemnts'>
                    <li><NavLink to='/'><img src={Home} alt='icon home' ></img></NavLink></li>
                    <li><NavLink to='/create'><img src={Add} alt='icon add' ></img></NavLink></li>
                    {/*<li><NavLink to='/tags'><img src={Tag} alt='icon tag'></img></NavLink></li>
                    <li><NavLink to='/'><img src={Favorit} alt='icon favorit'></img></NavLink></li>
                    <li><NavLink to='/'><img src={Cart} alt='icon cart'></img></NavLink></li>*/}
                </ul>
            </nav>
        </div>
    );      
}

export default Navbar;