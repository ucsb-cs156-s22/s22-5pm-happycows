import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import CommonsForm from "main/components/Commons/CommonsForm";
import { Navigate } from 'react-router-dom'
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CommonsEditPage() {
  let { id } = useParams();

  const { data: commons, _error, _status, isError } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/commons?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/commons`,
        params: {
          id
        }
      }
    );


  const objectToAxiosPutParams = (commons) => ({
    url: "/api/commons/update",
    method: "PUT",
    params: {
      id: commons.id,
    },
    data: {
        "name": commons.name,
        "startingBalance": commons.startingBalance,
        "cowPrice": commons.cowPrice,
        "milkPrice": commons.milkPrice,
        "startingDate": commons.startingDate,
        "endingDate": commons.endingDate,
        "leaderboard": commons.leaderboard
    }
  });

  const onSuccess = (commons) => {
    toast(`Commons Updated - id: ${commons.id} name: ${commons.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/commons?id=${id}`]
  );

  const { isSuccess } = mutation

  const submitAction = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/admin/listcommons" />
  }
  if (isError) {
    return <Navigate to="/NotFoundPage" /> // Need some way to have code coverage here
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit  Commons</h1>
        {commons &&
          <CommonsForm initialCommons={commons} submitAction={submitAction} buttonLabel="Update" />
        }
      </div>
    </BasicLayout>
  )
}

