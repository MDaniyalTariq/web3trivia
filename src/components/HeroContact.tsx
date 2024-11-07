import { useState, ChangeEvent, FormEvent } from 'react';
import emailjs from 'emailjs-com';

type FormData = {
    email: string;
};

type FormErrors = {
    email?: string;
};

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({ email: '' });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateField = (name: keyof FormData, value: string) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Email address is invalid';
                }
                break;
        }
        return error;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const error = validateField(name as keyof FormData, value);
        setFormErrors({
            ...formErrors,
            [name]: error
        });
    };

    const validateForm = () => {
        let errors: FormErrors = {};
        for (const [key, value] of Object.entries(formData)) {
            const error = validateField(key as keyof FormData, value);
            if (error) {
                errors[key as keyof FormErrors] = error;
            }
        }

        return errors;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccessMessage('');
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);

        const userID = 'lB1NqZSQe4BG_i94L';
        const serviceID = 'service_yzvu6tn';
        const templateID = 'template_52ojlxh';

        const templateParams = {
            to_email: 'your-email@example.com',
            from_email: formData.email,
        };

        try {
            await emailjs.send(serviceID, templateID, templateParams, userID);
            setSuccessMessage('Message sent successfully!');
            setFormData({ email: '' });
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            alert('Failed to send message.');
            console.error('EmailJS error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-y-2 items-center'>
                <form
                    action="#"
                    className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-gray-400 dark:text-gray-400 shadow-lg shadow-transparent dark:shadow-transparent border border-gray-800 dark:border-gray-800 bg-gray-900 dark:bg-gray-900 rounded-full ease-linear focus-within:bg-gray-950 dark:focus-within:bg-gray-950 focus-within:border-blue-600"
                    onSubmit={handleSubmit}
                >
                    <span className="min-w-max pr-2 border-r border-gray-800 dark:border-gray-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                            />
                        </svg>
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        className={`w-full py-3 border-none bg-transparent ${formErrors.email && 'border-red-500'}`}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className={`flex text-white justify-center items-center w-max min-w-max sm:w-max px-6 h-12 rounded-full outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-[#172554] hover:after:opacity-100 hover:after:scale-[2.5] bg-blue-600 border-transparent hover:border-[#172554] ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isSubmitting}
                    >
                        <span className="hidden sm:flex relative z-[5]">
                            Get Started
                        </span>
                        <span className="flex sm:hidden relative z-[5]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </span>
                    </button>
                </form>
                <div>
                    {formErrors.email && <p className="text-red-500 text-xs mt-2">{formErrors.email}</p>}
                    {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
            </div>


        </>
    );
};
export default ContactForm;
