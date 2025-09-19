import { Route, Routes } from 'react-router-dom'
import './App.css';
import React, { lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './features/store';
import NavBarLayout from './components/NavBarLayout';
import { ToastContainer } from 'react-toastify';
const ProductsPage = lazy(() => import('./pages/Products'));
const CheckoutPage = lazy(() => import('./pages/Checkout'));
const SignUpPage = lazy(() => import('./pages/SignUp'));
function App() {

  return (
    <React.Fragment>
      <Provider store={store}>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
        />
        <Routes>
          <Route path='/' element={<SignUpPage />} />
          <Route element={<NavBarLayout />}>
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Provider>
    </React.Fragment>
  )
}

export default App
