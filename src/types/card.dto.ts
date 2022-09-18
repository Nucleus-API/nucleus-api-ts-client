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

  spendLimitDuration!: string;
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

export class CreateConsumerCardTokenRequest extends ConsumerRequest {}
export class CreateCorporateCardTokenRequest extends CorporateRequest { cardId!: number; }

export class GetConsumerCardRequest extends ConsumerRequest { cardId!: number; }
export class GetCorporateCardRequest extends CorporateRequest { cardId!: number; }

export class ListConsumerCardTransactionsRequest extends ConsumerRequest {}
export class ListCorporateCardTransactionsRequest extends CorporateRequest {}

export class ListConsumerCardTxsRequest extends ConsumerRequest { cardId!: number; }
export class ListCorporateCardTxsRequest extends CorporateRequest { cardId!: number; }

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