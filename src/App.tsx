import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  FileText,
  ArrowLeft,
  Sparkles,
  Send,
  Bot,
  User,
  ChevronRight,
  Globe,
  Shield,
  Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = "gemini-3-flash-preview";
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

type View = 'home' | 'rag' | 'csr';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <HomeView key="home" onNavigate={setView} />
        )}
        {view === 'rag' && (
          <RagView key="rag" onBack={() => setView('home')} />
        )}
        {view === 'csr' && (
          <CsrView key="csr" onBack={() => setView('home')} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Home View ---
function HomeView({ onNavigate }: { onNavigate: (v: View) => void, key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-12 relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/50" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-[15%] w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-[5%] w-48 h-48 bg-purple-200/20 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm mb-4"
        >
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">
            Future of Intelligence
          </span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-4">
          AiDN Suite
        </h2>
        <p className="text-lg md:text-xl text-[#86868b] max-w-xl mx-auto font-medium">
          Experience the next generation of productivity tools powered by advanced language models.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <AppCard
          title="AiDN - Enterprise Search"
          description="Retrieval-Augmented Generation for intelligent document querying."
          icon={<Search className="w-6 h-6 text-blue-500" />}
          onClick={() => onNavigate('rag')}
          color="bg-blue-50"
          delay={0.4}
        />
        <AppCard
          title="AiDN - Heimdall (CSR Generator)"
          description="Automated Certificate signing Request by AI"
          icon={<FileText className="w-6 h-6 text-emerald-500" />}
          onClick={() => onNavigate('csr')}
          color="bg-emerald-50"
          delay={0.5}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex gap-8 text-[#86868b]"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm"
        >
          <Shield className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium">Secure</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm"
        >
          <Zap className="w-5 h-5 text-yellow-600" />
          <span className="text-sm font-medium">Fast</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-sm"
        >
          <Globe className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium">Global</span>
        </motion.div>
      </motion.div>
    </div>
    </motion.div>
  );
}

function AppCard({ title, description, icon, onClick, color, delay }: any) {
  return (
    <motion.button
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-start p-8 rounded-[2rem] ${color} border border-transparent hover:border-black/5 transition-all duration-500 text-left overflow-hidden shadow-sm hover:shadow-xl backdrop-blur-sm bg-opacity-80`}
    >
      <div className="mb-6 p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">{title}</h3>
      <p className="text-base text-[#424245] leading-relaxed mb-6 max-w-[90%]">
        {description}
      </p>
      <div className="mt-auto flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
        Get Started <ChevronRight className="w-4 h-4 ml-1" />
      </div>

      {/* Decorative background elements */}
      <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:bg-white/50 transition-colors" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -left-8 -top-8 w-24 h-24 bg-white/20 rounded-full blur-xl"
      />
    </motion.button>
  );
}

// --- RAG View ---
function RagView({ onBack }: { onBack: () => void, key?: string }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await getAI().models.generateContent({
        model: MODEL_NAME,
        contents: `You are a RAG (Retrieval-Augmented Generation) assistant. 
        Simulate a RAG response for the following query: "${userMsg}". 
        Be concise, professional, and helpful.`,
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to AI service." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="max-w-4xl mx-auto min-h-screen flex flex-col p-6"
    >
      <header className="flex items-center justify-between mb-12 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Search className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold">RAG Assistant</h2>
        </div>
        <div className="w-20" /> {/* Spacer */}
      </header>

      <div className="flex-1 overflow-y-auto space-y-6 mb-8 scrollbar-hide">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
              <Bot className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">How can I help you today?</h3>
            <p className="text-[#86868b] max-w-sm">Ask me anything and I'll use my knowledge base to provide accurate answers.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-5 rounded-3xl ${m.role === 'user'
              ? 'bg-blue-600 text-white rounded-tr-none shadow-lg'
              : 'bg-white border border-black/5 text-[#1d1d1f] rounded-tl-none shadow-sm'
              }`}>
              <div className="flex items-center gap-2 mb-2 opacity-70 text-xs font-bold uppercase tracking-wider">
                {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                {m.role === 'user' ? 'You' : 'AI Assistant'}
              </div>
              <p className="text-lg leading-relaxed">{m.text}</p>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/5 p-5 rounded-3xl rounded-tl-none shadow-sm flex gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-6">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="w-full p-6 pr-20 bg-white border border-black/10 rounded-[2rem] shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- CSR View ---
function CsrView({ onBack }: { onBack: () => void, key?: string }) {
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCsr = async () => {
    if (!company || !industry) return;
    setLoading(true);
    try {
      const response = await getAI().models.generateContent({
        model: MODEL_NAME,
        contents: `Generate a professional CSR (Corporate Social Responsibility) summary for a company named "${company}" in the "${industry}" industry. 
        Include: 
        1. Environmental Impact
        2. Social Responsibility
        3. Governance
        Use a professional, Apple-like tone.`,
      });
      setResult(response.text || "Failed to generate report.");
    } catch (error) {
      console.error(error);
      setResult("Error generating CSR report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="max-w-4xl mx-auto min-h-screen p-6"
    >
      <header className="flex items-center justify-between mb-12 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold">CSR Generator</h2>
        </div>
        <div className="w-20" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-tight">Create your strategy.</h3>
            <p className="text-[#86868b] text-lg">Enter your details to generate a comprehensive CSR report.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1d1d1f] ml-1">Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. EcoTech Solutions"
                className="w-full p-5 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1d1d1f] ml-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Renewable Energy"
                className="w-full p-5 bg-white border border-black/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
              />
            </div>
            <button
              onClick={generateCsr}
              disabled={!company || !industry || loading}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Sparkles className="w-6 h-6 animate-pulse" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" /> Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white border border-black/5 rounded-[2.5rem] p-8 shadow-sm min-h-[400px] flex flex-col">
          {result ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose prose-slate max-w-none"
            >
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-6">
                <Shield className="w-4 h-4" /> Generated Strategy
              </div>
              <div className="whitespace-pre-wrap text-[#424245] leading-relaxed text-lg">
                {result}
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-[#86868b]">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="max-w-[200px]">Your generated report will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
