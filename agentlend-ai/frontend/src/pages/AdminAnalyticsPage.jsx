import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar,
} from 'recharts';
import { Bot, CircleDollarSign, ShieldAlert, Users, Sparkles } from 'lucide-react';

const analyticsByRange = {
  '7 days': {
    metrics: {
      users: '8,420',
      loans: '1,236',
      defaultRate: '3.1%',
      avgCreditScore: '704',
      approvalRate: '79.4%',
    },
    userGrowth: [
      { k: 'D1', v: 7900 },
      { k: 'D2', v: 7980 },
      { k: 'D3', v: 8050 },
      { k: 'D4', v: 8110 },
      { k: 'D5', v: 8205 },
      { k: 'D6', v: 8330 },
      { k: 'D7', v: 8420 },
    ],
    issuance: [
      { k: 'D1', v: 145 },
      { k: 'D2', v: 182 },
      { k: 'D3', v: 171 },
      { k: 'D4', v: 166 },
      { k: 'D5', v: 191 },
      { k: 'D6', v: 205 },
      { k: 'D7', v: 176 },
    ],
    riskDistribution: [
      { band: '0-20', value: 9 },
      { band: '21-40', value: 23 },
      { band: '41-60', value: 35 },
      { band: '61-80', value: 24 },
      { band: '81-100', value: 9 },
    ],
  },
  '30 days': {
    metrics: {
      users: '31,870',
      loans: '5,940',
      defaultRate: '4.2%',
      avgCreditScore: '691',
      approvalRate: '75.8%',
    },
    userGrowth: [
      { k: 'W1', v: 28400 },
      { k: 'W2', v: 29120 },
      { k: 'W3', v: 29950 },
      { k: 'W4', v: 30700 },
      { k: 'W5', v: 31870 },
    ],
    issuance: [
      { k: 'W1', v: 980 },
      { k: 'W2', v: 1065 },
      { k: 'W3', v: 1128 },
      { k: 'W4', v: 1273 },
      { k: 'W5', v: 1494 },
    ],
    riskDistribution: [
      { band: '0-20', value: 6 },
      { band: '21-40', value: 20 },
      { band: '41-60', value: 31 },
      { band: '61-80', value: 28 },
      { band: '81-100', value: 15 },
    ],
  },
  '90 days': {
    metrics: {
      users: '89,540',
      loans: '17,403',
      defaultRate: '5.1%',
      avgCreditScore: '676',
      approvalRate: '72.2%',
    },
    userGrowth: [
      { k: 'M1', v: 62400 },
      { k: 'M2', v: 74820 },
      { k: 'M3', v: 89540 },
    ],
    issuance: [
      { k: 'M1', v: 4850 },
      { k: 'M2', v: 5662 },
      { k: 'M3', v: 6891 },
    ],
    riskDistribution: [
      { band: '0-20', value: 4 },
      { band: '21-40', value: 16 },
      { band: '41-60', value: 29 },
      { band: '61-80', value: 32 },
      { band: '81-100', value: 19 },
    ],
  },
};

function MetricCard({ title, value, icon: Icon, tone }) {
  return (
    <article className="rounded-2xl border border-transparent bg-gradient-to-br from-cyan-400/55 via-violet-500/30 to-blue-500/55 p-[1px]">
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-xl">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-sm text-slate-300">{title}</p>
          <div className={`rounded-lg p-1.5 ${tone}`}>
            <Icon size={16} />
          </div>
        </div>
        <h3 className="text-3xl font-semibold">{value}</h3>
      </div>
    </article>
  );
}

function ChartCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/65 p-5 shadow-card backdrop-blur-xl">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="h-[260px]">{children}</div>
    </section>
  );
}

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState('30 days');
  const data = useMemo(() => analyticsByRange[range], [range]);
  const filters = ['7 days', '30 days', '90 days'];

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-5xl font-semibold tracking-tight">Admin Analytics</h2>
        <div className="inline-flex rounded-xl border border-white/10 bg-slate-900/60 p-1 backdrop-blur-xl">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setRange(filter)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                range === filter
                  ? 'bg-gradient-to-r from-cyan-500/25 to-violet-500/25 text-cyan-200'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard title="Total Users" value={data.metrics.users} icon={Users} tone="bg-cyan-500/20 text-cyan-300" />
        <MetricCard title="Total Loans Issued" value={data.metrics.loans} icon={CircleDollarSign} tone="bg-violet-500/20 text-violet-300" />
        <MetricCard title="Default Rate" value={data.metrics.defaultRate} icon={ShieldAlert} tone="bg-rose-500/20 text-rose-300" />
        <MetricCard title="Average Credit Score" value={data.metrics.avgCreditScore} icon={Sparkles} tone="bg-amber-500/20 text-amber-300" />
        <MetricCard title="AI Approval Rate" value={data.metrics.approvalRate} icon={Bot} tone="bg-emerald-500/20 text-emerald-300" />
      </section>

      <section className="mt-5 grid gap-4 xl:grid-cols-3">
        <ChartCard title="User Growth">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.userGrowth}>
              <defs>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
              <XAxis dataKey="k" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Area type="monotone" dataKey="v" stroke="#22D3EE" strokeWidth={3} fill="url(#usersGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Loan Issuance Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.issuance}>
              <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
              <XAxis dataKey="k" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Line type="monotone" dataKey="v" stroke="#A855F7" strokeWidth={3.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Risk Score Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.riskDistribution}>
              <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
              <XAxis dataKey="band" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              <Bar dataKey="value" fill="#22D3EE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </>
  );
}
