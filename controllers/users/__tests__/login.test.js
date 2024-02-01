import User from "#models/userSchema.js";
import jwt from "jsonwebtoken";
import { schema } from "#validation/validation.js";
import { login } from "#controllers/users/index.js";
import { jest, describe, test, expect } from "@jest/globals";

jest.mock("#models/userSchema.js");
jest.mock("jsonwebtoken");
jest.mock("#validation/validation.js");

describe("user login function", () => {
  const mockRequest = {
    body: {
      email: "example@example.com",
      password: "examplePassword",
    },
  };
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // Successful login
  test("should return a token when user data is valid", async () => {
    schema.validate.mockReturnValue(mockRequest);
    User.findOne.mockResolvedValue({
      id: "123",
      email: "example@example.com",
      validPassword: jest.fn().mockResolvedValue(true),
      subscription: "starter",
      avatarURL: "mockedAvatarURL",
    });

    jwt.sign.mockReturnValue("mockedToken");

    await login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Success",
      code: 200,
      data: {
        token: "mockedToken",
      },
    });
  });

  // Login failed
  test("should return an error when login details are incorrect", async () => {
    schema.validate.mockReturnValue(mockRequest);
    User.findOne.mockResolvedValue(null);

    const req = {
      body: {
        email: "wrong@example.com",
        password: "wrongPassword",
      },
    };

    await login(req, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Unauthorized",
      code: 401,
      message: "Email or password is wrong",
    });
  });

  // Validation test

  test("should respond with 400 status if validation fails", async () => {
    // Symulacja błędu walidacji
    schema.validate.mockReturnValue({
      error: { details: [{ message: "Invalid input" }] },
    });

    await login(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid input",
    });
  });
});
