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

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import { useBackend } from "main/utils/useBackend";
import Background from './../../assets/HomePageBackground.jpg';

const LoginCard = () => {
  if (stryMutAct_9fa48("317")) {
    {}
  } else {
    stryCov_9fa48("317");
    return <Card style={// Stryker disable next-line all : no need to unit test CSS
    {
      width: '18rem'
    }}>
      <Card.Body>
        <Card.Title data-testid="loginPage-cardTitle">Welcome to Happier Cows!</Card.Title>
        <Card.Text>
          In order to start playing, please login.
        </Card.Text>
        <Button href="/oauth2/authorization/google" variant="primary">Log In</Button>
      </Card.Body>
    </Card>;
  }
};

export default function LoginPage() {
  if (stryMutAct_9fa48("320")) {
    {}
  } else {
    stryCov_9fa48("320");
    // Stryker disable all
    const {
      data: commons
    } = useBackend(["/api/commons/all"], {
      method: "GET",
      url: "/api/commons/all"
    }, []); // Stryker enable all

    var listCommons = commons;

    if (commons.length > 5) {
      listCommons = commons.slice(0, 5);
      listCommons.push({
        id: "...",
        name: "..."
      });
    }

    return <div style={{
      backgroundSize: 'cover',
      backgroundImage: `url(${Background})`
    }}>
      <BasicLayout>
        <Container style={{
          marginTop: "8%"
        }}>
          <Row style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Col sm="auto"><LoginCard /></Col>
            <Col sm="5"><CommonsList title="Available Commons" commonList={listCommons} buttonText={null} buttonLink={null} /></Col>
          </Row>
        </Container>
      </BasicLayout>
    </div>;
  }
}