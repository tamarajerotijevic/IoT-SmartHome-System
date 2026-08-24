import { useEffect, useState } from "react";
import { getAccessLogs, getAuthorizedCards, addAuthorizedCard} from "../services/api";



function Access() {
    
    
    const [ownerName, setOwnerName] = useState("");
    const [uid, setUid] = useState("");

    const [logs, setLogs] = useState([]);
    const [cards, setCards] = useState([]);



    const loadCards = () => {

        getAuthorizedCards()
            .then(response => {
                setCards(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        };




    const handleAddCard = () => {

        addAuthorizedCard({
            
            owner_name: ownerName,
            uid: uid
        })
        .then(() => {

            setOwnerName("");
            setUid("");

            loadCards();

        })
        .catch(error => {
            console.log(error);
        });

    };



    useEffect(() => {

        getAccessLogs()
            .then(response => {
                setLogs(response.data);
            })
            .catch(error => {
                console.log(error);
            });


        loadCards();

    }, []);

    



    return (

        <div className="min-h-screen bg-[#668586] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200 ">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
                        Access Management
                    </h1>
                    <p className="max-w-2xl text-sm text-slate-600">
                        Manage authorized cards and view access logs
                    </p>
                

                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200 mt-6 border-2 border-[#EFD5C3]">
                    <h2 className="text-2xl font-bold text-slate-900 mb-5">
                        Add Authorized Card
                    </h2>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <input
                            type="text"
                            placeholder="Owner name"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
                        />
                        <input
                            type="text"
                            placeholder="Card UID"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-[#E86A92] focus:ring-2 focus:ring-[#E86A92]/20"
                        />
                        <button
                            onClick={handleAddCard}
                            className="w-full rounded-2xl bg-[#E86A92] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d85a82] sm:w-60"
                        >
                            Add card
                        </button>
                    </div>
                



                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200 mt-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-5">Authorized Cards</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className="rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200"
                            >
                                <p className="text-lg font-semibold text-slate-900">
                                    {card.owner_name}
                                </p>
                                <p className="mt-2 text-slate-700">UID: {card.uid}</p>
                                <p className="mt-3 text-sm text-slate-500">Added: {card.created_at}</p>
                            </div>
                        ))}
                    </div>
                </section>
                </section>





                <section className="rounded-2xl bg-[#F7F7F9] p-8 shadow-2xl shadow-black/5 ring-1 ring-slate-200 mt-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-5">Access Logs</h2>
                    <div className="space-y-4">
                        {logs.map(log => (
                            <div
                                key={log.id}
                                className="rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200"
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-slate-900">Card UID: {log.uid}</p>
                                    <p className="text-sm text-slate-500">{log.timestamp}</p>
                                </div>
                                <p className="mt-3 text-slate-700">Status: {log.status}</p>
                            </div>
                        ))}
                    </div>
                </section>
                 </section>
            </div>
           
        </div>

    );

}


export default Access;