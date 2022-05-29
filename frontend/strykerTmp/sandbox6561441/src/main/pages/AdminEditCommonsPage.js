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

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CommonsForm from "main/components/Commons/CommonsForm";
import { Navigate } from 'react-router-dom';
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
export default function CommonsEditPage() {
  if (stryMutAct_9fa48("240")) {
    {}
  } else {
    stryCov_9fa48("240");
    let {
      id
    } = useParams();
    const {
      data: commons,
      _error,
      _status
    } = useBackend( // Stryker disable next-line all : don't test internal caching of React Query
    [`/api/commons?id=${id}`], stryMutAct_9fa48("243") ? {} : (stryCov_9fa48("243"), {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: stryMutAct_9fa48("245") ? `` : (stryCov_9fa48("245"), `/api/commons`),
      params: stryMutAct_9fa48("246") ? {} : (stryCov_9fa48("246"), {
        id
      })
    }));
    const objectToAxiosPutParams = stryMutAct_9fa48("247") ? () => undefined : (stryCov_9fa48("247"), (() => {
      const objectToAxiosPutParams = commons => stryMutAct_9fa48("248") ? {} : (stryCov_9fa48("248"), {
        url: stryMutAct_9fa48("249") ? "" : (stryCov_9fa48("249"), "/api/commons/update"),
        method: stryMutAct_9fa48("250") ? "" : (stryCov_9fa48("250"), "PUT"),
        params: stryMutAct_9fa48("251") ? {} : (stryCov_9fa48("251"), {
          id: commons.id
        }),
        data: stryMutAct_9fa48("252") ? {} : (stryCov_9fa48("252"), {
          "name": commons.name,
          "startingBalance": commons.startingBalance,
          "cowPrice": commons.cowPrice,
          "milkPrice": commons.milkPrice,
          "startingDate": commons.startingDate
        })
      });

      return objectToAxiosPutParams;
    })());

    const onSuccess = commons => {
      if (stryMutAct_9fa48("253")) {
        {}
      } else {
        stryCov_9fa48("253");
        toast(stryMutAct_9fa48("254") ? `` : (stryCov_9fa48("254"), `Commons Updated - id: ${commons.id} name: ${commons.name}`));
      }
    };

    const mutation = useBackendMutation(objectToAxiosPutParams, stryMutAct_9fa48("255") ? {} : (stryCov_9fa48("255"), {
      onSuccess
    }), // Stryker disable next-line all : hard to set up test for caching
    [`/api/commons?id=${id}`]);
    const {
      isSuccess
    } = mutation;

    const submitAction = async data => {
      if (stryMutAct_9fa48("258")) {
        {}
      } else {
        stryCov_9fa48("258");
        mutation.mutate(data);
      }
    };

    if (stryMutAct_9fa48("260") ? false : stryMutAct_9fa48("259") ? true : (stryCov_9fa48("259", "260"), isSuccess)) {
      if (stryMutAct_9fa48("261")) {
        {}
      } else {
        stryCov_9fa48("261");
        return <Navigate to="/admin/listcommons" />;
      }
    }

    return <BasicLayout>
      <div className="pt-2">
        <h1>Edit  Commons</h1>
        {stryMutAct_9fa48("264") ? commons || <CommonsForm initialCommons={commons} submitAction={submitAction} buttonLabel="Update" /> : stryMutAct_9fa48("263") ? false : stryMutAct_9fa48("262") ? true : (stryCov_9fa48("262", "263", "264"), commons && <CommonsForm initialCommons={commons} submitAction={submitAction} buttonLabel="Update" />)}
      </div>
    </BasicLayout>;
  }
}