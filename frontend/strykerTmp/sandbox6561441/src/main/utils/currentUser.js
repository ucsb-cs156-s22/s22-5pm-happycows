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

import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function useCurrentUser() {
  if (stryMutAct_9fa48("418")) {
    {}
  } else {
    stryCov_9fa48("418");
    let rolesList = stryMutAct_9fa48("419") ? [] : (stryCov_9fa48("419"), [stryMutAct_9fa48("420") ? "" : (stryCov_9fa48("420"), "ERROR_GETTING_ROLES")]);
    return useQuery(stryMutAct_9fa48("421") ? "" : (stryCov_9fa48("421"), "/api/currentUser"), async () => {
      if (stryMutAct_9fa48("422")) {
        {}
      } else {
        stryCov_9fa48("422");

        try {
          if (stryMutAct_9fa48("423")) {
            {}
          } else {
            stryCov_9fa48("423");
            const response = await axios.get(stryMutAct_9fa48("424") ? "" : (stryCov_9fa48("424"), "/api/currentUser"));

            try {
              if (stryMutAct_9fa48("425")) {
                {}
              } else {
                stryCov_9fa48("425");
                rolesList = response.data.roles.map(stryMutAct_9fa48("426") ? () => undefined : (stryCov_9fa48("426"), r => r.authority));
              }
            } catch (e) {
              if (stryMutAct_9fa48("427")) {
                {}
              } else {
                stryCov_9fa48("427");
                console.error(stryMutAct_9fa48("428") ? "" : (stryCov_9fa48("428"), "Error getting roles: "), e);
              }
            }

            response.data = stryMutAct_9fa48("429") ? {} : (stryCov_9fa48("429"), { ...response.data,
              rolesList: rolesList
            });
            return stryMutAct_9fa48("430") ? {} : (stryCov_9fa48("430"), {
              loggedIn: stryMutAct_9fa48("431") ? false : (stryCov_9fa48("431"), true),
              root: response.data
            });
          }
        } catch (e) {
          if (stryMutAct_9fa48("432")) {
            {}
          } else {
            stryCov_9fa48("432");
            console.error(stryMutAct_9fa48("433") ? "" : (stryCov_9fa48("433"), "Error invoking axios.get: "), e);
            return stryMutAct_9fa48("434") ? {} : (stryCov_9fa48("434"), {
              loggedIn: stryMutAct_9fa48("435") ? true : (stryCov_9fa48("435"), false),
              root: null
            });
          }
        }
      }
    }, stryMutAct_9fa48("436") ? {} : (stryCov_9fa48("436"), {
      initialData: stryMutAct_9fa48("437") ? {} : (stryCov_9fa48("437"), {
        loggedIn: stryMutAct_9fa48("438") ? true : (stryCov_9fa48("438"), false),
        root: null,
        initialData: stryMutAct_9fa48("439") ? false : (stryCov_9fa48("439"), true)
      })
    }));
  }
}
export function useLogout() {
  if (stryMutAct_9fa48("440")) {
    {}
  } else {
    stryCov_9fa48("440");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutation = useMutation(async () => {
      if (stryMutAct_9fa48("441")) {
        {}
      } else {
        stryCov_9fa48("441");
        await axios.post(stryMutAct_9fa48("442") ? "" : (stryCov_9fa48("442"), "/logout"));
        await queryClient.resetQueries(stryMutAct_9fa48("443") ? "" : (stryCov_9fa48("443"), "/api/currentUser"), stryMutAct_9fa48("444") ? {} : (stryCov_9fa48("444"), {
          exact: stryMutAct_9fa48("445") ? false : (stryCov_9fa48("445"), true)
        }));
        navigate(stryMutAct_9fa48("446") ? "" : (stryCov_9fa48("446"), "/"));
      }
    });
    return mutation;
  }
}
export function hasRole(currentUser, role) {
  if (stryMutAct_9fa48("447")) {
    {}
  } else {
    stryCov_9fa48("447");
    return stryMutAct_9fa48("450") ? currentUser && currentUser.loggedIn && currentUser.root && currentUser.root.rolesList || currentUser.root.rolesList.includes(role) : stryMutAct_9fa48("449") ? false : stryMutAct_9fa48("448") ? true : (stryCov_9fa48("448", "449", "450"), (stryMutAct_9fa48("452") ? currentUser && currentUser.loggedIn && currentUser.root || currentUser.root.rolesList : stryMutAct_9fa48("451") ? true : (stryCov_9fa48("451", "452"), (stryMutAct_9fa48("454") ? currentUser && currentUser.loggedIn || currentUser.root : stryMutAct_9fa48("453") ? true : (stryCov_9fa48("453", "454"), (stryMutAct_9fa48("456") ? currentUser || currentUser.loggedIn : stryMutAct_9fa48("455") ? true : (stryCov_9fa48("455", "456"), currentUser && currentUser.loggedIn)) && currentUser.root)) && currentUser.root.rolesList)) && currentUser.root.rolesList.includes(role));
  }
}