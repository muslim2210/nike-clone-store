import Wrapper from "@/components/layout/Wrapper";
import { getOrders } from "@/lib/actions/actions";
import { FormatRupiah } from "@arismun/format-rupiah";

import { auth } from "@clerk/nextjs";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <Wrapper className="px-10 py-5 max-sm:px-3">
      <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight my-5">
        Your Orders
      </div>
      {!orders ||
        (orders.length === 0 && (
          <div className="h-[50vh]">
            <p className="text-body-bold my-5">You have no orders yet.</p>
          </div>
        ))}

      <div className="flex flex-col gap-10">
        {orders?.map((order: OrderType) => (
          <div
            key={order._id}
            className="flex flex-col gap-8 p-4 hover:bg-gray-100"
          >
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-primaryBlack font-medium text-lg">
                Order ID : {order._id}
              </p>
              <p className="text-primaryBlack font-medium text-lg">
                Total Amount: <FormatRupiah value={order.totalAmount} />
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {order?.products?.map((orderItem: OrderItemType) => (
                <div className="flex gap-4" key={orderItem.product._id}>
                  {orderItem.product.media && (
                    <Image
                      src={orderItem.product.media[0]}
                      alt={orderItem.product.title}
                      width={100}
                      height={100}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title:{" "}
                      <span className="font-bold">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color:{" "}
                        <span className="font-bold">{orderItem.color}</span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:{" "}
                        <span className="font-bold">{orderItem.size}</span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Unit price:{" "}
                      <span className="font-bold">
                        <FormatRupiah value={orderItem.product.price} />
                      </span>
                    </p>
                    <p className="text-small-medium">
                      Quantity:{" "}
                      <span className="font-bold">{orderItem.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export const dynamic = "force-dynamic";

export default Orders;
