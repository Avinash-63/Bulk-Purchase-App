import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        type: 0
    }
  }
    logOut(e){
        e.preventDefault();
        localStorage.setItem('usertoken','');
        localStorage.setItem('usermode','');
        localStorage.setItem('username','');
        localStorage.setItem('customertoken','');
      localStorage.setItem('usermode','');
      
        this.setState({type:0});
        this.props.history.push('/');
    }
    clogOut(e){
      e.preventDefault();
      localStorage.setItem('customertoken','');
      localStorage.setItem('usermode','');
      this.setState({type:0});
      this.props.history.push('/');
  }
  customer(e){
    e.preventDefault();
    if(this.state.type==0){
    this.setState({type:1});
    }
    localStorage.setItem('usermode','customer');
}
vendor(e){
    e.preventDefault();
    if(this.state.type==0){
    this.setState({type:2});
    }
    localStorage.setItem('usermode','vendor');
}
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isopen: false
    //     }
    //     this.toggle = this.toggle.bind(this);
    // }

    // toggle() {
    //     this.setState({
    //         isopen: !this.state.isopen
    //     });
    // }

//     render() {
//         return(
//             <div>
//             <Navbar color="dark">
//                 <Container>
//                     <NavbarBrand href="/">Home</NavbarBrand>
//                     <NavbarToggler onClick={this.toggle}/>
//                     <Collapse isOpen={this.state.isopen} navbar>
//                         <Nav className="ml-auto" navbar>
//                             <NavItem>
//                                 <NavLink>open</NavLink>
//                                 <h3>jkl</h3>
//                             </NavItem>
//                         </Nav>
//                     </Collapse>
//                 </Container>
//             </Navbar>
//         </div>
//         )
//     }
// }

// export default AppNavbar;

render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/VendorLogin" className="nav-link">
            VLogin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/VendorRegister" className="nav-link">
            VRegister
          </Link>
        </li>
        {/* <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            VLogout
          </a>
        </li> */}
      </ul>
    )

    const loginRegLink1 = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/CustomerLogin" className="nav-link">
            CLogin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/CustomerRegister" className="nav-link">
            CRegister
          </Link>
        </li>
        {/* <li className="nav-item">
          <a href="" onClick={this.clogOut.bind(this)} className="nav-link">
            CLogout
          </a>
        </li> */}
      </ul>
    )
    // const userLink = (
    //   <ul className="navbar-nav">
    //     <li className="nav-item">
    //       <Link to="/profile" className="nav-link">
    //         User
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <a href="" onClick={this.logOut.bind(this)} className="nav-link">
    //         Logout
    //       </a>
    //     </li>
    //   </ul>
    // )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded" >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"

        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/Home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
            <a href="" onClick={this.logOut.bind(this)} className="nav-link">
               Logout
            </a>
            </li>
          </ul>
          {this.state.type===1 ? loginRegLink1 : null}
          {this.state.type===2 ? loginRegLink : null}
          {/* {localStorage.getItem('usermode')==='customer' ? loginRegLink1 : loginRegLink} */}
        </div>
        <div >
            <Button onClick={this.customer.bind(this)} > Customer </Button>  
            <Button onClick={this.vendor.bind(this)} > vendor </Button>  
        </div>
      </nav>
    )
  }
}

export default withRouter(AppNavbar);