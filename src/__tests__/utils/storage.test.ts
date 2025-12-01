import { describe, it, expect, beforeEach, afterEach } from "vitest";
import storageHelpers from "@/utils/storage";

describe("BaseLocalStorage", () => {
  const mockTokenValue = "mockToken";
  const mockRefreshTokenValue = "mockRefreshToken";

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should set and get a token", () => {
    storageHelpers.token.set(mockTokenValue);
    const token = storageHelpers.token.get();
    expect(token).toBe(mockTokenValue);
  });

  it("should return null if token does not exist", () => {
    const token = storageHelpers.token.get();
    expect(token).toBeNull();
  });

  it("should remove a token", () => {
    storageHelpers.token.set(mockTokenValue);
    storageHelpers.token.remove();
    const token = storageHelpers.token.get();
    expect(token).toBeNull();
  });

  it("should set and get a refresh token", () => {
    storageHelpers.refreshToken.set(mockRefreshTokenValue);
    const refreshToken = storageHelpers.refreshToken.get();
    expect(refreshToken).toBe(mockRefreshTokenValue);
  });

  it("should return null if refresh token does not exist", () => {
    const refreshToken = storageHelpers.refreshToken.get();
    expect(refreshToken).toBeNull();
  });

  it("should remove a refresh token", () => {
    storageHelpers.refreshToken.set(mockRefreshTokenValue);
    storageHelpers.refreshToken.remove();
    const refreshToken = storageHelpers.refreshToken.get();
    expect(refreshToken).toBeNull();
  });

  it("should clear all local storage", () => {
    storageHelpers.token.set(mockTokenValue);
    storageHelpers.refreshToken.set(mockRefreshTokenValue);
    storageHelpers.removeAll();
    expect(storageHelpers.token.get()).toBeNull();
    expect(storageHelpers.refreshToken.get()).toBeNull();
  });
});
