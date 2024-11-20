import React, { createContext, useContext, useState } from "react";

// Tạo Context
const OrderContext = createContext();

// Provider để bọc ứng dụng
export const OrderProvider = ({ children }) => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  return (
    <OrderContext.Provider value={{ isOrderConfirmed, setIsOrderConfirmed }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook để sử dụng Context
export const useOrder = () => {
  return useContext(OrderContext);
};

//Context tại ra để bắt buộc phải đi qua order sản phẩm khi muốn vào trang payment