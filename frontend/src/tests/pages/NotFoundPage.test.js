import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "main/pages/NotFoundPage"; 

describe("NotFoundPage test", () => {
    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <NotFoundPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });
});