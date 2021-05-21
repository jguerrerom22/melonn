import { useState, useEffect } from 'react';
import ordersApi from '../api/ordersApi';

export const useOrderDetail = (id) => {
  const [order, setOrder] = useState({});

  const getOrder = async () => {
    const result = await ordersApi.get(`/orders/${id}`);
    setOrder(result.data);
  }

  useEffect(() => {
    getOrder();
  }, [])

  return {
    order
  }
}
