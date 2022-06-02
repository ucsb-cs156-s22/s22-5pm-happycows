import React from 'react'; 

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import * as leaderboardFixtures from "fixtures/leaderboardFixtures.js"; 

export default {
    title: 'components/Leaderboard/LeaderboardTable',
    component: LeaderboardTable
};

const Template = (args) => {
    return (
        <LeaderboardTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    userCommonsWithId: []
};

export const OneEntry = Template.bind({}); 

OneEntry.args = {
    userCommonsWithId: leaderboardFixtures.oneLeaderboardOneEntry
};

export const ThreeEntries = Template.bind({}); 

ThreeEntries.args = {
    userCommonsWithId: leaderboardFixtures.oneLeaderboardThreeEntries
};

export const FiveEntries = Template.bind({});
FiveEntries.args = {
    userCommonsWithId: leaderboardFixtures.oneLeaderboardFiveEntries
};