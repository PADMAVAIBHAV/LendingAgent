import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import { Activity, BarChart3, CircleDollarSign, CreditCard, Gauge, Wallet } from 'lucide-react';

const metrics = [
  { title: 'Total Loans Issued', value: '$30.7M', icon: CircleDollarSign },
  { title: 'Active Loans', value: '36', icon: Activity },
  { title: 'Repaid Loans', value: '$2,935', icon: CreditCard },
  { title: 'Default Rate', value: '11.50%', icon: Gauge },
  { title: 'Treasury Liquidity', value: '$1.507M', icon: Wallet },
  { title: 'Average Risk Score', value: '47.5', icon: BarChart3 },
];

const loans = [
  { m: 'Jan', v: 95 },
  { m: 'Feb', v: 140 },
  { m: 'Mar', v: 280 },
  { m: 'Apr', v: 230 },
  { m: 'May', v: 345 },
];

const risk = [
  { b: '0-20', v: 12 },
  { b: '21-40', v: 28 },
  { b: '41-60', v: 34 },
  { b: '61-80', v: 18 },
  { b: '81-100', v: 8 },
];

const repay = [
  { m: 'Jan', v: 48 },
  { m: 'Feb', v: 63 },
  { m: 'Mar', v: 51 },
  { m: 'Apr', v: 60 },
  { m: 'May', v: 72 },
];

function MetricCard({ metric, index }) {
  const Icon = metric.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group relative overflow-hidden rounded-xl border border-transparent bg-gradient-to-br from-cyan-400/60 via-violet-500/40 to-blue-500/60 p-[1px]"
    >
      <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[13px] text-slate-300">{metric.title}</p>
            <h3 className="mt-1.5 text-5xl font-semibold leading-none text-white" style={{ fontSize: '58px', transform: 'scale(0.5)', transformOrigin: 'left center' }}>{metric.value}</h3>
          </div>
          <div className="rounded-lg border border-cyan-400/30 bg-cyan-500/20 p-1.5 text-cyan-300">
            <Icon size={18} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ChartCard({ title, children }) {
  return (
    <section className="rounded-xl border border-white/10 bg-slate-900/60 p-4 shadow-card backdrop-blur-xl">
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">{title}</h3>
        <button className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">More</button>
      </div>
      <div className="h-[220px]">{children}</div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-4xl font-semibold tracking-tight">Dashboard Panel</h2>
        <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">View all</button>
      </div>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} metric={metric} index={index} />
        ))}
      </section>

      <section className="mt-4 grid gap-3 xl:grid-cols-3">
        <ChartCard title="Loan Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={loans}>
              <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
              <XAxis dataKey="m" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Line type="monotone" dataKey="v" stroke="#22D3EE" strokeWidth={4} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Risk Score Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={risk}>
              <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
              <XAxis dataKey="b" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Bar dataKey="v" fill="#22D3EE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Repayment History">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={repay}>
              <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
              <XAxis dataKey="m" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Bar dataKey="v" fill="#A855F7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </>
  );
}
