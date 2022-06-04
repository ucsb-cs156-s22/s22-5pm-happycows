import React from "react";
import OurTable from "main/components/OurTable";

export default function LeaderboardTable({ userCommonsWithId }) {

    // filteredCommons contains all UserCommons passed in the input parameter, but removes
    // several unneeded headers, such as id and commonsId

    const columns = [
        {
            Header:'ID',
            accessor: 'id',
        },
        {
            Header:'Commons ID',
            accessor: 'commonsId',
        },
        {
            Header:'Player ID',
            accessor: 'userId',
        },
        {
            Header:'Total Wealth',
            accessor: row => String(row.totalWealth),
            id: 'totalWealth'
        },
        {
            Header:'Number of Cows',
            accessor: 'numOfCows',
        }
    ];

    const testid = "LeaderboardTable";

    const columnsToDisplay = columns;
    
    return <OurTable
        data={userCommonsWithId}
        columns={columnsToDisplay}
        testid={testid}
    />;
};
