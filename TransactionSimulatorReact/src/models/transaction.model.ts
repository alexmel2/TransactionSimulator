export enum TransactionStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
    Error = 'Error'
}

export interface Region {
    id: number;
    name: string;
    timeZoneId: string;
}

export interface Transaction {
    id: number;
    transactionId: string;
    regionId: number;
    region: Region; // הוספנו את האובייקט המקונן
    submittedTime: string; // השם המדויק מה-API
    status: string;
    createdAtUtc: string;
}

export interface TransactionsResponse {
    data: Transaction[];
    pagination: {
        totalPages: number;
        currentPage: number;
    };
}