import axios, { CancelTokenSource } from "axios";

/**
 * Request cancellation manager
 * Helps manage request cancellation tokens
 */
class CancelTokenManager {
  private cancelTokens: Map<string, CancelTokenSource> = new Map();

  /**
   * Creates a cancel token for a request
   */
  createCancelToken(requestId: string): CancelTokenSource {
    // Cancel previous request with the same ID if exists
    this.cancel(requestId);

    const cancelToken = axios.CancelToken.source();
    this.cancelTokens.set(requestId, cancelToken);
    return cancelToken;
  }

  /**
   * Cancels a request by ID
   */
  cancel(requestId: string): void {
    const cancelToken = this.cancelTokens.get(requestId);
    if (cancelToken) {
      cancelToken.cancel(`Request ${requestId} was cancelled`);
      this.cancelTokens.delete(requestId);
    }
  }

  /**
   * Cancels all pending requests
   */
  cancelAll(): void {
    this.cancelTokens.forEach((cancelToken, requestId) => {
      cancelToken.cancel(`Request ${requestId} was cancelled`);
    });
    this.cancelTokens.clear();
  }

  /**
   * Removes a cancel token (after request completes)
   */
  remove(requestId: string): void {
    this.cancelTokens.delete(requestId);
  }

  /**
   * Gets the number of pending requests
   */
  getPendingCount(): number {
    return this.cancelTokens.size;
  }
}

export const cancelTokenManager = new CancelTokenManager();
