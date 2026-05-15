import React, { useState, useEffect } from 'react';
import { transactionService } from './services/transactionService';
import { Transaction, Region } from './models/transaction.model';
import { TransactionForm } from './components/Transaction/TransactionForm';
import { TransactionList } from './components/Transaction/TransactionList';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AuthPage } from './components/Auth/AuthPage';

// הגדרת טיפוס למצב הפופ-אפ
interface NotificationModal {
    isOpen: boolean;
    type: 'Approved' | 'Rejected' | 'Error';
    message: string;
}

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    const [regions, setRegions] = useState<Region[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // סטייט חדש לניהול פופ-אפ ההתראות המעוצב
    const [modal, setModal] = useState<NotificationModal>({
        isOpen: false,
        type: 'Approved',
        message: ''
    });

    // שליפת טוקן קיים בטעינת הדף (מניעת התנתקות ברענון)
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken) {
            setIsAuthenticated(true);
        }
    }, []);

    // שאיבת נתוני סימולטור - רק לאחר התחברות מוצלחת
    useEffect(() => {
        if (!isAuthenticated) return;

        const loadInitialData = async () => {
            setIsLoadingInitial(true);
            try {
                const [regionsData, transactionsData] = await Promise.all([
                    transactionService.getRegions(),
                    transactionService.getTransactions()
                ]);

                setRegions(regionsData);
                setTransactions(transactionsData || []);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoadingInitial(false);
            }
        };

        loadInitialData();
    }, [isAuthenticated]);

    // טיפול בשמירת טוקן ומעבר למסך Dashboard
    const handleAuthSuccess = (token: string) => {
        localStorage.setItem('auth_token', token);
        setIsAuthenticated(true);
    };

    const handleTransactionSubmit = async (regionId: number, hour: string, minute: string) => {
        setIsSubmitting(true);
        try {
            const result = await transactionService.createAndSendTransaction(regionId, hour, minute);
            const updatedTransactions = await transactionService.getTransactions();
            setTransactions(updatedTransactions || []);
            
            // במקום ה-alert הישן: פתיחת הפופ-אפ המעוצב
            if (result.status === "Approved") {
                setModal({
                    isOpen: true,
                    type: 'Approved',
                    message: 'The transaction has been successfully processed and approved.'
                });
            } else {
                setModal({
                    isOpen: true,
                    type: 'Rejected',
                    message: 'The transaction was rejected based on regional rules or banking hours.'
                });
            }
        } catch (error) {
            console.error("Submit error:", error);
            setModal({
                isOpen: true,
                type: 'Error',
                message: 'Failed to establish connection with the API simulator.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
    };

    if (!isAuthenticated) {
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-sans relative">
            <nav className="flex justify-between items-center px-12 py-8 bg-white border-b border-gray-100">
                <div className="text-3xl font-black italic text-[#00a3e0] tracking-tighter">
                    shva<span className="text-gray-200">.</span>simulator
                </div>
                <button 
                    onClick={handleLogout}
                    className="text-sm font-bold text-gray-400 hover:text-rose-500 transition-colors"
                >
                    Sign Out
                </button>
            </nav>

            <main className="max-w-7xl mx-auto pt-20 px-8">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-24">
                    <TransactionForm 
                        regions={regions} 
                        onSubmit={handleTransactionSubmit} 
                        isSubmitting={isSubmitting} 
                    />
                    
                    <div className="flex-1 pt-4 text-[#2D1F5B]">
                        <h1 className="text-7xl font-black leading-[1] mb-8 tracking-tighter">
                            Check Bank <br />
                            <span className="text-[#7B61FF]">Availability.</span>
                        </h1>
                        <p className="text-gray-500 text-xl max-w-xl">
                            Validation of global transactions based on regional business hours and time zones.
                        </p>
                    </div>
                </div>

                <section className="mt-32">
                    <Dashboard 
                        transactions={transactions} 
                        isLoading={isLoadingInitial} 
                    />
                </section>

                <section className="mt-32 mb-20">
                    <TransactionList 
                        transactions={transactions} 
                        isLoading={isLoadingInitial} 
                    />
                </section>
            </main>

            {/* === קומפוננטת הפופ-אפ המודרנית (Modal) === */}
            {modal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-2xl max-w-sm w-full text-center space-y-5 transform scale-100 transition-all">
                        
                        {/* האייקון הויזואלי משתנה לפי סוג התגובה */}
                        <div className="flex justify-center">
                            {modal.type === 'Approved' && (
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl text-emerald-500">
                                    ✅
                                </div>
                            )}
                            {modal.type === 'Rejected' && (
                                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-3xl text-rose-500">
                                    ❌
                                </div>
                            )}
                            {modal.type === 'Error' && (
                                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-3xl text-amber-500">
                                    ⚠️
                                </div>
                            )}
                        </div>

                        {/* תוכן הטקסט */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-[#2D1F5B]">
                                {modal.type === 'Approved' && "Transaction Approved"}
                                {modal.type === 'Rejected' && "Transaction Rejected"}
                                {modal.type === 'Error' && "Connection Error"}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {modal.message}
                            </p>
                        </div>

                        {/* כפתור סגירה התואם לעיצוב הכללי */}
                        <button
                            onClick={() => setModal({ ...modal, isOpen: false })}
                            className={`w-full py-3 font-bold rounded-xl transition-colors shadow-sm ${
                                modal.type === 'Approved' 
                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                                    : modal.type === 'Rejected'
                                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                            }`}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;