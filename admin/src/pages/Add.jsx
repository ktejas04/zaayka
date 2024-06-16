import React, { useEffect, useRef, useState } from 'react';
import { assets, menu_list } from '../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    });
    const [newCategory, setNewCategory] = useState(false);
    const [newCategoryValue, setNewCategoryValue] = useState("");

    const fileInputRef = useRef(null);

    // useEffect(() => console.log(data), [data])
    // useEffect(() => console.log(formData), [formData]);
    // useEffect(() => console.log(fileInputRef), [fileInputRef]);

    //fileInputRef is used to set the image ref to null once item is added, else we cannot select same image as it is also being referenced to.

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", newCategory ? newCategoryValue : data.category);
        formData.append("price", Number(data.price));
        formData.append("image", image);

        // console.log("Form Data:", Array.from(formData.entries())); // Logging formData to check contents

        try {
            const response = await axios.post(`${url}/api/v1/food/add`, formData);
            // console.log(response.data);
            // response.data.success = false;
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    category: "Salad",
                    price: ""
                });
                setImage(false);
                // console.log(fileInputRef.current.value);
                fileInputRef.current && (fileInputRef.current.value = null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error submitting the form');
            console.error('Submission error:', error);
        }
    }
    

    const onChangeHandler = (event) => {
        if (event.target.name === "image") {
            // console.log(event.target.files);
            setImage(event.target.files[0]);
        } else if (event.target.name === "category") {
            setNewCategory(event.target.value === "New");
            setData(data => ({
                ...data,
                [event.target.name]: event.target.value
            }));
        } else {
            setData(data => ({
                ...data,
                [event.target.name]: event.target.value
            }));
        }
        // console.log(data,image);
    }

    const onNewCategoryChange = (event) => {
        setNewCategoryValue(event.target.value);
    }

  return (
    <div className='py-16 px-32'>
        <form onSubmit={onSubmitHandler}>

            {/* Image */}
            <div className='mb-20'>
                <p className='mb-6 text-xl'>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" width={240}
                    className={`rounded-md border ${image ? "" : "border-dashed"} border-neutral- cursor-pointer`}
                    />
                </label>
                <input type="file" name="image" id="image" hidden required ref={fileInputRef} onChange={onChangeHandler}/>
            </div>
            {/* {console.log(image)} */}

            {/* Name */}
            <div className='mb-20'>
                <p className='mb-6 text-xl'>Product Name</p>
                <input value={data.name} name="name"
                onChange={onChangeHandler}
                type="text" className='bg-neutral-100 px-4 py-2 outline-none rounded-md w-[20vw] cursor-edit' placeholder='Name'/>
            </div>

            {/* Description */}
            <div className='mb-20'>
                <p className='mb-6 text-xl'>Product Description</p>
                <textarea value={data.description} name="description"
                onChange={onChangeHandler}
                className='bg-neutral-100 px-4 py-2 outline-none rounded-md w-[20vw] cursor-edit resize-none' rows="3" placeholder='Description'></textarea>
            </div>

            {/* Category and Price */}
            <div className='flex gap-[3.75rem]'>
                <div className='mb-20'>
                    <p className='mb-6 text-xl'>Product Category</p>
                    <select value={data.category} name='category' onChange={onChangeHandler}
                     className='py-2 px-4 cursor-pointer rounded-md'>
                        <option value="New">Add New Category</option>
                        {
                            menu_list.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))
                        }
                    </select>
                    {
                            newCategory && (
                                <input
                                    type="text"
                                    value={newCategoryValue}
                                    onChange={onNewCategoryChange}
                                    placeholder="Enter New Category"
                                    className='bg-neutral-100 px-4 py-2 outline-none rounded-md w-[12vw] cursor-edit mt-4 ml-6'
                                />
                            )
                    }
                </div>
                <div className='mb-20'>
                    <p className={`${newCategory? "mb-10" : "mb-6"} text-xl`}>Product Price</p>
                    ₹ <input value={data.price} name='price' onChange={onChangeHandler}
                   type="number" min="1" className='bg-neutral-100 px-4 py-2 outline-none rounded-md cursor-edit w-28' placeholder='100' />
                </div>
            </div>

            {/* Add Button */}
            {/* {setFormData()} */}
            <button type='submit'
              className='bg-carrot/85 hover:bg-carrot duration-300 text-white ml-24 px-8 py-2 rounded-xl text-xl font-semibold border-2 border-red-500'>Add Item</button>
            
        </form>
    </div>
  )
}

export default Add
