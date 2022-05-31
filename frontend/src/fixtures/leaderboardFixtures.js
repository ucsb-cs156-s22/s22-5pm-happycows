const leaderboardFixtures =
{
    oneLeaderboardThreeEntries: 
    [
        {
            "id": 1, 
            "commonsId": 1, 
            "userId": 1, 
            "totalWealth": 1000000,
            "numOfCows": 1000
            //,"averageCowHealth": 98.0
        }, 
        {
            "id": 2, 
            "commonsId": 1, 
            "userId": 14, 
            "totalWealth": 10000, 
            "numOfCows": 980
            //,"averageCowHealth": 94,0
        }, 
        {
            "id": 3, 
            "commonsId": 1, 
            "userId": 4, 
            "totalWealth": 9999, 
            "numOfCows": 875
            //,"averageCowHealth": 85.0
        }
    ], 

    oneLeaderboardOneEntry: 
    [
        {
            "id": 1, 
            "commonsId": 5, 
            "userId": 1, 
            "totalWealth": 1000000,
            "numOfCows": 1000
            //,"averageCowHealth": 98.0
        }
    ], 
}; 

export { leaderboardFixtures };


// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private long id;  

// @Column(name="commons_id")
// private long commonsId;  

// @Column(name="user_id")
// private long userId;  

// private double totalWealth;

// private int numOfCows;