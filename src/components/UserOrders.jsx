// ⚠️ I used AI for this component
import { CiDeliveryTruck } from "react-icons/ci";
import { IoWalletSharp } from "react-icons/io5";
import Image from "next/image";

const statusStyles = {
    pending: 'bg-gray-200 text-black',
    delivered: 'bg-gray-800 text-white',
    shipped: 'bg-gray-400 text-black',
    cancelled: 'bg-gray-200 text-black line-through',
}

const paymentStyles = {
    paid: 'bg-gray-800 text-white',
    pending: 'bg-gray-200 text-black',
    failed: 'bg-gray-200 text-black',
}

const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })
}

const UserOrders = ({ orders, user }) => {
    return (
        <div className="min-h-[91vh] bg-white text-black">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="mb-10 bg-black rounded-xl px-6 py-6 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-xl font-semibold">{(user?.name || 'U').trim().charAt(0).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl font-semibold text-white">{user?.name || 'My Account'}</h1>
                        <p className="text-gray-300 text-sm mt-0.5 truncate">{user?.email}</p>
                    </div>
                </div>
                {orders.length === 0 ?
                    <div className="bg-gray-50 rounded-lg p-10 text-center text-gray-600">No orders yet.</div> :
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id || order._id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-200">
                                    <div>
                                        <p className="text-xs text-gray-500 tracking-wide">PLACED ON</p>
                                        <p className="text-sm font-medium text-black">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyles[order.deliveryStatus] || 'bg-gray-200 text-black'}`}>
                                            <CiDeliveryTruck className="text-base" />
                                            Delivery: {order.deliveryStatus}
                                        </span>
                                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full capitalize ${paymentStyles[order.paymentStatus] || 'bg-gray-200 text-black'}`}>
                                            <IoWalletSharp className="text-base" />
                                            Payment: {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {order.products?.map((product, idx) => (
                                        <div key={product._id || idx} className="flex items-center gap-4 px-5 py-4">
                                            <div className="w-12 h-16 rounded-md border border-gray-200 bg-white overflow-hidden">
                                                <Image height={64} width={48} src={product.image} alt="image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-black truncate">{product.title}</p>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Qty: {product.quantity}</p>
                                            </div>
                                            <div className="text-sm font-medium text-black whitespace-nowrap">Rs. {product.totalPrice?.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-5 py-4 bg-white border-t border-gray-200">
                                    <div className="text-xs text-gray-600 max-w-sm">
                                        <p className="font-medium text-black">{order.firstName} {order.lastName}</p>
                                        <p>{order.address1}</p>
                                        <p>{order?.address2}</p>
                                        <p>{order.city}, {order.postalCode}</p>
                                        <p>{order.phone}</p>
                                    </div>
                                    <div className="sm:text-right">
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                                        <p className="text-lg font-semibold text-black">Rs. {order.totalAmount?.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500 capitalize">{order.paymentMethod === 'cash' ? 'Cash on delivery' : 'Paid online'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default UserOrders