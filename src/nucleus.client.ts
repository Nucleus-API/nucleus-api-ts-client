import * as identity from "types/identity.dto";
import * as card from ".//types/card.dto";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Logger } from "tslog";

/**
 * https://docs.usenucleus.io/reference/api-reference
 */
export default class NucleusAPIClient {
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
    this.logger = new Logger({ name: "NucleusAPIClient" });
  }

  /**
   * IDENTITY Endpoints
   */

  async kyc(request: identity.KYCRequest): Promise<identity.KYCResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/kyc", { ...request, }));
  }

  async kycStatus(walletAddress: string): Promise<identity.KYCStatusResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/kyc/status", {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async kyb(request: identity.KYBRequest) {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/kyb", { ...request, }));
  }

  async kybStatus(multisigAddress: string): Promise<identity.KYBStatusResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/kyb/status", {
      headers: {
        "x-multisig-address": multisigAddress,
      },
    }));
  }


  /**
   * CONSUMER CARDS Endpoints
   */

  async createConsumerCard(
    request: card.CreateConsumerCardRequest
  ): Promise<card.Card> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/card/consumer/create", {}, {
      headers: {
        "x-wallet-address": request.cardHolderWalletAddress,
      },
    }));
  }

  async createConsumerCardToken(
    request: card.CreateConsumerCardTokenRequest
  ): Promise<string> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/card/consumer/cardToken", {}, {
      headers: {
        "x-wallet-address": request.cardHolderWalletAddress,
      },
    }));
  }

  async getConsumerCard(
    request: card.GetConsumerCardRequest
  ): Promise<card.Card> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/consumer/${request.cardId}`, {
      headers: {
        "x-wallet-address": request.cardHolderWalletAddress,
      },
    }));
  }

  async listConsumerCards(
    request: card.ListConsumerCardTransactionsRequest
  ): Promise<card.Card[]> {
    return this.wrapServiceCall(() => this.axiosInstance.get('/card/consumer/list', {
      headers: {
        "x-wallet-address": request.cardHolderWalletAddress,
      },
    }));
  }


  async listConsumerCardTransactions(
    request: card.ListConsumerCardTxsRequest
  ): Promise<card.ListCardTxsResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/consumer/transactions/list/${request.cardId}`, {
      headers: {
        "x-wallet-address": request.cardHolderWalletAddress,
      },
    }));
  }

  /**
   * CORPORATE CARDS Endpoints
   */

  async createCorporateCard(
    request: card.CreateCorporateCardRequest
  ): Promise<card.Card> {
    const { daoMultisigAddress, ...cardRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post("/card/corporate/create", { ...cardRequest, }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async createCorporateCardToken(
    request: card.CreateCorporateCardTokenRequest,
  ): Promise<string> {
    const { daoMultisigAddress, ...tokenRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post("/card/corporate/cardToken", { ...tokenRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async getCorporateCard(
    request: card.GetCorporateCardRequest
  ): Promise<card.Card> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/corporate/${request.cardId}`, {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  async listCorporateCards(
    request: card.ListCorporateCardTransactionsRequest
  ): Promise<card.Card[]> {
    return this.wrapServiceCall(() => this.axiosInstance.get('/card/corporate/list', {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  async listCorporateCardTransactions(
    request: card.ListCorporateCardTxsRequest
  ): Promise<card.ListCardTxsResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/corporate/transactions/list/${request.cardId}`, {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  
  private async wrapServiceCall(serviceCall: () => Promise<AxiosResponse>) {
    try {
      const result: AxiosResponse = await serviceCall();
      return result.data;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
