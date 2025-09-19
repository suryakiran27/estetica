import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from '../assets/signupImg.png';
import { useForm } from 'react-hook-form';
import axiosInstance from '../Instance';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { isAxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { addAuthDetails } from '../features/authSlice';

type FormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [isLogin, setIsLogin] = useState(true);
    const [isloading, setIsloading] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            setIsloading(true);
            const response = await axiosInstance.post('/signup', data);
            if (response.status === 201) {
                console.log("User registered successfully", response.data);
                setIsloading(false);
                toast.success("User registered successfully. Please login to continue.");
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Error registering user", error);
            setIsloading(false);
            toast.error("Error registering user. Please try again.");
        }
    }

    const loginSubmitHandler = async (data: any) => {
        try {
            setIsloading(true)
            const payload = {
                email: data?.email,
                password: data?.password
            }
            const response = await axiosInstance.post('/signin', payload);
            console.log(response?.data?.customer);
            if (response.status === 200 && response.data?.isUser) {
                setIsloading(false)
                dispatch(addAuthDetails(response?.data?.customer))
                navigate('/products')
            } else {
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setIsloading(false)
            if (isAxiosError(error)) {
                toast.error(error?.response?.data?.message)
            }
        }
    }

    return (
        <>
            {
                isLogin ?
                    <div className='d-flex bg-indigo-100' style={{ justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
                        <div className='text-center p-1 m-auto'>
                            <h4 className=''>Welcome Back to Estetica Your Beauty & Wellness Hub</h4>
                            {/* <p>Enter your credentials to access your account and continue your journey to effortless beauty and wellness.</p> */}
                            <img src={signupImage} alt="Sign Up" height={500} width={500} className='rounded-2xl m-auto' />
                        </div >
                        <div className='p-1 m-auto'>
                            < h2 className='heading text-center' > Login </ h2>
                            <p className='text-center'>Please enter your login details</p>
                            <div className='d-flex flex-column'>
                                <input type="email" {...register('email', {
                                    required: "Email Address is required", pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address format"
                                    }
                                })}
                                    style={{ width: 350 }}
                                    className="form-control my-1" placeholder='Email' />
                                {errors.email && <div className='error-message'>{errors?.email?.message}</div>}
                                <input type="password" {...register('password', {
                                    required: "Password is Required", pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
                                    }
                                })}
                                    className="form-control my-1" placeholder='Password' />
                                {errors.password && <div className='error-message'>{errors?.password?.message}</div>}
                            </div>
                            <div className='text-center mt-4'>
                                <button className='button' onClick={handleSubmit(loginSubmitHandler)}>Login</button>
                                <p className='mt-2 normal-text'>Don't have an account? <span className='text-primary' style={{ cursor: 'pointer' }} onClick={() => setIsLogin(false)}>Sign Up</span></p>
                            </div>
                        </div >
                    </div>
                    :
                    <div className='d-flex bg-indigo-100' style={{ justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
                        <div className='text-center p-3 m-auto'>
                            <h2 className='heading text-center'>Welcome to Estetica</h2>
                            <h4 className=''>Your One-Stop Beauty & Wellness Hub</h4>
                            <p>Discover top-rated salons, spas & skin-care services — book, save, and glow effortlessly.</p>
                            <img src={signupImage} alt="Sign Up" height={500} width={500} className='rounded-2xl m-auto' />
                        </div>
                        <div className=' p-3 m-auto'>
                            <div className="text-center">
                                <h3 className='heading'>Create Account</h3>
                                <p className=''>Please fill in the details to create your account</p>
                            </div>
                            <div className='d-flex flex-column'>
                                <input type="text" {...register('name', { required: "Full Name is required" })} className="form-control my-1" placeholder='Full Name' />
                                {errors.name && <div className='error-message'>{errors?.name?.message}</div>}
                                <input type="email" {...register('email', {
                                    required: "Email Address is required", pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address format"
                                    }
                                })} className="form-control my-2" placeholder='Email' />
                                {errors.email && <div className='error-message'>{errors?.email?.message}</div>}
                                <input type="number" {...register('phone', { required: "Phone Number is required", min: 10 })} className="form-control my-2" placeholder='Phone Number' />
                                {errors.phone && <div className='error-message'>{errors?.phone?.message}</div>}
                                <input type="password" {...register('password', {
                                    required: "Password is Required", pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
                                    }
                                })}
                                    className="form-control my-2" placeholder='Password' />
                                {errors.password && <div className='error-message'>{errors?.password?.message}</div>}
                            </div>
                            <div className='text-center mt-4'>
                                <button className='button rounded-2xl' onClick={handleSubmit(onSubmit)}>{isloading && <Spinner size='sm' />}  Sign Up</button>
                                <p className='mt-2 normal-text'>Already have an account? <span className='text-primary' style={{ cursor: 'pointer' }} onClick={() => setIsLogin(true)}>Login</span></p>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default SignUp