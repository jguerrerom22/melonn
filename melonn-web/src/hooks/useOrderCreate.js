import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import ordersApi from '../api/ordersApi'
import awsApi from '../api/awsApi'

export const useOrderCreate = () => {
  
  let history = useHistory();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [items, setItems] = useState([]);
  const { register, control, handleSubmit } = useForm();

  const getShippingMethods = async () => {
    const methods = await awsApi.get('/shipping-methods');
    setShippingMethods(methods.data);
  }


  const createOrder = async (data) => {
    const dataReq = {
      ...data,
      shippingMethod: shippingMethods.find(x => x.id === Number(data.idShippingMethod)).name,
      items
    }
    await ordersApi.post('/orders', dataReq);
    history.push('/')
  }

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        name: '',
        qty: '',
        weight: ''
      }
    ])
  }

  const removeItem = (id) => {
    const newItems = items.filter(x => x.id !== id);
    setItems(newItems);
  }

  const editItem = (id, attr, value) => {
    const newItems = items;
    const index = items.findIndex(x => x.id === id);
    newItems[index][attr] = value;
    setItems(newItems);
  }

  useEffect(() => {
    getShippingMethods()
  }, [])

  return {
    register,
    handleSubmit,
    createOrder,
    shippingMethods,
    items,
    addItem,
    removeItem,
    editItem
  }
}
