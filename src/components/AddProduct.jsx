"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

const AddProduct = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [units, setUnits] = useState("");
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("Shirts");
    const [loaderStatus, setLoaderStatus] = useState(false);
    const options = ["Shirts", "Polos", "Trousers", "Knitwear", "Blazers", "Outerwear", "Footwear", "Accessories"];

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/gif": [".gif"],
        },
        maxFiles: 1,
    });

    const addProductHandler = async (e) => {
        e.preventDefault();
        setLoaderStatus(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("units", units);
        formData.append("category", category);
        formData.append("image", file);
        try {
            const response = await axios.post("/api/admin/add-product", formData);
            toast.success(response.data.message);
            setTitle("");
            setDescription("");
            setPrice("");
            setUnits("");
            setFile(null);
            setCategory("");
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
        setLoaderStatus(false);
    }

    return (
        <div className="min-h-[91vh] flex flex-col justify-evenly items-center py-10 md:py-0">
            <div className="w-[95%]">
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold tracking-tight">Add Product</h2>
                    <p className="text-sm text-gray-500 mt-1">Fill in the details below to list a new item</p>
                </div>
                <form onSubmit={addProductHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border p-5 flex flex-col gap-4">
                        <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">Product Info</p>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Title</label>
                            <input value={title} onChange={(e) => { setTitle(e.target.value); }} className="h-10 text-sm px-3 border" type="text" placeholder="Enter Title" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium">Description</label>
                            <textarea value={description} onChange={(e) => { setDescription(e.target.value); }} className="h-32 text-sm p-3 border resize-none" placeholder="Enter Description" required></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Price</label>
                                <div className="relative">
                                    <input value={price} onChange={(e) => { setPrice(e.target.value); }} className="h-10 w-full text-sm p-3 border" type="number" placeholder="0" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">Units in stock</label>
                                <input value={units} onChange={(e) => { setUnits(e.target.value); }} className="h-10 text-sm px-3 border" type="number" placeholder="0" required />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="bg-white border p-5">
                            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-4">Product Image</p>
                            <div {...getRootProps()} className={`border-2 border-dashed h-40 flex flex-col items-center justify-center gap-2 cursor-pointer text-center px-3 transition-colors ${isDragActive ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
                                <input {...getInputProps()} />
                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <Image className="h-32 w-32 object-cover rounded" src={URL.createObjectURL(file)} height={128} width={128} alt="preview" />
                                        <p className="text-xs font-medium truncate max-w-[90%]">{file.name}</p>
                                    </div>
                                ) : isDragActive ? (
                                    <p className="text-sm text-gray-500">Drop the image here...</p>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <MdOutlineFileDownload className="text-2xl" />
                                        <p className="text-sm text-gray-500">Drag and drop an image, or <span className="text-black font-medium underline">browse</span></p>
                                        <p className="text-xs text-gray-400">JPG, PNG or GIF</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="bg-white border p-5">
                            <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3">Category</p>
                            <select value={category} onChange={(e) => { setCategory(e.target.value); }} className="h-10 w-full text-sm px-2 border">
                                {options.map((e, i) => {
                                    return (
                                        <option key={i}>{e}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button disabled={loaderStatus} type="submit" className="h-11 w-full bg-black text-white text-lg tracking-tight hover:bg-black/95 transition duration-150 flex justify-center items-center">
                            {loaderStatus ? <Loader /> : <span>Add Product</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct