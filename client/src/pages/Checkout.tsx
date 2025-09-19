import { useEffect, useState } from 'react'
import axiosInstance from '../Instance';
import { useSelector } from 'react-redux';
import type { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";
import { toast } from 'react-toastify';


const Checkout = () => {
  const navigate = useNavigate()
  const authDetails = useSelector((state: RootState) => state.authDetails);
  const [cartList, setCartList] = useState<CartItems[]>([]);
  const [billingSummary, setBillingSummary] = useState<billingSummary>();

  const getCartList = async () => {
    try {
      const respose = await axiosInstance.post('/cart/getCartItems', { userId: authDetails?._id });
      if (respose.status === 200) {
        setCartList(respose?.data?.data)
      }
    } catch (error) {
      console.log(error);

    }
  }

  const getBillingSummary = async () => {
    try {
      const response = await axiosInstance.post('/billing', { userId: authDetails?._id });
      if (response.status === 200) {
        console.log(response);
        setBillingSummary(response?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('====================================');
  console.log({ billingSummary });
  console.log('====================================');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, billingRes] = await Promise.all([
          getCartList(),
          getBillingSummary()
        ]);

        console.log("Cart:", cartRes);
        console.log("Billing:", billingRes);
        // update state here if needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [])

  const completePayment = () => {
    toast.success('Payment completed succesfully');

    setTimeout(() => {
      navigate('/products')
    }, 3000);
  }
  return (
    <div className='main-container'>
      <div className='d-flex justify-content-between'>
        <div>
          <b>Order Completion</b>
          <p>Booking Summary - APT-001</p>
        </div>
      </div>

      <div className='d-flex row' style={{ gap: 20 }}>
        <div className='products-used-container col-7'>
          <b style={{ padding: 10 }}>Products Used</b>
          {
            cartList.length > 0 && cartList.map((item) => (
              <div className='cart-product-item'>
                <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className='normal-text fs-6 fw-500'>{item?.productName}</p>
                  <div className='d-flex gap-2 align-items-center'>
                    <span><MdOutlineModeEdit className='cursor-pointer' /></span> | <span><MdOutlineDeleteOutline className='cursor-pointer' /></span>
                  </div>
                </div>
                <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className='d-flex' style={{ gap: 100 }}>
                    <div>
                      <span className='col-head'>Quantity</span>
                      <p>{item?.productQuantity}</p>
                    </div>
                    <div>
                      <span className='col-head'>Unit Price</span>
                      <p className='d-flex align-items-center'><MdOutlineCurrencyRupee />{item?.productPrice}</p>
                    </div>
                    <div>
                      <span className='col-head'>Total</span>
                      <p className='d-flex align-items-center'><MdOutlineCurrencyRupee />{item?.productPrice}</p>
                    </div>
                  </div>
                  <div>
                    <div className=' d-flex gap-1 align-items-center border p-1 px-3 rounded-2xl '>
                      <CiDiscount1 />
                      <span className='normal-text'>Special Discount</span>
                    </div>
                  </div>
                </div>
              </div>))
          }
          <div>
            <button className='add-products-btn' onClick={() => navigate('/products')}><b> + Add Products</b></button>
          </div>
        </div>
        <div className='col-4'>
          <div className='cart-container billing-summary'>
            <b>Billing Summary</b>
            <div>
              <div className='d-flex mb-2' style={{ justifyContent: 'space-between' }}>
                <span className='normal-text'>Service Total</span>
                <span className='normal-text'>{billingSummary?.serviceTotal}</span>
              </div>
              <div className='d-flex  mb-2' style={{ justifyContent: 'space-between' }}>
                <span className='normal-text'>Product Total</span>
                <span className='normal-text'>{billingSummary?.productTotal}</span>
              </div>
              <div className='d-flex  mb-2' style={{ justifyContent: 'space-between' }}>
                <span className='normal-text'>Order Discount (%)</span>
                <input type="number" value={0} className='form-control' style={{ height: 25, width: 50 }} />
              </div>
              <div className='d-flex  mb-2' style={{ justifyContent: 'space-between' }}>
                <span className='normal-text'>Tax({billingSummary?.taxPercent}%)</span>
                <span className='normal-text'>{billingSummary?.tax}</span>
              </div>
              <hr />
              <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                <b className='normal-text'>Final Total</b>
                <b className='normal-text'>{billingSummary?.finalTotal}</b>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <button className='checkout-btn' onClick={completePayment}><b>Complete Payment</b></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

type CartItems = {
  _id: string,
  userId: string,
  productId: string,
  productName: string,
  productImage: string,
  productPrice: number,
  productQuantity: number,
  createdAt: string,
}

type billingSummary = {
  serviceTotal: string,
  productTotal: string,
  orderDiscount: number,
  taxPercent: string,
  tax: string,
  finalTotal: string
}