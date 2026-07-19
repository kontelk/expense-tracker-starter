import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { categoryColor } from './categoryColors'

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">{name}</span>
      <span className="chart-tooltip-value">${value}</span>
    </div>
  );
}

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      const amount = Number(t.amount);
      acc[t.category] = (acc[t.category] || 0) + amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  if (data.length === 0) {
    return (
      <div className="glass chart-card">
        <h2 className="card-heading">Spending by Category</h2>
        <p className="chart-empty">Nothing to chart yet. Categories will appear here once you log an expense.</p>
      </div>
    );
  }

  return (
    <div className="glass chart-card">
      <h2 className="card-heading">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#8891a6', fontSize: 12, fontFamily: 'Outfit' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8891a6', fontSize: 12, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={categoryColor(entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart
