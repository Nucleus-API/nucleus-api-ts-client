import { IsNotEmpty } from "class-validator";

class ConsumerRequest {
  @IsNotEmpty()
  cardHolderWalletAddress!: string;
}

class CorporateRequest {
  @IsNotEmpty()
  daoMultisigAddress!: string;
}

export class CreateConsumerCardRequest extends ConsumerRequest {}

export class CreateCorporateCardRequest extends CorporateRequest {
  cardHolderUserId!: number;

  label!: string;

  spendLimit!: number;

  spendLimitInterval!: string;
}

export class Card {
  cardId!: string;

  walletAddress!: string;

  label!: string;

  last4!: string;

  expiryYear!: number;

  expiryMonth!: number;

  spendLimit?: number;

  spendLimitDuration?: string;
}

export class CorporateCard extends Card {
  fundingSafeTxHash?: string;
}

export class CreateConsumerCardTokenRequest extends ConsumerRequest {}
export class CreateCorporateCardTokenRequest extends CorporateRequest { cardId!: number; }

export class GetConsumerCardRequest extends ConsumerRequest { cardId!: number; }
export class GetCorporateCardRequest extends CorporateRequest { cardId!: number; }

export class ListConsumerCardTransactionsRequest extends ConsumerRequest {}
export class ListCorporateCardTransactionsRequest extends CorporateRequest {}

export class ListConsumerCardTxsRequest extends ConsumerRequest { cardId!: number; }
export class ListCorporateCardTxsRequest extends CorporateRequest { cardId!: number; }
export class ListCorporateCardTxsForDAORequest extends CorporateRequest {}

export class UpdateConsumerCardRequest extends ConsumerRequest {
  cardId!: number;

  label!: string;
}
export class UpdateCorporateCardRequest extends CorporateRequest {
  cardId!: number;

  label?: string;

  spendLimit?: number;

  spendLimitInterval?: string;
}

export class DeleteConsumerCardRequest extends ConsumerRequest { cardId!: number; }
export class DeleteCorporateCardRequest extends CorporateRequest { cardId!: number; }

export class SimulateConsumerCardTxsRequest extends ConsumerRequest {
  cardId!: number;

  amount!: number;
}
export class SimulateCorporateCardTxsRequest extends CorporateRequest {
  cardId!: number;

  amount!: number;
}

export class GetCardsBalanceRequest extends CorporateRequest {}

export class WithdrawRequest extends CorporateRequest {
  quantity!: number;

  description!: string;

  requestingUserId?: number;
}
export class WithdrawResponse {
  status!: string;

  estimatedGasFees!: number;

  txnType!: string;

  quantity!: number;
}

export class ListCardTxsResponse {
  txnType!: string;

  merchant!: Merchant;

  amount!: number;

  status!: string;

  createdAt!: string;

  txnDate!: string;
}

export class Merchant {
  merchantName!: string;

  merchantCity!: string;

  merchantState!: number;

  merchantCountry!: string;

  merchantCategory!: string;

  merchantCategoryCode!: string;
}

export class GetCardsBalanceResponse {
  cryptoBalance!: number;

  usdBalance!: number;

  currency!: string;
}