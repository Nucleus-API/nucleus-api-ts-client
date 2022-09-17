import { IsNotEmpty } from "class-validator";

export class KYCResponse {
  userId: string;
}

export class KYCRequest {
  @IsNotEmpty()
  walletAddress!: string;

  @IsNotEmpty()
  firstName!: string;

  middleName: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  phone!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  dateOfBirth!: string;

  @IsNotEmpty()
  idType!: string;

  @IsNotEmpty()
  idNumber: string;

  address!: Address;
}

export class Address {
  @IsNotEmpty()
  line1!: string;

  line2: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  state!: string;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  postalCode!: string;
}

export class KYCStatusResponse {
  status: string;
}

enum CardType {
  PHYSICAL,
  VIRTUAL,
}
export class CreateConsumerCardRequest {
  @IsNotEmpty()
  type: CardType;

  label: string;

  shippingAddress: Address;

  cardholderWalletAddress: string;
}

export class ConsumerCard {
  cardId: string;

  walletAddress: string;

  label: string;

  last4: string;

  expiryYear: number;

  expiryMonth: number;
}

export class CreateConsumerCardTokenRequest {
  @IsNotEmpty()
  type: CardType;

  label: string;

  shippingAddress: Address;

  cardholderWalletAddress: string;
}

export class GetConsumerCardRequest {
  @IsNotEmpty()
  cardHolderWalletAddress: string;

  @IsNotEmpty()
  cardId: string;
}

export class ListCardTransactionsRequest {
  @IsNotEmpty()
  cardHolderWalletAddress: string;

  @IsNotEmpty()
  cardId: string;
}

export class ListCardTransactionsResponse {
  txnType: string;

  merchant: Merchant;

  amount: number;

  status: string;

  createdAt: string;

  txnDate: string;
}

export class Merchant {
  merchantName: string;

  merchantCity: string;

  merchantState: number;

  merchantCountry: string;

  merchantCategory: string;

  merchantCategoryCode: string;
}
