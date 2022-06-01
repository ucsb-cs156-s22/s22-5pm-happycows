import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import { leaderboardFixtures } from "fixtures/leaderboardFixtures";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("LeaderboardTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table for any user", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable userCommonsWithId={[]} />
        </MemoryRouter>
      </QueryClientProvider>

    );
  });

  test("Has the expected column headers and content for any user", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardTable userCommonsWithId={leaderboardFixtures.oneLeaderboardThreeEntries}/>
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["ID", "Commons ID", "Player ID", "Total Wealth", "Number of Cows"];
    const expectedFields = ["id", "commonsId", "userId", "totalWealth", "numOfCows"];
    const testId = "LeaderboardTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-totalWealth`)).toHaveTextContent("10000");
  });
});
