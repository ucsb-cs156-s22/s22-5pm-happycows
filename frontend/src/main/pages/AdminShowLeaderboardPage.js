import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useBackend } from 'main/utils/useBackend';
import { useParams } from "react-router-dom";
import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";

export default function AdminShowLeaderboardPage()
{
  let { id } = useParams();
  let commonsId = id;

  // Stryker disable  all 
  const { data: leaderboardData, _error, _status } =
    useBackend(
      [`/api/usercommons/allwithcommonsid?commonsId=${commonsId}`],
      { 
        method: "GET",
        url: `/api/usercommons/allwithcommonsid`,
        params: {
          commonsId
        }
      }
    );
  // Stryker enable  all 
    
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Leaderboard</h1>
        <LeaderboardTable userCommonsWithId={leaderboardData}/>
      </div>
    </BasicLayout>
  )
};

