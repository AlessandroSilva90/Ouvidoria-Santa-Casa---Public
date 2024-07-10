import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import "./menu.css"

import logo from "../assets/logo1080.png"
import { useState } from 'react';
 


function Menu(props) {



  return (
    <Navbar  expand="lg"  fixed="top" className='navbar'>
          <img  style={{paddingLeft:'15px'}} src={logo} className="d-inline-block align-top imgsize"  alt="intervencao logo"
                  />
      <Container>
      <h1><b>OUVIDORIA SANTA CASA</b></h1>
                  
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { props.visible != true  ? 
            <Nav className="me-auto">
              {/* <Link to={'/refryer-app/'}>Cadastro</Link>
              <Link to={"/refryer-app/setores"}>Listagem por setor</Link> */}
                {/* <Nav.Link style={{color:'black'}} ><Link style={{color:"black"}} to={"/cadastro"}>Cadastro</Link></Nav.Link>
                <Nav.Link style={{color:'black'}} ><Link style={{color:"black"}} to={"/setores"}>Listagem por setor</Link></Nav.Link> */}
              </Nav>
              : ""
          }
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

    
  );
}

export default Menu;