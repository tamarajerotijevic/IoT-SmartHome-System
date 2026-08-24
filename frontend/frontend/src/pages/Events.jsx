import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        getEvents()
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (

        <div className="min-h-screen bg-[#668586] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-6">
                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                        Event history
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-600">
                        Here you can view the history of events that have occurred in your smart home system
                    </p>
                

                <div className="space-y-4 mt-6">
                    {events.map(event => (
                        <div
                            key={event.id}
                            className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200"
                        >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    {event.type}
                                </h2>
                                <p className="text-sm text-slate-500 font-bold">
                                    {event.timestamp}
                                </p>
                            </div>
                            <p className="mt-3 text-slate-700">
                                {event.description}
                            </p>
                        </div>
                       
                    ))}
                </div>
                 </section>
            </div>
        </div>

    );

}

export default Events;