import { useEffect, useState } from "react";
import { getDevices } from "../services/api";
import DeviceCard from "../components/DeviceCard";


function Devices(){
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        getDevices()
        .then((response) => {
            setDevices(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#668586] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                        Devices
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-600">
                        Here you can view all the devices connected to your smart home system
                    </p>
                

                <div className="grid gap-6 md:grid-cols-3 mt-6">
                    {devices.map((device) => (
                        <DeviceCard
                            key={device.id}
                            name={device.name}
                            type={device.type}
                        />
                    ))}
                </div>

                </section>
            </div>
        </div>
    );
}

export default Devices;