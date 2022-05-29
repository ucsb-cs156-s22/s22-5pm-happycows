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
import CommonsCard from "./CommonsCard";
import { Card, Container, Row, Col } from "react-bootstrap";

const CommonsList = props => {
  if (stryMutAct_9fa48("74")) {
    {}
  } else {
    stryCov_9fa48("74");
    return <Card style={// Stryker disable next-line all: don't test CSS params
    {
      opacity: ".9"
    }} className="my-3 border-0">
            <Card.Title data-testid="commonsList-title" style={// Stryker disable next-line all: don't test CSS params
      {
        fontSize: "35px"
      }} className="text-center my-3">
                {props.title}
            </Card.Title>
            <Card.Subtitle>
                <Container>
                    <Row>
                        <Col data-testid="commonsList-subtitle-id" sx={4}>ID#</Col>
                        <Col data-testid="commonsList-subtitle-name" sx={4}>Common's Name</Col>
                        <Col sm={4}></Col>
                    </Row>
                </Container>
            </Card.Subtitle>
            {stryMutAct_9fa48("81") ? props.commonList || props.commonList.map(c => <CommonsCard key={c.id} commons={c} buttonText={props.buttonText} buttonLink={props.buttonLink} />) : stryMutAct_9fa48("80") ? false : stryMutAct_9fa48("79") ? true : (stryCov_9fa48("79", "80", "81"), props.commonList && props.commonList.map(stryMutAct_9fa48("82") ? () => undefined : (stryCov_9fa48("82"), c => <CommonsCard key={c.id} commons={c} buttonText={props.buttonText} buttonLink={props.buttonLink} />)))}
        </Card>;
  }
};

export default CommonsList;