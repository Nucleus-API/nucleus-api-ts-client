import { IsNotEmpty } from "class-validator";

export class KYCResponse {
  userId!: string;
}

export class KYCRequest {
  @IsNotEmpty()
  walletAddress!: string;

  @IsNotEmpty()
  firstName!: string;

  middleName?: string;

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
  idNumber!: string;

  address!: Address;
}

export class RegisterDAORequest {
  @IsNotEmpty()
  multisigAddress!: string;

  @IsNotEmpty()
  ownerUserId!: number;
}

export class RegisterDAOResponse {
  daoId!: number;
}

export class KYBRequest {
  @IsNotEmpty()
  associatedDAOId!: number;

  @IsNotEmpty()
  legalName!: string;

  @IsNotEmpty()
  entityType!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  idType!: string;

  @IsNotEmpty()
  idNumber!: string;

  @IsNotEmpty()
  formationDate!: string;

  @IsNotEmpty()
  address!: Address;

  @IsNotEmpty()
  phone!: string;
}

export class Address {
  @IsNotEmpty()
  line1!: string;

  line2?: string;

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
  status!: string;
}

export class KYBStatusResponse {
  status!: string;
}