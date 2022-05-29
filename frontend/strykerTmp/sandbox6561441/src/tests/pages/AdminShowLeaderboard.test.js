// @ts-nocheck
// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {render} from "@testing-library/react";
// import mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import AdminShowLeaderboardPage from "main/pages/AdminShowLeaderboardPage";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: 5
        }),
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("AdminListCommonPage tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    // const testId = "Leaderboard";

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
        axiosMock.onGet("/api/commons", { params: { id: 5 } }).reply(200, {
            "id": 5,
            "name": "Seths Common",
            "startingDate": "2022-03-05",
            "startingBalance": 1200,
            "cowPrice": 15,
            "milkPrice": 10
        });
    });


    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <AdminShowLeaderboardPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });





 
});
