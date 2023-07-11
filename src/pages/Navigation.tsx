import { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import CountryCodeContext from '../context/CountryCodeContext';

const Navigation = () => {
  const countryCodes = {
    'United Arab Emirates': 'ae',
    'Argentina': 'ar',
    'Austria': 'at',
    'Australia': 'au',
    'Belgium': 'be',
    'Bulgaria': 'bg',
    'Brazil': 'br',
    'Canada': 'ca',
    'Switzerland': 'ch',
    'China': 'cn',
    'Colombia': 'co',
    'Cuba': 'cu',
    'Czech Republic': 'cz',
    'Germany': 'de',
    'Egypt': 'eg',
    'France': 'fr',
    'United Kingdom': 'gb',
    'Greece': 'gr',
    'Hong Kong': 'hk',
    'Hungary': 'hu',
    'Indonesia': 'id',
    'Ireland': 'ie',
    'Israel': 'il',
    'India': 'in',
    'Italy': 'it',
    'Japan': 'jp',
    'South Korea': 'kr',
    'Lithuania': 'lt',
    'Latvia': 'lv',
    'Morocco': 'ma',
    'Mexico': 'mx',
    'Malaysia': 'my',
    'Nigeria': 'ng',
    'Netherlands': 'nl',
    'Norway': 'no',
    'New Zealand': 'nz',
    'Philippines': 'ph',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Romania': 'ro',
    'Serbia': 'rs',
    'Russia': 'ru',
    'Saudi Arabia': 'sa',
    'Sweden': 'se',
    'Singapore': 'sg',
    'Slovakia': 'sk',
    'Thailand': 'th',
    'Turkey': 'tr',
    'Taiwan': 'tw',
    'Ukraine': 'ua',
    'United States': 'us',
    'Venezuela': 've',
    'South Africa': 'za'
  };

  const auth = useContext(AuthContext) as AuthContextType;
  const countryCodeContext = useContext(CountryCodeContext);
  const location = useLocation();

  const handleCountryClick = (code: string) => {
    countryCodeContext?.setCountryCode(code);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            {auth.isLoggedIn ? (
              <Nav.Link onClick={auth.logout} as={Link} to="/login" className="nav-link">
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/Savednews">
              Saved
            </Nav.Link>
            {(location.pathname === '/home' || location.pathname === '/') && (
              <NavDropdown title="Country" id="basic-nav-dropdown">
                {Object.entries(countryCodes)?.map(([country, code]) => (
                  <NavDropdown.Item key={code} onClick={() => handleCountryClick(code)}>
                    {country}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
