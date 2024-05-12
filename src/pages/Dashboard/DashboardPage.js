import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTitle } from "../../hooks/useTitle";
import { getUserOrders } from "../../services";
import { DashboardCard } from "../Dashboard/Components/DashboardCard"
import { DashboardEmpty } from "../Dashboard/Components/DashboardEmpty";

export const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)
    useTitle("Dashboard");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getUserOrders();
                setOrders(data);
            } catch (error) {
                toast.error(error.message, { closeButton: true, position: "bottom-center" });
            } finally {
                setLoading(false)
            }
        }
        fetchOrders();
    }, []);



    return (
        <main>
            <section>
                <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
            </section>
            <section>
                {loading ? (<div>Loading...</div>) : (
                    orders.length > 0 ? (
                        orders.map((order) =>
                            <DashboardCard key={order.id} order={order} />)
                    ) : (
                        <DashboardEmpty />)
                )}
            </section>

        </main>
    )
}
