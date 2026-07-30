type DriverStatsProps = {
  stats: {
    title: string;
    value: string | number;
  }[];
};

export default function DriverStats({ stats }: DriverStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-lg border p-4 shadow-sm bg-white"
        >
          <h3 className="text-sm text-gray-500">{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
