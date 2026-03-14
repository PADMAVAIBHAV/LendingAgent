import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Coins, Droplets, ShieldCheck } from 'lucide-react';

const poolData = [
  { name: 'Available', value: 58 },
  { name: 'Lent Out', value: 31 },
  { name: 'Reserved', value: 11 },
];

const trendData = [
  { m: 'Jan', v: 1.2 },
  { m: 'Feb', v: 1.24 },
  { m: 'Mar', v: 1.28 },
  { m: 'Apr', v: 1.41 },
  { m: 'May', v: 1.36 },
  { m: 'Jun', v: 1.5 },
];

const colors = ['#22D3EE', '#A855F7', '#F59E0B'];

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-4xl font-semibold">{value}</h3>
        </div>
        <div className="rounded-lg bg-cyan-500/20 p-2 text-cyan-300">
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function TreasuryPoolPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-5xl font-semibold tracking-tight">Treasury Pool</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Total Treasury" value="$1.507M" icon={Coins} />
        <Stat title="Available Liquidity" value="$875K" icon={Droplets} />
        <Stat title="Reserve Ratio" value="18%" icon={ShieldCheck} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
          <h3 className="mb-3 text-lg font-semibold">Pool Composition</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={poolData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={4}>
                  {poolData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
          <h3 className="mb-3 text-lg font-semibold">Liquidity Trend (M)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
                <XAxis dataKey="m" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ background: '#0B1228', border: '1px solid rgba(148,163,184,0.25)' }} />
                <Line type="monotone" dataKey="v" stroke="#22D3EE" strokeWidth={4} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
}
