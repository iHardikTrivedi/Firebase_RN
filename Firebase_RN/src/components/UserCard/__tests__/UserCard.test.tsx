import React from "react";
import { Image, Text } from "react-native";
import { render } from "@testing-library/react-native";
import UserCard from "../UserCard";
import { DashboardUser } from "@/types/user";

describe("UserCard", () => {
  const mockUser: DashboardUser = {
    name: "John Doe",
    email: "john.doe@mail.com",
    phone: "9876543210",
    uid: "1234567890",
  };

  it("renders user name, email and phone", () => {
    const { getByText } = render(<UserCard user={mockUser} />);

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john.doe@mail.com")).toBeTruthy();
    expect(getByText("9876543210")).toBeTruthy();
  });

  it("renders '-' when phone is missing", () => {
    const userWithoutPhone: DashboardUser = {
      name: "Jane Doe",
      email: "jane@mail.com",
      phone: undefined,
      uid: "1234567890"
    };

    const { getByText } = render(
      <UserCard user={userWithoutPhone} />
    );

    expect(getByText("-")).toBeTruthy();
  });

  it("renders user avatar image", () => {
    const { UNSAFE_getByType } = render(
      <UserCard user={mockUser} />
    );

    const image = UNSAFE_getByType(Image);
    expect(image).toBeTruthy();
  });
});
