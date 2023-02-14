import { GiOfficeChair } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Box, Container, Row } from './FooterStyles';
import './style.css';

import CompanyLogo from '../../../assets/CompanyLogo';

function Footer() {
  return (
    <Box>
      <Container>
        <Row>
          <div className="icon-wrapper">
            <NavLink to="/home">
              <CompanyLogo />
            </NavLink>
          </div>

          <div className="icon-wrapper">
            <NavLink to="/seat">
              <GiOfficeChair size="inherit" />
            </NavLink>
          </div>

          <div className="icon-wrapper">
            <NavLink to="/eye">
              <AiFillEye size="inherit" />
            </NavLink>
          </div>
        </Row>
      </Container>
    </Box>
  );
}
export default Footer;
