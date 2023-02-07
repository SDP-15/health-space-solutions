import React from 'react';
import { GiOfficeChair } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import { Box, Container, Row, FooterLink } from './FooterStyles';

import CompanyLogo from '../../assets/CompanyLogo';

function Footer() {
  return (
    <Box>
      <Container>
        <Row>
          {/* <FooterLink href="google.com">
            <CompanyLogo size="50px" />
          </FooterLink> */}

          <FooterLink href="google.com">
            <GiOfficeChair size="50px" />
          </FooterLink>

          <FooterLink href="google.com">
            <AiFillEye size="50px" />
          </FooterLink>

          {/* <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">Aim</FooterLink>
            <FooterLink href="#">Vision</FooterLink>
            <FooterLink href="#">Testimonials</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <i className="fab fa-facebook-f">
              <span style={{ marginLeft: '10px' }}>Facebook</span>
            </i>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: '10px' }}>Instagram</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: '10px' }}>Twitter</span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: '10px' }}>Youtube</span>
              </i>
            </FooterLink>
          </Column> */}
        </Row>
      </Container>
    </Box>
  );
}
export default Footer;
