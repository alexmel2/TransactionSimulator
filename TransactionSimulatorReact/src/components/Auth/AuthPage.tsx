import React, { useState } from 'react';
import { authService } from '../../services/authService';

interface AuthPageProps {
    onAuthSuccess: (token: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // סטייט לפופ-אפ המעוצב של ההרשמה המוצלחת
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            if (isLogin) {
                const data = await authService.login(username, password);
                onAuthSuccess(data.token || data); 
            } else {
                await authService.register(username, email, password);
                
                // במקום ה-alert הישן: פותחים את הפופ-אפ המעוצב
                setShowSuccessModal(true);
            }
        } catch (error: any) {
            console.error("Auth error:", error);
            setErrorMessage(error.message || "An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // פונקציה לסגירת הפופ-אפ ומעבר חלק למסך ה-Login
    const handleModalClose = () => {
        setShowSuccessModal(false);
        setIsLogin(true); // מעביר אוטומטית למסך ההתחברות
        setEmail('');     // מנקה את השדות הישנים
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col justify-center items-center px-6 font-sans relative">
            <div className="text-4xl font-black italic text-[#00a3e0] tracking-tighter mb-8">
                shva<span className="text-gray-200">.</span>simulator
            </div>

            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-[#2D1F5B] tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                        {isLogin ? 'Enter your details to access the simulator' : 'Sign up to start simulating transactions'}
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-5 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-semibold rounded-xl">
                        ⚠️ {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7B61FF] bg-gray-50/50 text-[#2D1F5B]"
                                placeholder="alex@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7B61FF] bg-gray-50/50 text-[#2D1F5B]"
                            placeholder="alex_melnik"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7B61FF] bg-gray-50/50 text-[#2D1F5B]"
                            placeholder="••••••••"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 bg-[#7B61FF] text-white font-bold rounded-xl shadow-md transition-all transform mt-4 ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#684ee3] hover:-translate-y-0.5'
                        }`}
                    >
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm">
                    <span className="text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setErrorMessage(null); }}
                        className="text-[#7B61FF] font-bold hover:underline bg-transparent border-none p-0"
                        disabled={isLoading}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>

            {/* === פופ-אפ מעוצב עבור הרשמה מוצלחת === */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-2xl max-w-sm w-full text-center space-y-5 transform scale-100 transition-all">
                        
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl text-emerald-500">
                                🎉
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-[#2D1F5B]">
                                Account Created!
                            </h3>
                            <p className="text-sm text-gray-400">
                                Your simulator profile is ready. You can now log in using your credentials.
                            </p>
                        </div>

                        <button
                            onClick={handleModalClose}
                            className="w-full py-3 font-bold rounded-xl text-white bg-[#7B61FF] hover:bg-[#684ee3] transition-colors shadow-sm"
                        >
                            Proceed to Sign In
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};