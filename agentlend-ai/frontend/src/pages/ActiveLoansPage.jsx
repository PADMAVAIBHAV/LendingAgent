import { motion } from 'framer-motion';
import {
  Activity,
  CalendarClock,
  Clock3,
  HandCoins,
  Percent,
  Wallet,
  WalletCards,
} from 'lucide-react';

const loans = [
  {
    id: 4021,
    wallet: '0x3b1e98a7...12af',
    amount: 5000,
    interestRate: 4.5,
    dueDate: 'Oct 28, 2026',
    lifecycleProgress: 78,
    repaymentStatus: 'On Track',
  },
  {
    id: 4024,
    wallet: '0x9ad7b0dc...c8de',
    amount: 5000,
    interestRate: 4.5,
    dueDate: 'Oct 28, 2026',
    lifecycleProgress: 52,
    repaymentStatus: 'Near Due',
  },
  {
    id: 4030,
    wallet: '0x8f2b3bd1...f146',
    amount: 5000,
    interestRate: 4.5,
    dueDate: 'Oct 28, 2026',
    lifecycleProgress: 34,
    repaymentStatus: 'Overdue',
  },
  {
    id: 4037,
    wallet: '0x51cd0a67...9be2',
    amount: 2800,
    interestRate: 6.1,
    dueDate: 'Nov 03, 2026',
    lifecycleProgress: 69,
    repaymentStatus: 'On Track',
  },
  {
    id: 4040,
    wallet: '0x2c96ee43...a4dd',
    amount: 7400,
    interestRate: 8.0,
    dueDate: 'Nov 07, 2026',
    lifecycleProgress: 46,
    repaymentStatus: 'Near Due',
  },
  {
    id: 4046,
    wallet: '0x99af7d8e...7a11',
    amount: 1500,
    interestRate: 7.2,
    dueDate: 'Sep 30, 2026',
    lifecycleProgress: 18,
    repaymentStatus: 'Overdue',
  },
];

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-4xl font-semibold">{value}</h3>
        </div>
        <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-300">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function formatAmount(amount) {
  return `$${amount.toLocaleString()} USDT`;
}

function statusStyles(status) {
  if (status === 'On Track') {
    return {
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
      bar: 'from-cyan-400 to-emerald-400',
    };
  }
  if (status === 'Near Due') {
    return {
      badge: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
      bar: 'from-amber-400 to-orange-400',
    };
  }
  return {
    badge: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    bar: 'from-rose-400 to-red-500',
  };
}

function LoanCard({ loan, index }) {
  const styles = statusStyles(loan.repaymentStatus);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="group rounded-2xl border border-transparent bg-gradient-to-br from-cyan-400/60 via-violet-500/40 to-blue-500/60 p-[1px]"
    >
      <div className="h-full rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl transition-colors duration-300 group-hover:bg-slate-900/80">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-300">Borrower</p>
            <div className="mt-2 flex items-center gap-2 text-slate-100">
              <Wallet size={16} className="text-cyan-300" />
              <span className="font-mono text-sm">{loan.wallet}</span>
            </div>
          </div>
          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
            {loan.repaymentStatus}
          </span>
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between text-slate-200">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <HandCoins size={15} /> Loan Amount
            </span>
            <span className="font-semibold">{formatAmount(loan.amount)}</span>
          </div>

          <div className="flex items-center justify-between text-slate-200">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Percent size={15} /> Interest Rate
            </span>
            <span className="font-semibold">{loan.interestRate}% APR</span>
          </div>

          <div className="flex items-center justify-between text-slate-200">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <CalendarClock size={15} /> Due Date
            </span>
            <span className="font-semibold">{loan.dueDate}</span>
          </div>

          <div className="flex items-center justify-between text-slate-200">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Activity size={15} /> Repayment Status
            </span>
            <span className="font-semibold">{loan.repaymentStatus}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Loan Lifecycle</span>
            <span>{loan.lifecycleProgress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-700/70">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${loan.lifecycleProgress}%` }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className={`h-2.5 rounded-full bg-gradient-to-r ${styles.bar}`}
            />
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500">Loan #{loan.id}</div>
      </div>
    </motion.article>
  );
}

export default function ActiveLoansPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-5xl font-semibold tracking-tight">Active Loans</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Active Loans" value="36" icon={WalletCards} />
        <StatCard title="Outstanding Amount" value="$18,740 USDT" icon={HandCoins} />
        <StatCard title="Average Days Left" value="12" icon={Clock3} />
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {loans.map((loan, index) => (
          <LoanCard key={loan.id} loan={loan} index={index} />
        ))}
      </section>
    </>
  );
}
