// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { vi } from "vitest";

// Define global mocks
const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  postForm: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

// Mock axios globally
vi.mock("axios", async (importActual) => {
  const actual = await importActual<typeof import("axios")>();
  return {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
        postForm: mocks.postForm,
        delete: mocks.delete,
        put: mocks.put,
      })),
    },
  };
});

export { mocks }; // Optionally export mocks if you need to access them in individual tests
