import React from 'react'; 

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import leaderboardFixtures from "fixtures/leaderboardFixtures"; 

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
    leaderboard: []
};

export const OneEntry = Template.bind({}); 

OneEntry.args = {
    leaderboard: leaderboardFixtures.oneLeaderboardOneEntry
}

export const ThreeEntries = Template.bind({}); 

ThreeEntries.args = {
    leaderboard: leaderboardFixtures.oneLeaderboardThreeEntries
}

export const FiveEntries = Template.bind({});
FiveEntries.args = {
    leaderboard: leaderboardFixtures.oneLeaderboardFiveEntries
}