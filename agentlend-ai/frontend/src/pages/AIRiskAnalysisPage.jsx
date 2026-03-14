import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, BriefcaseBusiness, CalendarClock, ChevronDown } from 'lucide-react';

const radarData = [
  { factor: 'Wallet Age Score', score: 82 },
  { factor: 'Transaction Activity', score: 78 },
  { factor: 'Balance Score', score: 71 },
  { factor: 'Repayment Score', score: 84 },
  { factor: 'Behavior Score', score: 76 },
];

const tokenData = [
  { m: 'Jan', v: 24 },
  { m: 'Feb', v: 12 },
  { m: 'Mar', v: 17 },
  { m: 'Apr', v: 10 },
  { m: 'May', v: 35 },
  { m: 'Jun', v: 22 },
  { m: 'Dec', v: 8 },
];

const holdingsData = [
  { t: 'ATL', v: 92 },
  { t: 'KSD', v: 78 },
  { t: 'MPI', v: 51 },
  { t: 'JTC', v: 50 },
  { t: 'HTK', v: 42 },
  { t: 'TOK', v: 29 },
];

const heatRows = [
  ['Aug', [1, 2, 1, 2, 2, 1, 1, 2, 2, 3, 2, 2, 2, 1]],
  ['Oct', [2, 1, 2, 2, 1, 2, 3, 2, 1, 2, 2, 3, 1, 1]],
  ['Nov', [2, 2, 1, 3, 2, 2, 1, 2, 2, 2, 3, 1, 2, 1]],
];

function LeftMetricCard({ title, value, Icon }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-cyan-400/60 via-violet-500/40 to-blue-500/60 p-[1px]">
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-300">{title}</p>
            <h3 className="mt-2 text-6xl font-semibold leading-none">{value}</h3>
          </div>
          <div className="rounded-lg border border-cyan-400/30 bg-cyan-500/20 p-2 text-cyan-300">
            <Icon size={20} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Card({ title, children, withMore = true }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-card backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[2rem] font-semibold leading-none" style={{ fontSize: '36px', transform: 'scale(0.5)', transformOrigin: 'left center' }}>{title}</h3>
        {withMore && (
          <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
            More <ChevronDown size={14} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export default function AIRiskAnalysisPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-5xl font-semibold tracking-tight">AI Risk Analysis</h2>
      </div>

      <section className="grid gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-4">
          <LeftMetricCard title="Wallet Age" value="3.2 Years" Icon={CalendarClock} />
          <LeftMetricCard title="Transaction Count" value="1,450+" Icon={Activity} />

          <Card title="Token Holdings">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={holdingsData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                  <XAxis dataKey="t" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
                  <Bar dataKey="v" fill="#22D3EE" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-4 rounded-2xl border border-white/10 bg-slate-900/55 p-4 shadow-card backdrop-blur-xl">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(148,163,184,0.25)" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: '#E2E8F0', fontSize: 14 }} />
                <Radar dataKey="score" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.25} strokeWidth={3} />
                <Radar dataKey="score" stroke="#A855F7" fill="#A855F7" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4 xl:col-span-4">
          <Card title="Token Holdings">
            <div className="h-[170px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenData}>
                  <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                  <XAxis dataKey="m" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
                  <Bar dataKey="v" fill="#22D3EE" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="Activity Score">
            <div className="space-y-2">
              {heatRows.map(([month, row]) => (
                <div key={month} className="flex items-center gap-2">
                  <span className="w-9 text-xs text-slate-400">{month}</span>
                  <div className="grid grid-cols-14 gap-1">
                    {row.map((v, idx) => (
                      <div
                        key={`${month}-${idx}`}
                        className={`h-4 w-4 rounded-sm ${
                          v === 1 ? 'bg-cyan-500/45' : v === 2 ? 'bg-sky-400/65' : 'bg-violet-500/65'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-transparent bg-gradient-to-br from-cyan-400/55 via-violet-500/35 to-blue-500/55 p-[1px]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-4xl font-semibold">AI Explanation</h3>
            <button className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
              More <ChevronDown size={14} />
            </button>
          </div>
          <p className="text-3xl leading-relaxed text-slate-100" style={{ fontSize: '36px', transform: 'scale(0.5)', transformOrigin: 'left top' }}>
            Approval recommended based on high transaction frequency and strong historical repayment behavior,
            offset slightly by lower token diversity.
          </p>
        </div>
      </section>
    </>
  );
}
