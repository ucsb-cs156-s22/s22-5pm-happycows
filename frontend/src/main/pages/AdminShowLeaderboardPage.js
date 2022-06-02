import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useBackend } from 'main/utils/useBackend';
import { useParams } from "react-router-dom";
import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";

export default function AdminShowLeaderboardPage()
{
  let { id } = useParams();
  let commonsId = Number(id);

  const { data: leaderboardData, _error, _status } =
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
        {leaderboardData && <h1>Leaderboard</h1>}
        <LeaderboardTable userCommonsWithId={leaderboardData}/>
      </div>
    </BasicLayout>
  )
};

