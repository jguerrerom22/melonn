import { useState, useEffect } from 'react'
import ordersApi from '../api/ordersApi'

export const useOrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const result = await ordersApi.get('/orders');
    setOrders(result.data);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return {
    orders
  }
}
