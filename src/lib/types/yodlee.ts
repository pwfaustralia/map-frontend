export interface YodleeFetchData {
  url: string;
  before?(): Promise<void> | void;
  after?(data: any): Promise<void> | void;
}

export interface AccountData {
  account?: Account[];
}

export interface Account {
  CONTAINER: string;
  providerAccountId: number;
  accountName: string;
  accountStatus: string;
  accountNumber: string;
  aggregationSource: string;
  isAsset: boolean;
  balance: CurrencyAmount;
  id: number;
  userClassification: string;
  includeInNetWorth: boolean;
  providerId: string;
  providerName: string;
  isManual: boolean;
  availableBalance?: CurrencyAmount;
  currentBalance?: CurrencyAmount;
  accountType: string;
  displayedName: string;
  createdDate: string;
  classification?: string;
  lastUpdated: string;
  dataset: Dataset[];
  dueDate?: string;
  interestRateType?: string;
  lastPaymentDate?: string;
  maturityDate?: string;
  originalLoanAmount?: CurrencyAmount;
  principalBalance?: CurrencyAmount;
  originationDate?: string;
  frequency?: string;
  cash?: CurrencyAmount;
  marginBalance?: CurrencyAmount;
  lastEmployeeContributionAmount?: CurrencyAmount;
  lastEmployeeContributionDate?: string;
  cashApr?: number;
  availableCash?: CurrencyAmount;
  availableCredit?: CurrencyAmount;
  lastPaymentAmount?: CurrencyAmount;
  runningBalance?: CurrencyAmount;
  totalCashLimit?: CurrencyAmount;
  totalCreditLine?: CurrencyAmount;
  amountDue?: CurrencyAmount;
  minimumAmountDue?: CurrencyAmount;
  annualPercentageYield?: number;
  interestRate?: number;
}

export interface CurrencyAmount {
  currency: string;
  amount: number;
}

export interface Dataset {
  name: string;
  additionalStatus: string;
  updateEligibility: string;
  lastUpdated: string;
  lastUpdateAttempt: string;
  nextUpdateScheduled?: string;
}

export interface TransactionFilter {
  accountId?: string; // Comma separated accountIds
  baseType?: string; // DEBIT/CREDIT
  categoryId?: string; // Comma separated categoryIds
  categoryType?: string; // Transaction Category Type (LOAN, UNCATEGORIZE, INCOME, TRANSFER, EXPENSE, DEFERRED_COMPENSATION)
  container?: string; // bank/creditCard/investment/insurance/loan
  convertToCurrency?: string; // On-demand currency conversion parameter
  detailCategoryId?: string; // Comma separated detailCategoryIds
  fromDate?: string; // Transaction from date (YYYY-MM-DD)
  highLevelCategoryId?: string; // Comma separated highLevelCategoryIds
  keyword?: string; // Transaction search text
  skip?: number; // skip (Min 0)
  toDate?: string; // Transaction end date (YYYY-MM-DD)
  top?: number; // Limit results
}

export interface Transaction {
  CONTAINER: string; // Example: "bank"
  id: number; // Transaction ID
  amount: {
    amount: number;
    currency: string; // Example: "USD"
  };
  categoryType: string; // Example: "UNCATEGORIZE"
  categoryId: number; // Example: 1
  category: string; // Example: "Uncategorised"
  categorySource: string; // Example: "SYSTEM"
  highLevelCategoryId: number; // Example: 10000017
  createdDate: string; // ISO 8601 date string, Example: "2024-08-26T17:48:09Z"
  lastUpdated: string; // ISO 8601 date string, Example: "2024-08-26T17:48:09Z"
  description: {
    original: string; // Original transaction description
  };
  isManual: boolean; // Example: false
  sourceType: string; // Example: "AGGREGATED"
  date: string; // Transaction date, Example: "2024-08-25"
  transactionDate: string; // Transaction date, Example: "2024-08-25"
  postDate: string; // Post date, Example: "2024-08-25"
  status: string; // Transaction status, Example: "POSTED"
  accountId: number; // Example: 11176106
  runningBalance: {
    amount: number;
    currency: string; // Example: "USD"
  };
  checkNumber?: string; // Example: "998"
}

export interface TransactionData {
  transaction: Transaction[];
}

export interface TransactionCount {
  transaction: {
    TOTAL: {
      count: number;
    };
  };
}

export type YodleEntities = 'accounts' | 'transactions' | 'categories';

export type YodleeInitConfig = {
  [key in YodleEntities]?: key extends 'transactions' ? TransactionFilter : boolean;
};

export interface ErrorResponse {
  errorCode: string; // Example: 'Y008'
  errorMessage: string; // Example: 'Invalid token in authorization header'
  referenceCode: string; // Example: 'cbad3067-3b22-416a-81b9-9be5858d23e534743'
}

export interface UserYodleeToken {
  accessToken: string;
  issuedAt: string; // You can use Date if you prefer to parse it as a Date object.
  expiresIn: number;
}

export interface UserYodleeTokenResponse {
  token: UserYodleeToken;
  username: string;
  error?: any;
}

export type DetailCategory = {
  id: number;
  name: string;
};

export interface TransactionCategory {
  id: number;
  source: string;
  classification: string;
  category: string;
  type: string;
  detailCategory?: DetailCategory[]; // Optional, as it may not always be present
  highLevelCategoryId: number;
  highLevelCategoryName: string;
  defaultCategoryName: string;
  defaultHighLevelCategoryName: string;
}

export interface TransactionCategoryData {
  transactionCategory: TransactionCategory[];
}
