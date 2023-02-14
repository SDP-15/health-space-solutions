import { GiOfficeChair } from 'react-icons/gi';
import { AiFillEye } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { Box, Container, Row } from './FooterStyles';
import './style.css';

import CompanyLogo from '../../../assets/CompanyLogo';

function Footer() {
  return (
    <Box>
      <Container>
        <Row>
          <div className="icon-wrapper left">
            <NavLink to="/home">
              <CompanyLogo />
            </NavLink>
          </div>

          <div className="icon-wrapper left">
            <NavLink to="/seat">
              <GiOfficeChair size="inherit" />
            </NavLink>
          </div>

          <div className="icon-wrapper left">
            <NavLink to="/eye">
              <AiFillEye size="inherit" />
            </NavLink>
          </div>

          <div className="icon-wrapper right">
            <NavLink to="/settings">
              <FiSettings size="inherit" />
            </NavLink>
          </div>
        </Row>
      </Container>
    </Box>
  );
}
export default Footer;
