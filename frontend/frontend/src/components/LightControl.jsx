import { sendArduinoCommand } from "../services/api";


function LightControl(){

    const turnOn = () => {

        sendArduinoCommand("ON")
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.log(error);
            });

    };


    const turnOff = () => {

        sendArduinoCommand("OFF")
            .then(response=>{
                console.log(response.data);
            })
            .catch(error=>{
                console.log(error);
            });

    };


    return (

        <div className="rounded-[2rem] bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200 mt-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Light control
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600">
                        Turn the light on or off using the buttons below
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                    onClick={turnOn}
                    className="w-full rounded-2xl bg-[#E86A92] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d85a82] sm:w-auto"
                >
                    ON
                </button>

                <button
                    onClick={turnOff}
                    className="w-full rounded-2xl bg-[#6B7280] px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-600 sm:w-auto"
                >
                    OFF
                </button>
            </div>

        </div>

    );

}


export default LightControl;