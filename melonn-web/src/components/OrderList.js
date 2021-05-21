import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { useOrderList } from '../hooks/useOrderList';

const OrderList = () => {

  const { orders } = useOrderList();

  const renderRow = ({ id, sellerStore, creationDate, shippingMethod }) => {
    return (
      <tr>
        <td>{ id }</td>
        <td>{ sellerStore }</td>
        <td>{ creationDate }</td>
        <td>{ shippingMethod }</td>
        <td>
          <Link to={`/detail/${id}`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </td>
      </tr>
    )
  }

  return (
    <div>
        <div className="float-right">
          <Link to="/create">
            <FontAwesomeIcon icon={faPlus} />
            <span className="ml-2">Create Order</span>
          </Link>
        </div>
        
        <h2>Orders</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Sell Order number</th>
              <th>Seller Store</th>
              <th>Creation Date</th>
              <th>Shipping Method</th>
              <th></th>
            </tr>
            {
              orders.map(order => renderRow(order))
            }
          </thead>
        </table>
    </div>
  )
}

export default OrderList;