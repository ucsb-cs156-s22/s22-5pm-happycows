import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable"
import { useBackend } from 'main/utils/useBackend';
import { useParams } from "react-router-dom";

export default function AdminShowLeaderboardPage()
{
  // const { data: currentUser } = useCurrentUser();
  let { commonsId } = useParams();

  const { data: commons, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/usercommons/allwithcommonsid?commonsId=${commonsId}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/usercommons/allwithcommonsid`,
        params: {
          commonsId
        }
      }
    );
    
  return (
    <BasicLayout>
      <div className="pt-2">
        {commons && <h1>{commons.name} Leaderboard</h1>}
        {commons && <LeaderboardTable userCommonsWithId={commons}/>}
      </div>
    </BasicLayout>
  )
};
