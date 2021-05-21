import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTags, faInfoCircle, faDolly, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";
import { useOrderDetail } from '../hooks/useOrderDetail';

const OrderDetail = () => {
  const { id } = useParams();
  const { order } = useOrderDetail(id);

  return (
    <div>
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} size="2x"   />
      </Link>
      <h3 className="mt-2"><FontAwesomeIcon icon={faInfoCircle} /> Order Information</h3>
      <div className="row">
        <div className="col-md-4">
          <span>External order number</span>
          <h5>{ order.id }</h5>
        </div>
        <div className="col-md-4">
          <span>Buyer full name</span>
          <h5>{ order.buyerFullName }</h5>
        </div>
        <div className="col-md-4">
          <span>Buyer phone number</span>
          <h5>{ order.buyerPhoneNumber }</h5>
        </div>
        <div className="col-md-4">
          <span>Buyer email</span>
          <h5>{ order.buyerEmail }</h5>
        </div>
      </div>

      <h3 className="mt-5"><FontAwesomeIcon icon={faDolly} /> Shipping info</h3>
      <div className="row">
        <div className="col-md-4">
          <span>Shipping address</span>
          <h5>{ order.shippingAddress }</h5>
        </div>
        <div className="col-md-4">
          <span>Shipping city</span>
          <h5>{ order.shippingCity }</h5>
        </div>
        <div className="col-md-4">
          <span>Shipping region</span>
          <h5>{ order.shippingRegion }</h5>
        </div>
        <div className="col-md-4">
          <span>Shipping country</span>
          <h5>{ order.shippingCountry }</h5>
        </div>
      </div>

      <h3 className="mt-5"><FontAwesomeIcon icon={faCalendarWeek} /> Promise dates</h3>
      <div className="row">
        <div className="col-md-4">
          <span>Pack promise min</span>
          <h5>{ order.packPromiseMin || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Pack promise max</span>
          <h5>{ order.packPromiseMax || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Ship promise min</span>
          <h5>{ order.shipPromiseMin || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Ship promise max</span>
          <h5>{ order.shipPromiseMax || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Delivery promise min</span>
          <h5>{ order.deliveryPromiseMin || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Delivery promise max</span>
          <h5>{ order.deliveryPromiseMax || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Ready pickup promise min</span>
          <h5>{ order.readyPickupPromiseMin || '-' }</h5>
        </div>
        <div className="col-md-4">
          <span>Ready pickup promise max</span>
          <h5>{ order.readyPickupPromiseMax || '-' }</h5>
        </div>
      </div>

      <h3 className="mt-5"> <FontAwesomeIcon icon={faTags} /> Items</h3>
      <div className="mb-5">
        {
          order.items && order.items.map(item => (
            <div className="row mt-3" key={item.id}>
              <div className="col-md-4">
                <h5 className="m-0">{ item.name }</h5>
                <span>Name</span>
              </div>
              <div className="col-md-4">
                <h5 className="m-0">{ item.qty }</h5>
                <span>Quantity</span>
              </div>
              <div className="col-md-4">
                <h5 className="m-0">{ item.weight }</h5>
                <span>Weight</span>
              </div>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default OrderDetail;