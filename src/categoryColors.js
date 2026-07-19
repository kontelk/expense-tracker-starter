export const CATEGORY_COLORS = {
  food: '#fb4570',
  housing: '#6366f1',
  utilities: '#f5a623',
  transport: '#10b981',
  entertainment: '#a78bfa',
  salary: '#34d399',
  other: '#94a3b8',
};

export function categoryColor(category) {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.other;
}
