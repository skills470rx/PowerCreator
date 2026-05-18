import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("chat router", () => {
  it("should get empty message history for new conversation", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.getHistory({
      otherUserId: 2,
      limit: 50,
    });

    expect(result.success).toBe(true);
    expect(Array.isArray(result.messages)).toBe(true);
  });

  it("should get empty conversations list", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.getConversations();

    expect(result.success).toBe(true);
    expect(Array.isArray(result.conversations)).toBe(true);
  });

  it("should handle message sending with AI response", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      receiverId: 2,
      content: "Hello, can you help me with content writing?",
      isAICreator: true,
    });

    expect(result.success).toBe(true);
    expect(result.userMessage).toBeDefined();
  });

  it("should mark messages as read", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.markAsRead({
      otherUserId: 2,
    });

    expect(result.success).toBe(true);
  });

  it("should reject invalid message content", async () => {
    const ctx = createAuthContext(1);
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.chat.sendMessage({
        receiverId: 2,
        content: "", // Empty content should fail
        isAICreator: true,
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});
