import { render, screen, waitFor } from "@testing-library/react";
import FarmStats from "main/components/Commons/FarmStats"; 
import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

describe("FarmStats tests", () => {
    test("renders without crashing", () => {
        render(
            <FarmStats userCommons = {userCommonsFixtures.oneUserCommons[0]} />
        );
    });

    test("contains correct content", async () => {
        render(
            <FarmStats userCommons = {userCommonsFixtures.oneUserCommons[0]} />
        );

        await waitFor (() => {
            expect(screen.getByText(/Total Wealth: \$1000/)).toBeInTheDocument();
        }); 

        expect(screen.getByText(/Cow Health: 96%/)).toBeInTheDocument();

    });

    test("contains correct content 2", async () => {
        render(
            <FarmStats userCommons = {userCommonsFixtures.threeUserCommons[0]} />
        );

        await waitFor (() => {
            expect(screen.getByText(/Total Wealth: \$1000/)).toBeInTheDocument();
        }); 

        expect(screen.getByText(/Cow Health: 0%/)).toBeInTheDocument();

    });
});