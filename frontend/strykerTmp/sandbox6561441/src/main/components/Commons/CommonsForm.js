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

import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

function CommonsForm({
  initialCommons,
  submitAction,
  buttonLabel = stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), "Create")
}) {
  if (stryMutAct_9fa48("12")) {
    {}
  } else {
    stryCov_9fa48("12");
    // Stryker disable all
    const {
      register,
      formState: {
        errors
      },
      handleSubmit
    } = useForm({
      defaultValues: initialCommons || {}
    }); // Stryker enable all

    const testid = "CommonsForm";
    return <Form onSubmit={handleSubmit(submitAction)}>
      {initialCommons && <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Control data-testid={`${testid}-id`} id="id" type="text" {...register("id")} value={initialCommons.id} disabled />
        </Form.Group>}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Commons Name</Form.Label>
        <Form.Control data-testid={`${testid}-name`} id="name" type="text" isInvalid={!!errors.name} {...register("name", {
          required: "Commons name is required"
        })} />
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="startingBalance">Starting Balance</Form.Label>
        <Form.Control id="startingBalance" data-testid={`${testid}-startingBalance`} type="number" step="0.01" isInvalid={!!errors.startingBalance} {...register("startingBalance", {
          valueAsNumber: true,
          required: "Starting Balance is required",
          min: {
            value: 0.01,
            message: "Starting Balance must be positive"
          }
        })} />
        <Form.Control.Feedback type="invalid">
          {errors.startingBalance?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="cowPrice">Cow Price</Form.Label>
        <Form.Control data-testid={`${testid}-cowPrice`} id="cowPrice" type="number" step="0.01" isInvalid={!!errors.cowPrice} {...register("cowPrice", {
          valueAsNumber: true,
          required: "Cow price is required",
          min: {
            value: 0.01,
            message: "Cow price must be positive"
          }
        })} />
        <Form.Control.Feedback type="invalid">
          {errors.cowPrice?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="milkPrice">Milk Price</Form.Label>
        <Form.Control data-testid={`${testid}-milkPrice`} id="milkPrice" type="number" step="0.01" isInvalid={!!errors.milkPrice} {...register("milkPrice", {
          valueAsNumber: true,
          required: "Milk price is required",
          min: {
            value: 0.01,
            message: "Milk price must be positive"
          }
        })} />
        <Form.Control.Feedback type="invalid">
          {errors.milkPrice?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="startingDate">Starting Date</Form.Label>
        <Form.Control data-testid={`${testid}-startingDate`} id="startingDate" type="date" isInvalid={!!errors.startingDate} {...register("startingDate", {
          valueAsDate: true,
          validate: {
            isPresent: v => !isNaN(v) || "Starting date is required"
          }
        })} />
        <Form.Control.Feedback type="invalid">
          {errors.startingDate?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" data-testid="CommonsForm-Submit-Button">{buttonLabel}</Button>
    </Form>;
  }
}

export default CommonsForm;