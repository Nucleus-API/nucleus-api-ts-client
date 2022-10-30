import { IsNotEmpty } from "class-validator";

export class KYCResponse {
  userId!: number;
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

export class KYCDAOMemberRequest extends KYCRequest {}

export class AssociateRequest {
  @IsNotEmpty()
  daoId!: number;

  @IsNotEmpty()
  userId!: number;
}

export class RegisterDAORequest {
  @IsNotEmpty()
  multisigAddress!: string;

  @IsNotEmpty()
  ownerUserId!: number;
}

export class UpdateDAORequest {
  @IsNotEmpty()
  multisigAddress!: string;

  @IsNotEmpty()
  newMultisigAddress!: string;
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

export class SubmitIDVResponse {
  link?: string;
}

export class GetIDVResponse {
  link?: string;

  submitted?: boolean;
}

export class UserResponse {
  id!: number;

  walletAddress!: string;

  consumerCardHolder!: boolean;

  corporateCardHolder!: boolean;
}

export class DAOResponse {
  id!: number;

  multisigAddress!: string;

  hasSuportedIncorporation!: boolean;

  ownerUserId!: number;
}

export class UserStatusResponse {
  kyc!: string;

  provisioningStatus!: ProvisioningStatus
}

export class DAOStatusResponse {
  kyb!: string;

  provisioningStatus!: boolean;
}

export class ProvisioningStatus {
  individualDAOCard?: boolean;

  corporateDAOCard?: boolean;

  consumerCard?: boolean;
}