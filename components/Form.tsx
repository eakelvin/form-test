'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
    personalInfo: {
        firstName: string;
        lastName: string;
        dob: string;
    }[]; 
    citiesTravelled: {
        dateArrived: string;
        city: string;
        xtraCity?: string,
        extraCity?: string
    }[];
};

const steps = [
    { id: 'Step 1', name: 'Personal Information'},
    { id: 'Step 2', name: 'Cities Travelled'},
    { id: 'Step 3', name: 'Complete' }
]

const Form = () => {
    const { register, handleSubmit, formState: { errors, isSubmitSuccessful, isValid }, reset } = useForm<FormData>();
    const [formData, setFormData] = useState<FormData | null>(null);
    const [currentStep, setCurrentStep] = useState(0)
    const [showInput, setShowInput] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const onSubmit = async (data: FormData) => {
        try {
            console.log('Form data submitted:', data);
            setFormData(data);
            next()
            reset();
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleAddInput = () => {
        setShowInput(true)
    }

    const next = () => {
        if (isValid) {
            if (currentStep < steps.length - 1) {
                setCurrentStep(step => step + 1)
            }          
        } else {
            setErrorMessage('Fill in the details to continue') 
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1)
        }
    }


    return (
        <div className=''>
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                            {currentStep > index ? (
                                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-sky-600 transition-colors '>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : currentStep === index ? (
                                <div
                                    className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                    aria-current='step'
                                >
                                    <span className='text-sm font-medium text-sky-600'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            ) : (
                                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                    <span className='text-sm font-medium text-gray-500 transition-colors'>
                                        {step.id}
                                    </span>
                                    <span className='text-sm font-medium'>{step.name}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
                {currentStep === 0 && (
                    <div className='mt-8'>
                        <h1 className='font-bold text-center mb-5 text-2xl'>Personal Information</h1>
                        <div className='mb-5'>
                            <label htmlFor="firstName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your first name"
                                required
                                {...register(`personalInfo.${0}.firstName`, { required: true })}  
                            />
                             {errors.personalInfo?.[0]?.firstName && ( <p>FirstName is Required</p> )}
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="lastName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your last name"
                                required
                                {...register(`personalInfo.${0}.lastName`, { required: true })}
                            />
                            {errors.personalInfo?.[0]?.lastName && ( <p>LastName is Required</p> )}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="dob" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Date of Birth</label>
                            <div className="relative max-w-xl">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date"
                                    {...register(`personalInfo.${0}.dob`, { required: true })}
                                />
                                {errors.personalInfo?.[0]?.dob && ( <p>Date of Birth is Required</p> )}
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 mt-2">
                                {errorMessage}
                            </div>
                        )}
                        <div className='flex justify-center'>
                            <button
                                type='button'
                                onClick={next}
                                disabled={currentStep === steps.length - 1}
                                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='h-6 w-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className='mt-8'>
                        <h1 className='font-bold text-center mb-5 text-2xl'>Cities Travelled</h1>
                        <div className="mb-5">
                            <label htmlFor="dateArrived" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Date Arrived</label>
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    // {...register('dateArrived')}
                                    {...register(`citiesTravelled.${0}.dateArrived`)}
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor="city" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">City Name</label>
                            <input
                                type="text"
                                id="city"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter city name"
                                required
                                // {...register('city')}
                                {...register(`citiesTravelled.${0}.city`)}
                            />
                        </div>
                        <div className='mb-5'>
                            <button
                                type='button'
                                onClick={handleAddInput} 
                                className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                                Add more
                            </button>

                            {showInput && (
                                <div>
                                <input
                                    type="text"
                                    id="xtraCity"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter Additional City" 
                                    {...register(`citiesTravelled.${0}.xtraCity`)}                        
                                />
                                <input
                                    type="text"
                                    id="extraCity"
                                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter Additional City" 
                                    {...register(`citiesTravelled.${0}.extraCity`)}                        
                                />
                                </div>
                            )}
                        </div>

                        <div className='flex justify-center'>
                        <button
                            type='button'
                            onClick={prev}
                            // disabled={!currentStep}
                            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                            <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                            >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 19.5L8.25 12l7.5-7.5'
                            />
                            </svg>
                        </button>
                            <button
                                type="submit"
                                className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 2 && formData && (
                    <div className='mt-8'>
                        <h1 className='font-bold text-center text-2xl'>Complete</h1>
                        <p className='text-xl-leading-6 text-center'>Thank you for your submission</p>
                        <p className='mt-1'>Sample JSON of your Information</p>
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                    </div>
                )}
            </form>

            {/* <div className='mt-8 pt-5'>
            <div className='flex justify-between'>
            <button
                type='button'
                onClick={prev}
                disabled={currentStep === 0}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
                <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
                >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 19.5L8.25 12l7.5-7.5'
                />
                </svg>
            </button>
            <button
                type='button'
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
                <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
                >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
                </svg>
            </button>
            </div>
            </div> */}
        </div>
    )
}

export default Form