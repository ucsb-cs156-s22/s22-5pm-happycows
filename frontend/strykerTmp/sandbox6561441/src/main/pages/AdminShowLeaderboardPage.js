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
import BasicLayout from "main/layouts/BasicLayout/BasicLayout"; // import CommonsTable from 'main/components/Commons/CommonsTable';

import { useBackend } from 'main/utils/useBackend';
import { useParams } from "react-router-dom"; // import { useCurrentUser } from "main/utils/currentUser";

export default function AdminShowLeaderboardPage() {
  if (stryMutAct_9fa48("272")) {
    {}
  } else {
    stryCov_9fa48("272");
    // const { data: currentUser } = useCurrentUser();
    let {
      id
    } = useParams();
    const {
      data: commons,
      _error,
      _status
    } = useBackend( // Stryker disable next-line all : don't test internal caching of React Query
    [`/api/commons?id=${id}`], stryMutAct_9fa48("275") ? {} : (stryCov_9fa48("275"), {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: stryMutAct_9fa48("277") ? `` : (stryCov_9fa48("277"), `/api/commons`),
      params: stryMutAct_9fa48("278") ? {} : (stryCov_9fa48("278"), {
        id
      })
    }));
    return <BasicLayout>
      <div className="pt-2">
        {stryMutAct_9fa48("281") ? commons || <h1>{commons.name} Leaderboard</h1> : stryMutAct_9fa48("280") ? false : stryMutAct_9fa48("279") ? true : (stryCov_9fa48("279", "280", "281"), commons && <h1>{commons.name} Leaderboard</h1>)}
      </div>
    </BasicLayout>;
  }
}
;