import * as identity from "./types/identity.dto";
import * as card from "./types/card.dto";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Logger } from "tslog";

/**
 * https://docs.usenucleus.io/reference/api-reference
 */
export default class NucleusAPIClient {
  private axiosInstance: AxiosInstance;
  private logger: Logger;

  constructor(private apiKey: string, private isSandbox: boolean, endpoint?: string) {
    const nucleusBaseUrl: string = endpoint ? endpoint : isSandbox
      ? "https://sandbox.usenucleus.io"
      : "https://api.usenucleus.io";
    this.axiosInstance = axios.create({
      baseURL: nucleusBaseUrl,
      timeout: 30000,
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

  async kycDAOMember(request: identity.KYCDAOMemberRequest): Promise<identity.KYCResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/dao/kyc", { ...request, }));
  }

  async kycStatus(walletAddress: string): Promise<identity.KYCStatusResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/kyc/status", {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async submitIdv(walletAddress: string): Promise<identity.SubmitIDVResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/idv", {}, {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async getIdv(walletAddress: string): Promise<identity.GetIDVResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/idv", {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async getUser(walletAddress: string): Promise<identity.UserResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/user", {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async getUserStatus(walletAddress: string): Promise<identity.UserStatusResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/user/status", {
      headers: {
        "x-wallet-address": walletAddress,
      },
    }));
  }

  async associateUserToBusiness(request: identity.AssociateRequest) {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/associateUserToBusiness", { ...request, }));
  }

  async registerDAO(request: identity.RegisterDAORequest): Promise<identity.RegisterDAOResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.post("/identity/dao", { ...request, }));
  }

  async updateDAO(request: identity.UpdateDAORequest) {
    return this.wrapServiceCall(() => this.axiosInstance.patch("/identity/dao", { ...request, }, {
      headers: {
        "x-multisig-address": request.multisigAddress,
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

  async getDAO(multisigAddress: string): Promise<identity.DAOResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/dao", {
      headers: {
        "x-multisig-address": multisigAddress,
      },
    }));
  }

  async getDAOStatus(multisigAddress: string): Promise<identity.DAOStatusResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get("/identity/dao/status", {
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

  async updateConsumerCard(
    request: card.UpdateConsumerCardRequest,
  ): Promise<string> {
    const { cardHolderWalletAddress, ...updateRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.patch("/card/consumer/update", { ...updateRequest }, {
      headers: {
        "x-wallet-address": cardHolderWalletAddress,
      },
    }));
  }

  async deleteConsumerCard(
    request: card.DeleteConsumerCardRequest,
  ): Promise<string> {
    const { cardHolderWalletAddress, ...deleteRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.delete(`/card/consumer/${deleteRequest.cardId}`, {
      headers: {
        "x-wallet-address": cardHolderWalletAddress,
      },
    }));
  }

  async simulateConsumerCardTransaction(
    request: card.SimulateConsumerCardTxsRequest
  ) {
    const { cardHolderWalletAddress, ...simulateRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post('/card/consumer/transactions/simulate', { ...simulateRequest }, {
      headers: {
        "x-wallet-address": cardHolderWalletAddress,
      },
    }));
  }

  /**
   * CORPORATE CARDS Endpoints
   */

  async createCorporateCard(
    request: card.CreateCorporateCardRequest
  ): Promise<card.CorporateCard> {
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
  ): Promise<card.CorporateCard> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/corporate/${request.cardId}`, {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  async listCorporateCards(
    request: card.ListCorporateCardTransactionsRequest
  ): Promise<card.CorporateCard[]> {
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

  async listCorporateCardTransactionsAtDAOLevel(
    request: card.ListCorporateCardTxsForDAORequest
  ): Promise<card.ListCardTxsResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get(`/card/corporate/transactions/list`, {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  async updateCorporateCard(
    request: card.UpdateCorporateCardRequest,
  ): Promise<string> {
    const { daoMultisigAddress, ...updateRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.patch(`/card/corporate/${updateRequest.cardId}`, { ...updateRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async fundCorporateCard(
    request: card.FundCorporateCardRequest,
  ): Promise<string> {
    const { daoMultisigAddress, ...fundRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post(`/card/corporate/fund/${fundRequest.cardId}`, { ...fundRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async withdrawCorporateCard(
    request: card.WithdrawCorporateCardRequest,
  ): Promise<string> {
    const { daoMultisigAddress, ...withdrawRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post(`/card/corporate/withdraw/${withdrawRequest.cardId}`, { ...withdrawRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async deleteCorporateCard(
    request: card.DeleteCorporateCardRequest,
  ): Promise<string> {
    const { daoMultisigAddress, ...deleteRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.delete(`/card/corporate/${deleteRequest.cardId}`, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async simulateCorporateCardTransaction(
    request: card.SimulateCorporateCardTxsRequest
  ) {
    const { daoMultisigAddress, ...simulateRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post('/card/corporate/transactions/simulate', { ...simulateRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }

  async getCardsBalanceForDAO(
    request: card.GetCardsBalanceRequest
  ): Promise<card.GetCardsBalanceResponse> {
    return this.wrapServiceCall(() => this.axiosInstance.get('/card/corporate/balance', {
      headers: {
        "x-multisig-address": request.daoMultisigAddress,
      },
    }));
  }

  async withdraw(
    request: card.WithdrawRequest
  ): Promise<card.WithdrawResponse> {
    const { daoMultisigAddress, ...withdrawRequest } = request;
    return this.wrapServiceCall(() => this.axiosInstance.post('/card/corporate/withdraw', { ...withdrawRequest }, {
      headers: {
        "x-multisig-address": daoMultisigAddress,
      },
    }));
  }
  
  private async wrapServiceCall(serviceCall: () => Promise<AxiosResponse>) {
    try {
      const result: AxiosResponse = await serviceCall();
      return result.data;
    } catch (err) {
      this.logger.error((err as Error).message);
      throw err;
    }
  }
}
