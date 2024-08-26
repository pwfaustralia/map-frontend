interface AccountData {
  account?: Account[];
}

interface Account {
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

interface CurrencyAmount {
  currency: string;
  amount: number;
}

interface Dataset {
  name: string;
  additionalStatus: string;
  updateEligibility: string;
  lastUpdated: string;
  lastUpdateAttempt: string;
  nextUpdateScheduled?: string;
}
