import React from 'react';
import { GiOfficeChair } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Box, Container, Row } from './FooterStyles';
import './Footer.css';

// import CompanyLogo from '../../assets/CompanyLogo';

function Footer() {
  return (
    <Box>
      <Container>
        <Row>
          {/* <FooterLink href="google.com">
            <CompanyLogo size="50px" />
          </FooterLink> */}
          <div className="icon-wrapper">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: 'grey' } : {};
              }}
              to="/seat"
            >
              <GiOfficeChair size="inherit" />
            </NavLink>
          </div>

          <div className="icon-wrapper">
            <NavLink
              style={({ isActive }) => {
                return isActive ? { color: 'grey' } : {};
              }}
              to="/eye"
            >
              <AiFillEye size="inherit" />
            </NavLink>
          </div>
        </Row>
      </Container>
    </Box>
  );
}
export default Footer;
