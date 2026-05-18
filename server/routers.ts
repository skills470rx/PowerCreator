import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getMessageHistory, saveMessage, getConversations, markMessagesAsRead, getCreatorInfo } from "./db";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Chat Router
  chat: router({
    // Get message history between two users
    getHistory: protectedProcedure
      .input(z.object({
        otherUserId: z.number(),
        limit: z.number().default(50),
      }))
      .query(async ({ ctx, input }) => {
        try {
          const messages = await getMessageHistory(ctx.user.id, input.otherUserId, input.limit);
          return {
            success: true,
            messages: messages || [],
          };
        } catch (error) {
          console.error("Error fetching message history:", error);
          return {
            success: false,
            messages: [],
            error: "Failed to fetch message history",
          };
        }
      }),

    // Get all conversations for the user
    getConversations: protectedProcedure.query(async ({ ctx }) => {
      try {
        const conversations = await getConversations(ctx.user.id);
        return {
          success: true,
          conversations: conversations || [],
        };
      } catch (error) {
        console.error("Error fetching conversations:", error);
        return {
          success: false,
          conversations: [],
          error: "Failed to fetch conversations",
        };
      }
    }),

    // Send a message and get AI response
    sendMessage: protectedProcedure
      .input(z.object({
        receiverId: z.number(),
        content: z.string().min(1).max(5000),
        isAICreator: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          // Save user's message
          const userMessage = await saveMessage({
            senderId: ctx.user.id,
            receiverId: input.receiverId,
            content: input.content,
            isRead: false,
          });

          if (!userMessage) {
            return {
              success: false,
              error: "Failed to save message",
            };
          }

          // If receiver is an AI Creator, generate AI response
          let aiResponse = null;
          if (input.isAICreator) {
            try {
              // Get creator info for context
              const creatorInfo = await getCreatorInfo(input.receiverId);
              
              // Generate AI response using LLM
              const llmResponse = await invokeLLM({
                messages: [
                  {
                    role: "system",
                    content: `You are ${creatorInfo?.bio || "an AI Creator"}. You are professional, helpful, and respond to client inquiries about your services. Keep responses concise and friendly.`,
                  },
                  {
                    role: "user",
                    content: input.content,
                  },
                ],
              });

              const messageContent = llmResponse.choices?.[0]?.message?.content;
              const aiContent = typeof messageContent === "string" 
                ? messageContent 
                : "Thank you for your message. I'll get back to you shortly.";

              // Save AI response
              aiResponse = await saveMessage({
                senderId: input.receiverId,
                receiverId: ctx.user.id,
                content: aiContent,
                isRead: false,
              });
            } catch (error) {
              console.error("Error generating AI response:", error);
              // Return user message even if AI response fails
            }
          }

          return {
            success: true,
            userMessage,
            aiResponse,
          };
        } catch (error) {
          console.error("Error sending message:", error);
          return {
            success: false,
            error: "Failed to send message",
          };
        }
      }),

    // Mark messages as read
    markAsRead: protectedProcedure
      .input(z.object({
        otherUserId: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        try {
          const success = await markMessagesAsRead(ctx.user.id, input.otherUserId);
          return {
            success,
          };
        } catch (error) {
          console.error("Error marking messages as read:", error);
          return {
            success: false,
            error: "Failed to mark messages as read",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
