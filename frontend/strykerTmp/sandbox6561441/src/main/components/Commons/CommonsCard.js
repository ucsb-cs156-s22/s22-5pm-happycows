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
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const CommonsCard = ({
  buttonText,
  buttonLink,
  commons
}) => {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    return <Card.Body style={// Stryker disable next-line all : don't mutation test CSS 
    {
      fontSize: "20px",
      borderTop: "1px solid lightgrey"
    }}>
            <Container>
                <Row>
                    <Col sx={4} data-testid="commonsCard-id">{commons.id}</Col>
                    <Col sx={4} data-testid="commonsCard-name">{commons.name}</Col>
                    {stryMutAct_9fa48("6") ? buttonText != null || <Col sm={4}>
                            <Button data-testid={`commonsCard-button-${buttonText}-${commons.id}`} size="sm" className="mx-4" onClick={() => buttonLink(commons.id)}>{buttonText}
                            </Button>
                        </Col> : stryMutAct_9fa48("5") ? false : stryMutAct_9fa48("4") ? true : (stryCov_9fa48("4", "5", "6"), (stryMutAct_9fa48("8") ? buttonText == null : stryMutAct_9fa48("7") ? true : (stryCov_9fa48("7", "8"), buttonText != null)) && <Col sm={4}>
                            <Button data-testid={stryMutAct_9fa48("9") ? `` : (stryCov_9fa48("9"), `commonsCard-button-${buttonText}-${commons.id}`)} size="sm" className="mx-4" onClick={stryMutAct_9fa48("10") ? () => undefined : (stryCov_9fa48("10"), () => buttonLink(commons.id))}>{buttonText}
                            </Button>
                        </Col>)}
                </Row>
            </Container>
        </Card.Body>;
  }
};

export default CommonsCard;