import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import axiosInstance from '../Instance';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../features/store';
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../features/cart/cartSlice';
import { isAxiosError } from 'axios';

type Product = {
    _id: number
    name: string;
    price: number;
    category: string;
    image: string;
}

const Products = () => {
    const navigate = useNavigate();
    const cartList = useSelector((state: RootState) => state.cartSlice.items);
    const autthDetails = useSelector((state: RootState) => state.authDetails);
    const dispatch = useDispatch();

    const [categoriesList, setCategoriesList] = useState([]);
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');

    console.log('====================================');
    console.log(searchText);
    console.log('====================================');

    const categorysSelected = (category: string) => {
        console.log(category);
        setSelectedCategory(category);
        getProductsList(category);
    }

    const selectedProductHandler = (id: string) => {
        console.log("product selected", id);
        setSelectedProduct(id)
        const product = productsList.find(p => p._id.toString() === id);
        if (product) {
            const productData = {
                userId: autthDetails?._id,
                productId: product?._id,
                productImage: product?.image,
                productName: product?.name,
                productPrice: product?.price,
                productQuantity: 1
            }
            dispatch(addToCart(productData));
            addtoCartHandler(product);
        }
    }

    const gotoCheckout = () => {
        console.log("goto checkout");
        // navigate to checkout page
        navigate('/checkout');
    }

    const getCategoriesList = async () => {
        try {
            const response = await axiosInstance.get('/categories');
            console.log("categories list", response.data);
            if (response.status === 200) {
                setCategoriesList(response.data.categories);

            }
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

    const getProductsList = async (category: string) => {
        try {
            const response = await axiosInstance.post(`/products?category=${encodeURIComponent(category)}&search=${encodeURIComponent(searchText)}`);
            console.log("products list", response.data);
            if (response.status === 200) {
                setProductsList(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products", error);
        }
    }

    const addtoCartHandler = async (product: Product) => {
        try {
            const payload = {
                userId: autthDetails?._id,
                productId: product?._id,
                productName: product?.name,
                productImage: product?.image,
                productPrice: product?.price,
                productQuantity: 1
            }
            const response = await axiosInstance.post('/cart/addCart', payload);
            console.log('cart resp', response);
            if (response.status === 200) {

            }
        } catch (error) {

        }
    }

    const getCartsListHandler = async () => {
        try {
            const response = await axiosInstance.post('/cart/getCartItems', { userId: autthDetails?._id });
            console.log('get crat items:', response);
            if (response.status === 200) {
                setSelectedProduct('')
                dispatch(addToCart(response?.data?.data));
            }
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getProductsList('')
    }, [searchText])


    useEffect(() => {
        getCategoriesList();
        getCartsListHandler();
    }, [])

    const increseQuantityHandler = (qty: number, id: string) => {
        dispatch(increaseQuantity({ quantity: qty, id }))
    }
    const decreseQuantityHandler = (qty: number, id: string) => {
        dispatch(decreaseQuantity({ quantity: qty, id }))
    }

    const clearCartHandler = async () => {
        try {
            const response = await axiosInstance.post('/cart/removeCart', { userId: autthDetails?._id });
            if (response.status === 200) {
                dispatch(removeFromCart());
                setSelectedProduct(null)
            }
        } catch (error) {
            if (isAxiosError(error)) {

            }
        }
    }
    console.log("cart list", cartList);

    return (
        <div className='main-container'>
            <p className='fw-bold fs-6'>Products</p>
            <div>
                <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} className="form-control" style={{ height: 40, width: 300, borderRadius: 10 }} placeholder='Search for products ?' />
            </div>
            <div className='categories-container'>
                {categoriesList.map((category, index) => (
                    <div key={index} className={`categorie-item ${selectedCategory === category && 'active-category'}`} onClick={() => categorysSelected(category)}>
                        <span className='normal-text'>{category}</span>
                    </div>
                ))}
            </div>
            <div className='products-main-container'>
                <div className='products-container'>
                    {
                        productsList.map((product, index) => (
                            <div key={index} className='product-card' onClick={() => selectedProductHandler(product._id.toString())}>
                                <img src={product.image} alt={product.name} className='product-image' />
                                <p className='normal-text mt-3'>{product.name}</p>
                            </div>
                        ))
                    }
                </div>
                {
                    cartList.length > 0 && selectedProduct !== null && (
                        <div>
                            <div className='cart-container'>
                                <div className='d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p>Product Cart</p>
                                    <FaRegTrashAlt color='red' className='cursor-pointer' onClick={clearCartHandler} />
                                </div>

                                {cartList.map((item) => (
                                    console.log('item in loop:', item),
                                    <div className='cart-product-item'>
                                        <div className='d-flex' style={{ alignItems: 'center', gap: 10 }}>
                                            <img src={item?.productImage} className='rounded-xl' alt="" height={50} width={50} />
                                            <div>
                                                <p className='normal-text'>{item?.productName}</p>
                                                <div className='d-flex gap-30' style={{ justifyContent: 'space-between', }}>
                                                    <div>{item?.productPrice}</div>
                                                    <div className=''>
                                                        <button className='quantity-btn mx-2' onClick={() => decreseQuantityHandler(1, item?.productId)}>-</button>
                                                        <span>{item?.productQuantity}</span>
                                                        <button className='quantity-btn mx-2' onClick={() => increseQuantityHandler(1, item?.productId)} >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>))
                                }
                            </div>
                            <button className='checkout-btn' onClick={() => gotoCheckout()}><b>Checkout</b></button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Products