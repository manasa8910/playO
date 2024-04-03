import { useEffect, useState } from "react";

function Orders({ data }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(data);
  }, []);

  useEffect(() => {}, [orders]);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders([...updatedOrders]);
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    console.log(orders);
  };

  return (
    <table className="text-sm w-full">
      <thead>
        <tr className="p-4 grid grid-cols-8 w-full justify-between gap-4 bg-white text-sm leading-[17.07px] items-center font-bold">
          <th className="">Tracking ID</th>
          <th className=" flex justify-between">Product</th>
          <th className="flex justify-between">Customer</th>
          <th className="flex justify-between">Date</th>
          <th className="text-left">Amount</th>
          <th className="text-left">Payment Mode</th>
          <th className="flex justify-between ">Status</th>
          <th className="">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr
            key={order.id}
            className={
              (order.id % 2 === 0 ? "bg-white " : "bg-[#F7F7F7] ") +
              "p-4 grid grid-cols-8 gap-4 w-full justify-between items-center text-sm leading-[17.07px] font-[500]"
            }
          >
            <td className="text-center">{order.trackingId}</td>
            <td className="">
              <div className="flex gap-2 justify-normal items-center">
                <div className="h-8 w-8 overflow-hidden rounded-lg">
                  <img
                    src={order.product.img}
                    className="object-center w-full h-full object-cover  cursor-pointer"
                    alt={order.product.name}
                  />
                </div>
                <span>{order.product.name}</span>
              </div>
            </td>
            <td>{order.customer}</td>
            <td>{order.date}</td>
            <td>{order.ammount}</td>
            <td>{order.paymentMode}</td>
            <td>
              <select
                value={order.status}
                onChange={(e) => {
                  handleStatusChange(order.id, e.target.value);
                  console.log(order.id, e.target.value, order.status);
                }}
                className={
                  (order.status === "Delivered"
                    ? "bg-[#EBF9F1] text-[#1F9254] "
                    : order.status === "Process"
                    ? "bg-[#FEF2E5] text-[#CD6200] "
                    : order.status === "Canceled"
                    ? "bg-[#FBE7E8] text-[#000000] "
                    : "") + "w-max px-3 py-2 rounded-[22px] text-xs"
                }
              >
                {order.status === "Process" && (
                  <>
                    <option value="Process">Process</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </>
                )}
                {order.status === "Delivered" && (
                  <>
                    <option value="Delivered">Delivered</option>
                    <option value="NA">NA</option>
                  </>
                )}
                {order.status === "Canceled" && (
                  <>
                    <option value="Canceled">Canceled</option>
                    <option value="NA">NA</option>
                  </>
                )}
              </select>
            </td>
            <td className="flex justify-evenly">
              <img
                src="./assets/edit.svg"
                className="h-6 w-6 cursor-pointer"
                alt="edit"
              />
              <img
                onClick={(e) => {
                  deleteOrder(order.id);
                }}
                src="./assets/trash.svg"
                className="h-6 w-6 cursor-pointer"
                alt="trash"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Orders;
