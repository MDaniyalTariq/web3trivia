
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Field } from '@headlessui/react';
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import { useRouter } from 'next/navigation';
import ReferralCodeForm from './ReferralCode';
import { useAddress } from '@thirdweb-dev/react';



interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        user_name: string;
        user_email: string;
        location: string;
        avatar_link: string;
    };
    onSave: (updatedData: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, userData, onSave }) => {
    const [fullName, setFullName] = useState(userData.user_name);
    const [email, setEmail] = useState(userData.user_email);
    const [location, setLocation] = useState(userData.location);
    const [file, setFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState(userData.avatar_link || '');
    const [loading, setLoading] = useState(false); // Loading state
    const wallet =useAddress(); 


    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        location: '',

    });

    const token = process.env.NEXT_PUBLIC_JWT_TOKEN;

    const router = useRouter();
  

   

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {

            const fileURL = URL.createObjectURL(selectedFile);
            // console.log("File URL us ",fileURL);
            setFile(selectedFile);
            setImagePreview(fileURL);
            // console.log("Image preview: ",imagePreview);
        }
    };



    const validateFields = () => {
        let newErrors = {
            fullName: '',
            email: '',
            location: '',
        };

        if (!fullName) {
            newErrors.fullName = 'Full Name is required';
        }
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!location) {
            newErrors.location = 'Location is required';
        }
        

        setErrors(newErrors);

        return !Object.values(newErrors).some((error) => error !== '');
    };

    const handleSave = async () => {
        if (validateFields()) {
            setLoading(true); // Start loading


            const storedAddress = wallet;
            let avatarLink = imagePreview || 'https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728518400&semt=ais_hybrid';

            if (file) {
                try {
                    const baseURL = process.env.NEXT_PUBLIC_AZURE_STORAGE_URL;
                    const sasToken = process.env.NEXT_PUBLIC_AZURE_SAS_TOKEN;

                    // Example usage
                    const uploadURL = `${baseURL}?${sasToken}`;



                    const blobServiceClient = new BlobServiceClient(
                        uploadURL
                    );

                    const containerClient = blobServiceClient.getContainerClient('useravatar');

                    // Generate a unique name for the blob
                    const blobName = `${Date.now()}-${file.name}`;

                    const blockBlobClient = containerClient.getBlockBlobClient(blobName);


                    // Upload the file
                    await blockBlobClient.uploadData(file, {
                        blobHTTPHeaders: { blobContentType: file.type }
                    });;


                    // Get the URL of the uploaded image
                    avatarLink = blockBlobClient.url;

                }
                catch (error) {
                    console.error("Image Upload failed :", error);
                    setLoading(false);

                    return;
                }

            }
            const updatedData = {
                wallet_address: storedAddress,
                user_email: email,
                user_name: fullName,
                location: location,
                avatar_link: avatarLink,
            };

            setLoading(true); // Start loading

            axios.post(
                'https://djangosport.azurewebsites.net/api/users/',
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
                .then((response) => {
                    onSave(updatedData);
                    onClose();
                })
                .catch((error) => {
                    console.error('Error saving data:', error);
                })
                .finally(() => {
                    setLoading(false); // End loading
                    router.push('/dashboard/settings');
                });
        } else {
            console.log('Validation failed.');
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-70 flex justify-center items-center p-4">
            <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-auto max-h-screen overflow-y-auto shadow-lg dark:shadow-2xl transition-all duration-300">
                {loading && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-80 flex justify-center items-center rounded-lg">
                        <svg
                            className="animate-spin h-16 w-16 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                            ></path>
                        </svg>
                        <span className="text-white text-xl ml-3">Saving...</span>
                    </div>
                )}
                <h2 className="text-gray-900 dark:text-white text-xl mb-4 text-center">Edit Profile</h2>
                <div className="flex flex-col items-center mb-4">
                    <label htmlFor="file-input">
                        <img
                            src={imagePreview || '/bruce-mars.png'}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full mb-4 object-cover cursor-pointer"
                        />
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-400 mb-1">Full Name:</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-400 mb-1">Email:</label>
                    <input
                        type="email"
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-400 mb-1">Location:</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                </div>

                <div className="mb-4">
                    {/* <label className="block text-gray-700 dark:text-gray-400 mb-1">Description:</label>
                    <textarea
                        className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )} */}
                    <ReferralCodeForm/>
                    
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    ) : null;

};

export default UserModal;
