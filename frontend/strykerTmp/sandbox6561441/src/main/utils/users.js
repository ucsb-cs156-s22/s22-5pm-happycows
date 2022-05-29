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

import { useQuery } from "react-query";
import axios from "axios";
export function useUsers() {
  if (stryMutAct_9fa48("511")) {
    {}
  } else {
    stryCov_9fa48("511");
    return useQuery(stryMutAct_9fa48("512") ? "" : (stryCov_9fa48("512"), "users"), async () => {
      if (stryMutAct_9fa48("513")) {
        {}
      } else {
        stryCov_9fa48("513");
        const uri = stryMutAct_9fa48("514") ? "" : (stryCov_9fa48("514"), "/api/admin/users");

        try {
          if (stryMutAct_9fa48("515")) {
            {}
          } else {
            stryCov_9fa48("515");
            const response = await axios.get(uri);
            return response.data;
          }
        } catch (e) {
          if (stryMutAct_9fa48("516")) {
            {}
          } else {
            stryCov_9fa48("516");
            console.error(stryMutAct_9fa48("517") ? `` : (stryCov_9fa48("517"), `Error getting data from ${uri}:`), e);
            return stryMutAct_9fa48("518") ? ["Stryker was here"] : (stryCov_9fa48("518"), []);
          }
        }
      }
    }, stryMutAct_9fa48("519") ? {} : (stryCov_9fa48("519"), {
      initialData: stryMutAct_9fa48("520") ? ["Stryker was here"] : (stryCov_9fa48("520"), [])
    }));
  }
}