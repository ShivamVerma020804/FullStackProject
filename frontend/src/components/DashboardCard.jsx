function DashboardCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center text-3xl group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">

          {icon}

        </div>

      </div>

    </div>
  );
}

export default DashboardCard;