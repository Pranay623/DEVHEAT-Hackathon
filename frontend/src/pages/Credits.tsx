import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { CreditCard, Plus, ArrowUp, ArrowDown, Clock, CheckCircle, AlertTriangle } from 'react-feather';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const Credits: React.FC = () => {
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(100);

  // Sample transactions - in a real app, you'd fetch these from an API
  const sampleTransactions: Transaction[] = [
    {
      id: 'tx-001',
      type: 'credit',
      amount: 300,
      description: 'Welcome bonus',
      date: '2024-03-25T12:00:00Z',
      status: 'completed'
    },
    {
      id: 'tx-002',
      type: 'debit',
      amount: 30,
      description: 'Frontend React Interview',
      date: '2024-03-28T14:30:00Z',
      status: 'completed'
    },
    {
      id: 'tx-003',
      type: 'debit',
      amount: 50,
      description: 'System Design Interview',
      date: '2024-04-01T09:15:00Z',
      status: 'completed'
    },
    {
      id: 'tx-004',
      type: 'credit',
      amount: 150,
      description: 'Credit purchase',
      date: '2024-04-03T16:45:00Z',
      status: 'completed'
    },
    {
      id: 'tx-005',
      type: 'debit',
      amount: 30,
      description: 'JavaScript Advanced Test',
      date: '2024-04-05T11:20:00Z',
      status: 'completed'
    }
  ];

  useEffect(() => {
    const fetchCredits = async () => {
      setIsLoading(true);
      try {
        const USER_ID = localStorage.getItem('userID');
        if (!USER_ID) throw new Error('User ID not found');
        
        const response = await fetch(`https://devheat-hackathon-14ll.vercel.app/api/credits/points/${USER_ID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch credits');
        }
        
        const data = await response.json();
        setCredits(data.credits || 0);
        
        // In a real app, you'd fetch transactions too
        setTransactions(sampleTransactions);
      } catch (error) {
        console.error('Error fetching credits:', error);
        // Fallback for demo
        setCredits(300);
        setTransactions(sampleTransactions);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCredits();
  }, []);

  const handlePurchaseSubmit = () => {
    if (purchaseAmount <= 0) return;
    
    // In a real app, this would call your payment processing API
    // For demo purposes, we'll just add the credits immediately
    setCredits(credits + purchaseAmount);
    
    // Add a transaction record
    const newTransaction: Transaction = {
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      type: 'credit',
      amount: purchaseAmount,
      description: 'Credit purchase',
      date: new Date().toISOString(),
      status: 'completed'
    };
    
    setTransactions([newTransaction, ...transactions]);
    setShowPurchaseModal(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <CreditCard size={24} className="text-purple-400 mr-2" />
              Credits
            </h1>
            <p className="text-gray-400 mt-1">Manage your interview credits</p>
          </div>
          
          <button 
            onClick={() => setShowPurchaseModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Purchase Credits
          </button>
        </div>
        
        {/* Credit Balance Card */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl shadow-lg border border-purple-900/30 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
              <div>
                <h2 className="text-gray-300 font-medium">Available Credits</h2>
                <div className="flex items-baseline mt-1">
                  <span className="text-4xl font-bold text-white">{credits}</span>
                  <span className="text-purple-300 ml-2">credits</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-400">Credits can be used for:</p>
                <ul className="text-sm text-purple-300 mt-1">
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Mock Interviews
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    AI Interview Sessions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Specialized Tests
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-purple-900/30">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">30 credits ≈ 1 mock interview session</span>
                <span className="text-blue-300">View pricing plans</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Transaction History */}
        <div className="bg-[#121212] rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white">Transaction History</h2>
          </div>
          
          <div className="divide-y divide-gray-800">
            {transactions.map(transaction => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? 'bg-green-900/20' 
                      : 'bg-amber-900/20'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowUp size={18} className="text-green-400" />
                    ) : (
                      <ArrowDown size={18} className="text-amber-400" />
                    )}
                  </div>
                  
                  <div className="ml-3">
                    <p className="text-white font-medium">{transaction.description}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(transaction.date).toLocaleDateString()} at {new Date(transaction.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={transaction.type === 'credit' ? 'text-green-400' : 'text-amber-400'}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount} credits
                  </p>
                  
                  <div className="flex items-center justify-end mt-1">
                    {transaction.status === 'completed' ? (
                      <span className="text-xs bg-green-900/20 text-green-400 px-2 py-0.5 rounded-full flex items-center">
                        <CheckCircle size={10} className="mr-1" /> Completed
                      </span>
                    ) : transaction.status === 'pending' ? (
                      <span className="text-xs bg-blue-900/20 text-blue-400 px-2 py-0.5 rounded-full flex items-center">
                        <Clock size={10} className="mr-1" /> Pending
                      </span>
                    ) : (
                      <span className="text-xs bg-red-900/20 text-red-400 px-2 py-0.5 rounded-full flex items-center">
                        <AlertTriangle size={10} className="mr-1" /> Failed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {transactions.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-400">No transactions yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-[#121212] rounded-xl shadow-lg border border-purple-900/30 p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Purchase Credits</h2>
            
            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-1">Select amount</label>
              <div className="grid grid-cols-3 gap-2">
                {[100, 300, 500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setPurchaseAmount(amount)}
                    className={`py-2 rounded-lg transition-colors ${
                      purchaseAmount === amount
                        ? 'bg-purple-900/50 border-2 border-purple-500 text-white'
                        : 'bg-gray-800 border border-gray-700 text-gray-300'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 text-sm mb-1">Custom amount</label>
              <input
                type="number"
                min="1"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg text-white p-2 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <div className="bg-gray-900 p-3 rounded-lg mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Credits</span>
                <span>{purchaseAmount}</span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Total</span>
                <span>${(purchaseAmount * 0.02).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 py-2 border border-gray-700 hover:border-gray-600 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchaseSubmit}
                className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg"
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Credits;