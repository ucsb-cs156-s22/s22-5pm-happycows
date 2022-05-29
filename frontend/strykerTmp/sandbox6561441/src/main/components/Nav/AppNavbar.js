// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});

  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }

  function retrieveNS() {
    return ns;
  }

  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}

stryNS_9fa48();

function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });

  function cover() {
    var c = cov.static;

    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }

    var a = arguments;

    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }

  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}

function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();

  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }

      return true;
    }

    return false;
  }

  stryMutAct_9fa48 = isActive;
  return isActive(id);
}

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";
export default function AppNavbar({
  currentUser,
  systemInfo,
  doLogout,
  currentUrl = window.location.href
}) {
  if (stryMutAct_9fa48("155")) {
    {}
  } else {
    stryCov_9fa48("155");
    return <>
      {stryMutAct_9fa48("158") ? currentUrl.startsWith("http://localhost:3000") || currentUrl.startsWith("http://127.0.0.1:3000") || <AppNavbarLocalhost url={currentUrl} /> : stryMutAct_9fa48("157") ? false : stryMutAct_9fa48("156") ? true : (stryCov_9fa48("156", "157", "158"), (stryMutAct_9fa48("160") ? currentUrl.startsWith("http://localhost:3000") && currentUrl.startsWith("http://127.0.0.1:3000") : stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159", "160"), currentUrl.startsWith(stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), "http://localhost:3000")) || currentUrl.startsWith(stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), "http://127.0.0.1:3000")))) && <AppNavbarLocalhost url={currentUrl} />)}
      <Navbar expand="xl" variant="dark" bg="dark" sticky="top" data-testid="AppNavbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Happier Cows
          </Navbar.Brand>

          <Navbar.Toggle />

          <Nav className="me-auto">
            {stryMutAct_9fa48("165") ? systemInfo?.springH2ConsoleEnabled || <>
                  <Nav.Link href="/h2-console">H2Console</Nav.Link>
                </> : stryMutAct_9fa48("164") ? false : stryMutAct_9fa48("163") ? true : (stryCov_9fa48("163", "164", "165"), (stryMutAct_9fa48("166") ? systemInfo.springH2ConsoleEnabled : (stryCov_9fa48("166"), systemInfo?.springH2ConsoleEnabled)) && <>
                  <Nav.Link href="/h2-console">H2Console</Nav.Link>
                </>)}
            {stryMutAct_9fa48("169") ? systemInfo?.showSwaggerUILink || <>
                  <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                </> : stryMutAct_9fa48("168") ? false : stryMutAct_9fa48("167") ? true : (stryCov_9fa48("167", "168", "169"), (stryMutAct_9fa48("170") ? systemInfo.showSwaggerUILink : (stryCov_9fa48("170"), systemInfo?.showSwaggerUILink)) && <>
                  <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                </>)}
          </Nav>

          <>
            {
              /* be sure that each NavDropdown has a unique id and data-testid  */
            }
          </>

          <Navbar.Collapse className="justify-content-between">
            <Nav className="mr-auto">
              {stryMutAct_9fa48("173") ? hasRole(currentUser, "ROLE_ADMIN") || <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item href="/admin/createcommons">Create Commons</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/listcommons">List Commons</NavDropdown.Item>
                  </NavDropdown> : stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : (stryCov_9fa48("171", "172", "173"), hasRole(currentUser, stryMutAct_9fa48("174") ? "" : (stryCov_9fa48("174"), "ROLE_ADMIN")) && <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown">
                    <NavDropdown.Item href="/admin/createcommons">Create Commons</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/users">Users</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/listcommons">List Commons</NavDropdown.Item>
                  </NavDropdown>)}
            </Nav>

            <Nav className="ml-auto">
              {(stryMutAct_9fa48("177") ? currentUser || currentUser.loggedIn : stryMutAct_9fa48("176") ? false : stryMutAct_9fa48("175") ? true : (stryCov_9fa48("175", "176", "177"), currentUser && currentUser.loggedIn)) ? <>
                    <Navbar.Text className="me-3" as={Link} to="/profile">Welcome, {currentUser.root.user.email}</Navbar.Text>
                    <Button onClick={doLogout}>Log Out</Button>
                  </> : <Button href="/oauth2/authorization/google">Log In</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>;
  }
}