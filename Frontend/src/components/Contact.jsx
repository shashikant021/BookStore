import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


function Contact() {

    const host = 'http://localhost:4001';
    // const host = 'https://bookstorebackend-7tkf.onrender.com';

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        const contactInfo = {
            name: data.name,
            email: data.email,
            contact: data.contact,
            subject: data.subject,
            message: data.message
        }
        await axios.post(`${host}/contact`, contactInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Contact form submitted successfully");
                    setTimeout(() => {
                        window.location.reload();
                    }, 500)
                }
                localStorage.setItem('success', JSON.stringify(res.data.Contact))
            }).catch((err) => {
                if (err.response) {
                    console.log(err)
                    toast.error('Try again ' + err.response.data.message);
                }
            })
    }

    return (
        <>
            <div className='flex  items-center justify-center dark:bg-slate-800 dark:text-white  '>
                <div className='lg:w-[600px]'>
                    <form className=' modal-box w-96  lg:w-[800px]  dark:bg-slate-700 dark:text-white'
                        onSubmit={handleSubmit(onSubmit)} >
                        <h1 className='text-center text-xl lg:p-4 p-1'>Leave a Message</h1>
                        <div className='lg:pl-8'>
                            <div className='m-2'>
                                <div><label>Name </label></div>
                                <input type="text" placeholder="Name..."
                                    minLength={4} required
                                    className="lg:w-96 w-80 px-4 py-2 border outline-none  rounded-md dark:bg-slate-700 dark:text-white"
                                    {...register('name', { required: true })} />
                            </div>
                            <div className='m-2 mt-4'>
                                <div><label>Email </label></div>
                                <input type="email" placeholder="Email id"
                                    required
                                    className="lg:w-96 w-80 px-4 py-2 border outline-none rounded-md dark:bg-slate-700 dark:text-white"
                                    {...register('email', { required: true })} />
                            </div>
                            <div className='m-2 mt-4'>
                                <div><label>Contact </label></div>
                                <input type="number" placeholder="Contact Number" required
                                    className="lg:w-96 w-80 px-4 py-2 border outline-none rounded-md dark:bg-slate-700 dark:text-white"
                                    {...register('contact', { required: true, minLength: 10, maxLength: 10 })} />
                                {errors.contact && (
                                    <span className="text-sm text-red-500">
                                        Required 10 Digit
                                    </span>
                                )}
                            </div>
                            <div className='m-2 mt-4'>
                                <div><label>Subject </label></div>
                                <input type="text" placeholder="Related to..."
                                    minLength={5} required
                                    className="lg:w-96 w-80 px-4 py-2 border outline-none  rounded-md dark:bg-slate-700 dark:text-white"
                                    {...register('subject', { required: true })} />
                            </div>
                            <div className='m-2 mt-4'>
                                <div><label>Message </label></div>
                                <textarea
                                    className="textarea textarea-bordered lg:w-96 w-80 px-4 py-2 border outline-none  rounded-md dark:bg-slate-700 dark:text-white "
                                    placeholder="Write Your Query Here" {...register('message', { required: true })}
                                    minLength={8} required ></textarea>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className=" bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                                Submit Now
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact
