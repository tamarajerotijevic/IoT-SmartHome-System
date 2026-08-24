function SensorCard({ title, value, unit }) {

    return (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">

            <h2 className="text-xl font-semibold text-slate-900">
                {title}
            </h2>

            <p className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
                {value} <span className="text-xl font-medium text-slate-500">{unit}</span>
            </p>

        </div>
    );
}

export default SensorCard;