import React from 'react'
import { Link } from 'react-router-dom'
import Allcampus from './Allcampus';
import AllStudent from './AllStudent';
const Navbar = () => (
	<nav className="navbar navbar-light bg-faded">
		<form className="form-inline">
			<Link to='/campus'><button className="btn btn-outline-success" type="button">Campus</button></Link>
			<Link to='/student'> <button className="btn btn-outline-success" type="button">Student</button></Link>
		</form>
	</nav>
)

export default Navbar;