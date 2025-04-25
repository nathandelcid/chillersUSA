"use server";

import { randomUUID } from "crypto";

const { SquareClient, SquareEnvironment, SquareError } = require("square");

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new SquareClient({
    token: "EAAAl-1xJmWGlhOpkNoxolmW1B2UttmeBlUhotn_rLSdik4EvuvUKAohqfr3TRHb",
    environment: SquareEnvironment.Sandbox,
  });

export async function submitPayment(sourceId, amount) {
    try {
      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        sourceId,
        amountMoney: {
          currency: "USD",
          amount: Math.round(amount * 100), // Convert dollars to cents
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error so we can handle it in the UI
    }
  }