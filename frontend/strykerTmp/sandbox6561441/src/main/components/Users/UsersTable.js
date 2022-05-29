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
import OurTable from "main/components/OurTable";
const columns = stryMutAct_9fa48("206") ? [] : (stryCov_9fa48("206"), [stryMutAct_9fa48("207") ? {} : (stryCov_9fa48("207"), {
  Header: stryMutAct_9fa48("208") ? "" : (stryCov_9fa48("208"), 'id'),
  accessor: stryMutAct_9fa48("209") ? "" : (stryCov_9fa48("209"), 'id') // accessor is the "key" in the data

}), stryMutAct_9fa48("210") ? {} : (stryCov_9fa48("210"), {
  Header: stryMutAct_9fa48("211") ? "" : (stryCov_9fa48("211"), 'First Name'),
  accessor: stryMutAct_9fa48("212") ? "" : (stryCov_9fa48("212"), 'givenName')
}), stryMutAct_9fa48("213") ? {} : (stryCov_9fa48("213"), {
  Header: stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), 'Last Name'),
  accessor: stryMutAct_9fa48("215") ? "" : (stryCov_9fa48("215"), 'familyName')
}), stryMutAct_9fa48("216") ? {} : (stryCov_9fa48("216"), {
  Header: stryMutAct_9fa48("217") ? "" : (stryCov_9fa48("217"), 'Email'),
  accessor: stryMutAct_9fa48("218") ? "" : (stryCov_9fa48("218"), 'email')
}), stryMutAct_9fa48("219") ? {} : (stryCov_9fa48("219"), {
  Header: stryMutAct_9fa48("220") ? "" : (stryCov_9fa48("220"), 'Admin'),
  id: stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), 'admin'),
  accessor: stryMutAct_9fa48("222") ? () => undefined : (stryCov_9fa48("222"), (row, _rowIndex) => String(row.admin)) // hack needed for boolean values to show up

})]);
export default function UsersTable({
  users
}) {
  if (stryMutAct_9fa48("223")) {
    {}
  } else {
    stryCov_9fa48("223");
    return <OurTable data={users} columns={columns} testid={stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), "UsersTable")} />;
  }
}
;