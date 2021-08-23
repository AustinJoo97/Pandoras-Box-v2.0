import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { HiSearch, HiUser, HiOutlineCake } from "react-icons/hi"
import { GiBoxTrap } from "react-icons/gi"
import Dropdown from 'react-bootstrap/Dropdown'


// utils
import Auth from '../../utils/auth';
import '../../styles/Header.css';


const Header = () => {
  const [searchVal, setSearch] = useState('');

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  // IF user types in a search, then when they click the search button, it will set search value and type within link redirect
  // IF user clicks genre, then it will set link to redirect to "/search/q="genreName"&type="genre".


  return (
    <header className="p-3 mb-5 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start row">

          {/* Site Logo */}
          <a href="/" id="logo" className="d-flex align-items-center mb-2 mb-lg-0 text-grey text-decoration-none col-5">
            <GiBoxTrap className="display-2"></GiBoxTrap>
            <h3 className="display-4 ">Pandoras Box</h3>
          </a>

          {/* search */}
          <div className="col-6">
            <div className="search-bar">
              {/* genre drop down menu */}
              <Dropdown className="">
                <Dropdown.Toggle variant="" id="dropdown-basic" className="menu-trigger bg-lightblue">
                  Search by Categories
                </Dropdown.Toggle>


                {/* will ideally be populated via api call and map */}
                <Dropdown.Menu>
                  <Dropdown.Item href={`/search?q=techno&type=albums`}>Techno</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=country&type=albums`}>Country</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=hip-hop&type=albums`}>Hip-Hop</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=rap&type=albums`}>Rap</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=folk&type=albums`}>Folk</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=classical&type=albums`}>Classical</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=world&type=albums`}>World</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=metal&type=albums`}>Metal</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=new-wave&type=albums`}>New wave</Dropdown.Item>
                  <Dropdown.Item href={`/search?q=dubstep&type=albums`}>Dubstep</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>



              {/* search bar, sets state = our search value */}
              <form className="col-6">
                <input type="search" className="form-control" placeholder="Search by Artist" aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                ></input>

              </form>

              {/* search button, takes state and constructs our params */}
                <Link
                  className="col-1"
                  to={`/search?q=${searchVal}&type=artists`}>
                  <HiSearch />
                </Link>
            </div>
          </div>

          {/* profile drop down menu */}
          {Auth.loggedIn() ? (
            <>
              <Dropdown className="col-1">
                <Dropdown.Toggle variant="" id="dropdown-basic" className="menu-trigger bg-lightblue">
                  <HiOutlineCake />
                  {Auth.getProfile().data.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/me">{Auth.getProfile().data.username}'s profile</Dropdown.Item>
                  <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={logout}> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Dropdown className="col-1">
                <Dropdown.Toggle variant="" id="dropdown-basic" className="menu-trigger bg-lightblue">
                  <HiUser />
                  Log-in
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                  <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
