function DeviceCard({ name, type }) {

    return (
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">

            <h2 className="text-xl font-semibold text-slate-900">
                {name}
            </h2>

            <p className="mt-3 text-slate-700">
                Type: {type}
            </p>

        </div>
    );
}

export default DeviceCard;