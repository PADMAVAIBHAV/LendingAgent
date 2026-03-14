import { useMemo, useState } from 'react';
import { Search, X, CheckCircle2, XCircle } from 'lucide-react';

const seedRows = [
  {
    loanId: 10323069,
    wallet: '0x7f8a3e11...8e4c',
    amount: 3000000,
    riskScore: 42,
    interestRate: 4.5,
    decision: 'Approved',
    timestamp: '2026-11-24 05:30',
    explanation: 'Approval recommended by AI due to stable cashflow behavior, long wallet maturity, and high historical repayment consistency.',
    analytics: 'Wallet age 3.2y, tx count 1,450+, avg balance $92.4K, token diversity score 78/100.',
    riskFactors: 'Low volatility profile, healthy repayment streak, moderate concentration risk in 2 major tokens.',
  },
  {
    loanId: 10323068,
    wallet: '0x4c2b98aa...d531',
    amount: 3000,
    riskScore: 85,
    interestRate: 4.5,
    decision: 'Approved',
    timestamp: '2026-11-24 03:30',
    explanation: 'AI approved due to strong transaction frequency and positive wallet growth trend over the last 180 days.',
    analytics: 'Wallet age 2.1y, tx count 980+, avg monthly inflow +14.2%, repayment ratio 96%.',
    riskFactors: 'Elevated short-term volatility but offset by high repayment confidence and healthy liquidity buffer.',
  },
  {
    loanId: 10323052,
    wallet: '0x91ab1fd3...2f90',
    amount: 1000,
    riskScore: 90,
    interestRate: 5.0,
    decision: 'Rejected',
    timestamp: '2026-11-24 03:30',
    explanation: 'Rejected by AI due to inconsistent on-chain activity and weak repayment signal in previous micro-loan behavior.',
    analytics: 'Wallet age 0.8y, tx count 114, sharp outbound spikes, low retained balance.',
    riskFactors: 'High behavioral variance, low liquidity retention, and elevated delinquency probability.',
  },
  {
    loanId: 10323053,
    wallet: '0x26de77b1...6de2',
    amount: 30700000,
    riskScore: 85,
    interestRate: 4.5,
    decision: 'Rejected',
    timestamp: '2026-11-24 03:30',
    explanation: 'Rejected by AI due to excessive requested amount relative to treasury risk ceiling and concentration exposure.',
    analytics: 'Wallet age 1.7y, tx count 560, concentration index high, unstable inflow pattern.',
    riskFactors: 'Amount outlier, concentration risk, and low confidence under current treasury volatility policy.',
  },
  {
    loanId: 10323054,
    wallet: '0x5f3d43aa...90b1',
    amount: 4200,
    riskScore: 34,
    interestRate: 6.2,
    decision: 'Approved',
    timestamp: '2026-11-24 04:02',
    explanation: 'AI approved with low risk due to diversified holdings and strong long-term repayment behavior.',
    analytics: 'Wallet age 4.3y, tx count 2,280, diversity score 84/100, repayment ratio 98.8%.',
    riskFactors: 'Minor market risk, otherwise high confidence from behavioral and repayment models.',
  },
  {
    loanId: 10323055,
    wallet: '0x61da11c4...447b',
    amount: 8600,
    riskScore: 63,
    interestRate: 8.7,
    decision: 'Approved',
    timestamp: '2026-11-24 04:45',
    explanation: 'AI approved with medium risk; repayment confidence remains acceptable under adaptive pricing.',
    analytics: 'Wallet age 2.8y, tx count 1,120, balance trend neutral, repayment ratio 91.2%.',
    riskFactors: 'Moderate liquidity risk and occasional high-volatility transfer behavior.',
  },
  {
    loanId: 10323056,
    wallet: '0xa893bc4a...17f2',
    amount: 15000,
    riskScore: 78,
    interestRate: 10.9,
    decision: 'Rejected',
    timestamp: '2026-11-24 04:58',
    explanation: 'AI rejected because repayment confidence dropped below threshold after recent high-risk transfer pattern.',
    analytics: 'Wallet age 1.1y, tx count 204, repayment ratio 72.0%, volatile balance movement.',
    riskFactors: 'High default probability, weak repayment trajectory, and elevated behavior anomaly score.',
  },
  {
    loanId: 10323057,
    wallet: '0x0fe22c1d...62ea',
    amount: 2100,
    riskScore: 45,
    interestRate: 7.1,
    decision: 'Approved',
    timestamp: '2026-11-24 05:12',
    explanation: 'AI approved with conservative rate due to balanced wallet profile and sufficient repayment history.',
    analytics: 'Wallet age 2.4y, tx count 840, stable average balance, repayment ratio 94.1%.',
    riskFactors: 'Medium market risk and minor short-term liquidity pressure.',
  },
];

const PAGE_SIZE = 4;

function formatAmount(value) {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${value.toLocaleString()}`;
  }
  return `$${value}`;
}

export default function DecisionLogsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return seedRows.filter((row) =>
      `${row.loanId} ${row.wallet} ${row.decision} ${row.riskScore} ${row.timestamp}`
        .toLowerCase()
        .includes(q)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-5xl font-semibold tracking-tight">Decision Logs</h2>
        <div className="w-full max-w-md rounded-xl border border-white/15 bg-slate-900/60 px-4 py-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-cyan-400/35 bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-blue-500/20 p-[1px]">
        <div className="rounded-2xl bg-slate-950/75 backdrop-blur-xl">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10 bg-slate-900/95 text-sm text-slate-300 backdrop-blur-xl">
              <tr>
                <th className="px-4 py-3">Loan ID</th>
                <th className="px-4 py-3">Wallet Address</th>
                <th className="px-4 py-3">Loan Amount</th>
                <th className="px-4 py-3">Risk Score</th>
                <th className="px-4 py-3">Interest Rate</th>
                <th className="px-4 py-3">Decision</th>
                <th className="px-4 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {current.length > 0 ? (
                current.map((row) => (
                  <tr
                    key={row.loanId}
                    onClick={() => setSelected(row)}
                    className="cursor-pointer border-t border-white/5 text-sm text-slate-200 transition-colors duration-200 hover:bg-cyan-500/10"
                  >
                    <td className="px-4 py-3">{row.loanId}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.wallet}</td>
                    <td className="px-4 py-3">{formatAmount(row.amount)}</td>
                    <td className="px-4 py-3 text-emerald-300">{row.riskScore}/100</td>
                    <td className="px-4 py-3">{row.interestRate}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        row.decision === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {row.decision === 'Approved' ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {row.decision}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{row.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-400">
                    No decision logs found for this search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-slate-300">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5 disabled:opacity-40"
              >
                Prev
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-8 w-8 rounded-lg border text-xs transition ${
                    number === page
                      ? 'border-cyan-300 bg-cyan-500/20 text-cyan-200'
                      : 'border-white/10 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                className="rounded-lg border border-white/10 px-3 py-1.5 transition hover:bg-white/5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-cyan-400/35 bg-slate-900/95 p-5 shadow-card backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Loan #{selected.loanId} Analysis</h3>
              <button onClick={() => setSelected(null)} className="rounded-lg border border-white/10 p-1.5 text-slate-300 hover:bg-white/5">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4 text-slate-200">
              <div>
                <p className="text-sm text-slate-400">AI Explanation</p>
                <p>{selected.explanation}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">wallet analytics</p>
                <p>{selected.analytics}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Risk Factors</p>
                <p>{selected.riskFactors}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
