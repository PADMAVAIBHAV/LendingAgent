import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, LoaderCircle } from 'lucide-react';

const initialResult = {
  creditScore: 302,
  riskScore: 28,
  riskLevel: 'Low',
  interestRate: 4.5,
  decision: 'Approved',
};

function evaluateRisk({ amount, duration, wallet }) {
  const walletQuality = /^0x[a-fA-F0-9]{40}$/.test(wallet) ? 10 : -10;
  const amountPenalty = Math.min(amount / 22, 30);
  const durationPenalty = duration >= 60 ? 18 : duration >= 30 ? 10 : duration >= 14 ? 6 : 3;
  const baseRisk = 24 + amountPenalty + durationPenalty - walletQuality;
  const riskScore = Math.max(5, Math.min(95, Math.round(baseRisk)));
  const creditScore = Math.max(300, Math.min(850, Math.round(850 - riskScore * 5.8)));
  const riskLevel = riskScore <= 35 ? 'Low' : riskScore <= 65 ? 'Medium' : 'High';
  const decision = riskScore <= 68 ? 'Approved' : 'Rejected';
  const interestRate = decision === 'Approved'
    ? Math.max(4, Math.min(16, Number((3.2 + riskScore * 0.11).toFixed(1))))
    : Number((12 + riskScore * 0.06).toFixed(1));
  return { creditScore, riskScore, riskLevel, interestRate, decision };
}

export default function RequestLoanPage() {
  const [walletAddress, setWalletAddress] = useState('0xd724Fa9201aC6cd9a4dcAF6F4BD6E62a3B062442');
  const [loanAmount, setLoanAmount] = useState(120);
  const [loanDuration, setLoanDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(initialResult);

  const gaugePosition = useMemo(() => `${Math.max(8, Math.min(92, 100 - result.riskScore))}%`, [result.riskScore]);
  const riskTextColor = result.riskLevel === 'Low' ? 'text-emerald-400' : result.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400';
  const decisionColor = result.decision === 'Approved' ? 'text-emerald-400' : 'text-rose-400';

  const handleEvaluate = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setResult(evaluateRisk({ amount: loanAmount, duration: loanDuration, wallet: walletAddress }));
    setLoading(false);
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-5xl font-semibold tracking-tight">Loan Request</h2>
      </div>

      <section className="grid gap-5 xl:grid-cols-12">
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/35 via-violet-500/30 to-blue-500/35 p-[1px] xl:col-span-5">
          <div className="h-full rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Wallet Address</label>
                <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="Wallet Address to wallet name" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-slate-100 outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/30" />
              </div>

              <div>
                <label className="mb-3 block text-sm text-slate-300">Loan Amount (USDT)</label>
                <div className="grid grid-cols-[1fr_112px] items-center gap-4">
                  <div>
                    <input type="range" min={0} max={1000} value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-300" />
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                      <span>0</span>
                      <span>1,000</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-lg text-slate-300">USDT</div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Loan Duration (Days)</label>
                <div className="relative">
                  <select value={loanDuration} onChange={(e) => setLoanDuration(Number(e.target.value))} className="w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-lg text-slate-100 outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-500/30">
                    <option value={7}>7</option>
                    <option value={14}>14</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                </div>
              </div>

              <button onClick={handleEvaluate} disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 px-5 py-3 text-2xl font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] transition hover:scale-[1.01] disabled:opacity-70">
                Scan Wallet & Evaluate Risk
              </button>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-2xl border border-white/10 bg-slate-900/25 backdrop-blur-md xl:col-span-3">
          <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-4 px-4 text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }} className={`${loading ? 'opacity-100' : 'opacity-70'} transition-opacity`}>
              <LoaderCircle size={58} className="text-cyan-300" />
            </motion.div>
            <p className="text-2xl leading-tight text-slate-200">AI Analysis in Progress...</p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="relative overflow-hidden rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/35 via-violet-500/25 to-blue-500/35 p-[1px] xl:col-span-4">
          <div className="h-full rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
            <div className="grid h-full grid-cols-[1fr_64px] gap-5">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-300">Credit Score</p>
                  <p className="text-6xl font-semibold leading-none">{result.creditScore}</p>
                </div>
                <div className="border-t border-white/15" />
                <div>
                  <p className="text-sm text-slate-300">Risk Score</p>
                  <p className={`text-5xl font-semibold ${riskTextColor}`}>{result.riskLevel}</p>
                </div>
                <div className="border-t border-white/15" />
                <div>
                  <p className="text-sm text-slate-300">Interest Rate</p>
                  <p className="text-5xl font-semibold">{result.interestRate}% APR</p>
                </div>
                <div className="border-t border-white/15" />
                <div>
                  <p className="text-sm text-slate-300">Loan Decision</p>
                  <p className={`text-6xl font-semibold ${decisionColor}`}>{result.decision}</p>
                </div>
              </div>

              <div className="relative mx-auto h-full min-h-[510px] w-11 rounded-full border border-white/15 bg-slate-800/70 p-1.5">
                <div className="h-full w-full rounded-full bg-gradient-to-t from-emerald-500 via-amber-300 to-rose-500" />
                <motion.div animate={{ top: gaugePosition }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} className="absolute left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-slate-100 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
              </div>
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}
