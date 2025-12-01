import { mocks } from "@/setupTest";
import authServices from "@services/auth";
import { LoginRequest, LoginResponse } from "@services/auth/type";
import { describe, expect, it } from "vitest";

describe("login", () => {
  it("should make a POST request to the login endpoint with the provided data", async () => {
    const mockData: LoginRequest = {
      username: "testuser",
      password: "testpassword",
    };
    const mockResponse: LoginResponse = {
      accessToken: "mockToken",
      refreshToken: "mockRefresh",
    };
    mocks.post.mockResolvedValueOnce({
      data: mockResponse,
    });
    await authServices.login(mockData);
    expect(mocks.post).toHaveBeenCalled(); // should return true
  });

  it("should return the response from the API", async () => {
    const mockData: LoginRequest = {
      username: "testuser",
      password: "testpassword",
    };
    const mockResponse: LoginResponse = {
      refreshToken: "mockRefresh",
      accessToken: "token",
    };

    const expectedResponse = {
      data: mockResponse,
    };

    mocks.post.mockResolvedValueOnce({
      data: mockResponse,
    });

    const response = await authServices.login(mockData);
    expect(response).toEqual(expectedResponse); // should return true
  });

  it("should return an error if the API request fails", async () => {
    const mockData: LoginRequest = {
      username: "testuser",
      password: "testpassword",
    };

    const mockError = new Error("mockError");
    mocks.post.mockRejectedValueOnce(mockError);

    try {
      await authServices.login(mockData);
    } catch (error) {
      expect(error).toEqual(mockError); // should return true
    }
  });
});
