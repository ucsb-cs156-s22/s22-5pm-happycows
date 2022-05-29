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
import { Card, Button, Row, Col } from "react-bootstrap";
import cowHead from "./../../../assets/CowHead.png"; // add parameters 

const ManageCows = ({
  userCommons,
  commons,
  onBuy,
  onSell
}) => {
  if (stryMutAct_9fa48("132")) {
    {}
  } else {
    stryCov_9fa48("132");
    // update cowPrice from fixture
    return <Card>
        <Card.Header as="h5">Manage Cows</Card.Header>
        <Card.Body>
            {
          /* change $10 to info from fixture */
        }
            <Card.Title>Market Cow Price: ${stryMutAct_9fa48("133") ? commons.cowPrice : (stryCov_9fa48("133"), commons?.cowPrice)}</Card.Title>
            <Card.Title>Number of Cows: {userCommons.numOfCows}</Card.Title>
                <Row>
                    <Col>
                        <Card.Text>
                            <img alt="Cow Icon" className="icon" src={cowHead}></img>
                        </Card.Text>
                    </Col>
                    <Col>
                        <Button variant="outline-danger" onClick={() => {
              if (stryMutAct_9fa48("134")) {
                {}
              } else {
                stryCov_9fa48("134");
                onBuy(userCommons);
              }
            }} data-testid={stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), "buy-cow-button")}>Buy cow</Button>
                        <br />
                        <br />
                        <Button variant="outline-danger" onClick={() => {
              if (stryMutAct_9fa48("136")) {
                {}
              } else {
                stryCov_9fa48("136");
                onSell(userCommons);
              }
            }} data-testid={stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), "sell-cow-button")}>Sell cow</Button>
                        <br />
                        <br />
                    </Col>
                </Row>
                    Note: Buying cows buys at current cow price, but selling cows sells at current cow price
                    times the average health of cows as a percentage! 
        </Card.Body>
        </Card>;
  }
};

export default ManageCows;