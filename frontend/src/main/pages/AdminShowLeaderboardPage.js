import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import _CommonsTable from 'main/components/Commons/CommonsTable';
import { useParams, Navigate } from "react-router-dom";
import { useCurrentUser } from "main/utils/currentUser";
import { useBackend } from "main/utils/useBackend";

export default function AdminShowLeaderboardPage()
{
  const { _data: _currentUser } = useCurrentUser();

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
      },
    );

  if (isError) {
    return (<Navigate to="/NotFoundPage" />) // Need some way to have code coverage here 
  }
  return (
    <BasicLayout>
      <div className="pt-2">
        {commons && <h1>{commons.name} Leaderboard</h1>}
      </div>
    </BasicLayout>
  )
};
