// src/utils/errorHandler.ts

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

/**
 * Standard API Error Response Interface
 */
export interface APIError {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/**
 * Standard API Success Response Interface
 */
export interface APISuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Custom Application Error Class
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR",
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Error Handler Utility Class
 */
export class ErrorHandler {
  /**
   * Handles different types of errors and returns appropriate NextResponse
   */
  static handleError(error: unknown): NextResponse<APIError> {
    console.error("API Error:", error);

    // Handle custom application errors
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: error.message,
            code: error.code,
            details: error.details,
          },
        },
        { status: error.statusCode }
      );
    }

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: error.issues.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.handlePrismaError(error);
    }

    // Handle JWT errors
    if (error instanceof Error) {
      if (error.name === "JsonWebTokenError") {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid token",
              code: "INVALID_TOKEN",
            },
          },
          { status: 401 }
        );
      }

      if (error.name === "TokenExpiredError") {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Token expired",
              code: "TOKEN_EXPIRED",
            },
          },
          { status: 401 }
        );
      }
    }

    // Handle generic errors
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Internal server error",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }

  /**
   * Handles Prisma-specific errors
   */
  private static handlePrismaError(
    error: Prisma.PrismaClientKnownRequestError
  ): NextResponse<APIError> {
    switch (error.code) {
      case "P2002":
        // Unique constraint violation
        const field = error.meta?.target as string[];
        return NextResponse.json(
          {
            success: false,
            error: {
              message: `${field?.[0] || "Field"} already exists`,
              code: "DUPLICATE_ENTRY",
              details: { field: field?.[0] },
            },
          },
          { status: 409 }
        );

      case "P2025":
        // Record not found
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Record not found",
              code: "NOT_FOUND",
            },
          },
          { status: 404 }
        );

      default:
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Database error",
              code: "DATABASE_ERROR",
            },
          },
          { status: 500 }
        );
    }
  }

  /**
   * Creates a success response
   */
  static success<T>(
    data: T,
    message?: string,
    status: number = 200
  ): NextResponse<APISuccess<T>> {
    return NextResponse.json(
      {
        success: true,
        data,
        message,
      },
      { status }
    );
  }
}
