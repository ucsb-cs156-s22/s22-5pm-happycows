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
import { Container, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsOverview from "main/components/Commons/CommonsOverview";
import CommonsPlay from "main/components/Commons/CommonsPlay";
import FarmStats from "main/components/Commons/FarmStats";
import ManageCows from "main/components/Commons/ManageCows";
import Profits from "main/components/Commons/Profits";
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from "../../assets/PlayPageBackground.png";
export default function PlayPage() {
  if (stryMutAct_9fa48("343")) {
    {}
  } else {
    stryCov_9fa48("343");
    const {
      commonsId
    } = useParams();
    const {
      data: currentUser
    } = useCurrentUser(); // Stryker disable all 

    const {
      data: userCommons
    } = useBackend([`/api/usercommons/forcurrentuser?commonsId=${commonsId}`], {
      method: "GET",
      url: "/api/usercommons/forcurrentuser",
      params: {
        commonsId: commonsId
      }
    }); // Stryker enable all 
    // Stryker disable all 

    const {
      data: commons
    } = useBackend([`/api/commons?commons_id=${commonsId}`], {
      method: "GET",
      url: "/api/commons",
      params: {
        id: commonsId
      }
    }); // Stryker enable all 
    // Stryker disable all 

    const {
      data: userCommonsProfits
    } = useBackend([`/api/profits/all/commons?userCommonsId=${commonsId}`], {
      method: "GET",
      url: "/api/profits/all/commons",
      params: {
        userCommonsId: commonsId
      }
    }); // Stryker enable all 

    const onSuccessBuy = () => {
      toast(`Cow bought!`);
    };

    const objectToAxiosParamsBuy = newUserCommons => ({
      url: "/api/usercommons/buy",
      method: "PUT",
      data: newUserCommons,
      params: {
        commonsId: commonsId
      }
    }); // Stryker disable all 


    const mutationbuy = useBackendMutation(objectToAxiosParamsBuy, {
      onSuccess: onSuccessBuy
    }, // Stryker disable next-line all : hard to set up test for caching
    [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`]); // Stryker enable all 

    const onBuy = userCommons => {
      mutationbuy.mutate(userCommons);
    };

    const onSuccessSell = () => {
      toast(`Cow sold!`);
    }; // Stryker disable all 


    const objectToAxiosParamsSell = newUserCommons => ({
      url: "/api/usercommons/sell",
      method: "PUT",
      data: newUserCommons,
      params: {
        commonsId: commonsId
      }
    }); // Stryker enable all 
    // Stryker disable all 


    const mutationsell = useBackendMutation(objectToAxiosParamsSell, {
      onSuccess: onSuccessSell
    }, [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`]); // Stryker enable all 

    const onSell = userCommons => {
      mutationsell.mutate(userCommons);
    };

    return <div style={{
      backgroundSize: 'cover',
      backgroundImage: `url(${Background})`
    }}>
      <BasicLayout>
        <Container>
          {!!currentUser && <CommonsPlay currentUser={currentUser} />}
          {!!commons && <CommonsOverview commons={commons} />}
          <br />
          {!!userCommons && <CardGroup>
              <ManageCows userCommons={userCommons} commons={commons} onBuy={onBuy} onSell={onSell} />
              <FarmStats userCommons={userCommons} />
              <Profits userCommons={userCommons} profits={userCommonsProfits} />
            </CardGroup>}
        </Container>
      </BasicLayout>
    </div>;
  }
}