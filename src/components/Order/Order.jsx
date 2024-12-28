import React, { useEffect, useState, useContext } from 'react';
import { Cartcontext } from '../../Context/Cartcontext';

export default function AllOrders({ isModal, setIsModal }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const { getUserOrders } = useContext(Cartcontext);

  // Fetch orders when component mounts
  async function getOrders() {
    const data = await getUserOrders();
    setOrderDetails(data);
  }

  // Hide the modal
  const handleHideModal = () => {
    setIsModal(false);
  };

  const modalClasses = `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-black/50 transition duration-300 ${
    isModal ? 'opacity-100 visible' : 'opacity-0 invisible'
  }`;

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {orderDetails && isModal && (
        <div
          id="modalEl"
          tabIndex={-1}
          aria-hidden="true"
          key={orderDetails._id}
          className={modalClasses}
        >
          <div className="relative p-4 w-full max-w-4xl mx-auto">
            {/* Modal content */}
            <div className="relative rounded-lg bg-white shadow px-6">
              {/* Modal header */}
              <div className="flex items-center justify-end rounded-t border-b p-4">
                <h2 className="text-3xl capitalize text-accent">Cart Shop</h2>
                <button
                  onClick={handleHideModal}
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                >
                  <i className="fa fa-close text-xl"></i>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <div className="flex">
                <div className="w-2/5 px-6 py-4">
                  <p className="font-medium border-b py-4 mb-0">
                    Thanks for shopping with us <span>{orderDetails.user.name}</span>
                  </p>
                  <div className="border-b py-4">
                    <h4 className="font-medium py-2">Shipping details:</h4>
                    <ul className="indent">
                      <li>
                        <span>{orderDetails.shippingAddress.details}</span>
                      </li>
                      <li>
                        <span>{orderDetails.shippingAddress.city}</span>
                      </li>
                      <li>
                        <span>{orderDetails.shippingAddress.phone}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="border-b py-4">
                    <p>
                      Total Order Price: <span>{orderDetails.totalOrderPrice}</span> EGP
                    </p>
                  </div>
                </div>

                <div className="w-4/5 h-screen overflow-y-auto">
                  <table className="text-lg text-start rtl:text-right">
                    <tbody>
                      {orderDetails?.cartItems?.length > 0 ? (
                        orderDetails?.cartItems.map((product) => (
                          <tr
                            key={product.product.id}
                            className="border-b flex flex-wrap sm:flex-nowrap px-6 py-4"
                          >
                            <td className="sm:w-1/2 md:w-2/6 xl:w-1/6">
                              <img
                                src={product.product.imageCover}
                                className="w-full aspect-[1/1] object-contain"
                                alt={product.title}
                              />
                            </td>
                            <td className="sm:w-1/2 md:w-4/6 xl:w-5/6 flex flex-col sm:flex-row flex-wrap sm:flex-c justify-between items-center grow">
                              <div className="md:w-2/3 flex flex-col justify-center">
                                <div className="font-semibold">{product.product.title}</div>
                                <div className="text-base text-accent">{product.price} EGP</div>
                              </div>
                              <div className="flex items-center gap-4 text-base my-3 md:my-0">
                                <div>count: {product.count}</div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="font-medium text-xl">
                            You didn't order anything yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex justify-end items-center space-x-2 rtl:space-x-reverse rounded-b border-t border-gray-200 p-3">
                <button
                  onClick={handleHideModal}
                  type="button"
                  className="rounded-lg bg-gray-500 px-3 py-1.5 m-1 text-center text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
