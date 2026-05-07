interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <article className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      {description ? <small>{description}</small> : null}
    </article>
  );
}
