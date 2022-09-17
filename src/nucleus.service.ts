import * as types from "./nucleus.dto";
import axios, { AxiosInstance } from "axios";
import { Logger } from "tslog";

/**
 * https://docs.usenucleus.io/reference/api-reference
 */
export class NucleusService {
  private axiosInstance: AxiosInstance;
  private logger: Logger;

  constructor(private apiKey: string, private isSandbox: boolean) {
    const nucleusBaseUrl: string = isSandbox
      ? "https://sandbox.usenucleus.io"
      : "https://api.usenucleus.io";
    this.axiosInstance = axios.create({
      baseURL: nucleusBaseUrl,
      timeout: 5000,
      headers: {
        "x-api-key": apiKey,
      },
    });
    this.logger = new Logger({ name: "NucleusApiClient" });
  }

  async kyc(request: types.KYCRequest): Promise<types.KYCResponse> {
    try {
      const result = await this.axiosInstance.post("/identity/kyc", {
        ...request,
      });
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async kycStatus(walletAddress: string): Promise<types.KYCStatusResponse> {
    try {
      const result = await this.axiosInstance.get("/identity/kyc/status", {
        headers: {
          "x-wallet-address": walletAddress,
        },
      });
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async createConsumerCard(
    request: types.CreateConsumerCardRequest
  ): Promise<types.ConsumerCard> {
    try {
      const result = await this.axiosInstance.post(
        "/card/consumer/create",
        { ...request },
        {
          headers: {
            "x-wallet-address": request.cardholderWalletAddress,
          },
        }
      );
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async createConsumerCardToken(
    request: types.CreateConsumerCardRequest
  ): Promise<string> {
    try {
      const result = await this.axiosInstance.post(
        "/card/consumer/create",
        { ...request },
        {
          headers: {
            "x-wallet-address": request.cardholderWalletAddress,
          },
        }
      );
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async createCardToken(cardholderWalletAddress: string): Promise<string> {
    try {
      const result = await this.axiosInstance.post(
        "/card/consumer/cardToken",
        {},
        {
          headers: {
            "x-wallet-address": cardholderWalletAddress,
          },
        }
      );
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async getCard(
    request: types.GetConsumerCardRequest
  ): Promise<types.ConsumerCard> {
    try {
      const result = await this.axiosInstance.get(
        `/card/consumer/${request.cardId}`,
        {
          headers: {
            "x-wallet-address": request.cardHolderWalletAddress,
          },
        }
      );
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async listCards(
    cardHolderWalletAddress: string
  ): Promise<types.ConsumerCard[]> {
    try {
      const result = await this.axiosInstance.get("/card/consumer/list", {
        headers: {
          "x-wallet-address": cardHolderWalletAddress,
        },
      });
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }

  async listTransactions(
    request: types.ListCardTransactionsRequest
  ): Promise<types.ListCardTransactionsResponse> {
    try {
      const result = await this.axiosInstance.get(
        `/card/consumer/transactions/list/${request.cardId}`,
        {
          headers: {
            "x-wallet-address": request.cardHolderWalletAddress,
          },
        }
      );
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw new Error(err);
    }
  }
}
