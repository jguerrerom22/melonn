import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useOrderCreate } from '../hooks/useOrderCreate';

const OrderForm = () => {

  const {
    register,
    handleSubmit,
    createOrder,
    shippingMethods,
    items,
    addItem,
    removeItem,
    editItem
  } = useOrderCreate();

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} size="2x"   />
      </Link>

      <h2 className="mt-2">Create Order</h2>
      <form onSubmit={handleSubmit(createOrder)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Seller Store</label>
            <input type="text" className="form-control" {...register("sellerStore", { required: true })} />    
          </div>
          <div className="form-group col-md-6">
            <label>Shipping Method</label>
            <select className="form-control" {...register("idShippingMethod", { required: true })}>
              <option value="">Select</option>
              {
                shippingMethods.map(item => (
                  <option key={item.id} value={item.id}>{ item.name }</option>
                ))
              }
            </select>
          </div>
          
          <div className="form-group col-md-6">
            <label>External order number</label>
            <input type="text" className="form-control" {...register("externalOrderNumber", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Buyer full name</label>
            <input type="text" className="form-control" {...register("buyerFullName", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Buyer phone number</label>
            <input type="text" className="form-control" {...register("buyerPhoneNumber", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Buyer email</label>
            <input type="text" className="form-control" {...register("buyerEmail", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Shipping address</label>
            <input type="text" className="form-control" {...register("shippingAddress", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Shipping city</label>
            <input type="text" className="form-control" {...register("shippingCity", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Shipping region</label>
            <input type="text" className="form-control" {...register("shippingRegion", { required: true })} /> 
          </div>
          <div className="form-group col-md-6">
            <label>Shipping country</label>
            <input type="text" className="form-control" {...register("shippingCountry", { required: true })} />
          </div>
        </div>

        <h3>
          Items
          <button
            type="button"
            className="btn btn-success ml-3 pt-2 rounded-circle"
            onClick={addItem}
          ><FontAwesomeIcon icon={faPlus}  /></button>
        </h3>
        
        <div className="mb-4">
          {
            items.map(x => (
              <div className="row mt-2" key={x.id}>
                <div className="col-md-5">
                  <input
                    type="text"
                    defaultValue={x.name}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => editItem(x.id, 'name', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    defaultValue={x.qty}
                    className="form-control"
                    placeholder="Quantity"
                    onChange={(e) => editItem(x.id, 'qty', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    defaultValue={x.weight}
                    className="form-control"
                    placeholder="Weight"
                    onChange={(e) => editItem(x.id, 'weight', e.target.value)}
                  />
                </div>
                <div className="col-md-1 pt-2">
                  <button
                    onClick={() => removeItem(x.id)}
                    style={{ border: 0, backgroundColor: 'transparent' }}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                  </button>
                  
                </div>
              </div>
            ))
          }
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
        >Create Order</button>
      </form>
    </div>
  )
}

export default OrderForm;