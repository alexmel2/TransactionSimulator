import axios, { AxiosInstance } from 'axios';
import { Transaction, Region } from '../models/transaction.model';

const API_BASE_URL = 'https://localhost:7171/api'; 

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
export const transactionService = {
    
    getRegions: async (): Promise<Region[]> => {
        const response = await apiClient.get<Region[]>('/transactions/regions');
        return response.data;
    },

    // שליפת היסטוריית העסקאות (המערך ששלחת)
    getTransactions: async (page: number = 1, pageSize: number = 10): Promise<Transaction[]> => {
        try {
            const response = await apiClient.get<Transaction[]>(
                `/transactions/GetApprovedTransactions?page=${page}&pageSize=${pageSize}`
            );
            return response.data;
        } catch (error) {
            console.error("Error in getTransactions:", error);
            return []; 
        }
    },

  createAndSendTransaction: async (regionId: number, hour: string, minute: string): Promise<Transaction> => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hour), parseInt(minute));
    console.log("hour:", hour); 
    console.log("minute:", minute); 
    console.log("date:", date); 

    const payload = {
        TransactionId: crypto.randomUUID(),
        RegionId: regionId,
        SubmittedTimeUtc: date.toISOString(), 
        Status: "Pending"
    };

    console.log("Sending payload:", payload); 
    const response = await apiClient.post<Transaction>('/transactions/CreateTransaction', payload);
    return response.data;
}
};