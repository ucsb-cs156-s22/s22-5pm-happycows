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

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from './../../assets/HomePageBackground.jpg';
export default function HomePage() {
  if (stryMutAct_9fa48("283")) {
    {}
  } else {
    stryCov_9fa48("283");
    // Stryker disable next-line all
    const [commonsJoined, setCommonsJoined] = useState([]);
    const {
      data: currentUser
    } = useCurrentUser(); // Stryker disable all 

    const {
      data: commons
    } = useBackend(["/api/commons/all"], {
      url: "/api/commons/all"
    }, []); // Stryker enable all 

    const objectToAxiosParams = newCommonsId => ({
      url: "/api/commons/join",
      method: "POST",
      params: {
        commonsId: newCommonsId
      }
    });

    const mutation = useBackendMutation(objectToAxiosParams, {}, // Stryker disable next-line all : hard to set up test for caching
    ["/api/currentUser"]);
    useEffect(() => {
      if (currentUser?.root?.user?.commons) {
        setCommonsJoined(currentUser.root.user.commons);
      }
    }, [currentUser]);
    let navigate = useNavigate();

    const visitButtonClick = id => {
      navigate("/play/" + id);
    };

    return <div style={{
      backgroundSize: 'cover',
      backgroundImage: `url(${Background})`
    }}>
      <BasicLayout>
        <h1 data-testid="homePage-title" style={{
          fontSize: "75px",
          borderRadius: "7px",
          backgroundColor: "white",
          opacity: ".9"
        }} className="text-center border-0 my-3">Howdy Farmer</h1>
        <Container>
          <Row>
            <Col sm><CommonsList commonList={commonsJoined} title="Visit A Commons" buttonText={"Visit"} buttonLink={visitButtonClick} /></Col>
            <Col sm><CommonsList commonList={commons} title="Join A Commons" buttonText={"Join"} buttonLink={mutation.mutate} /></Col>
          </Row>
        </Container>
      </BasicLayout>
    </div>;
  }
}