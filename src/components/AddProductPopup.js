import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

const AddProductPopup = ({ isOpen, onClose, data, onSave }) => {

  const [formData, setFormData] = useState(data);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage=(e)=>{
    const file=e.target.files[0];
    setImage(file.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="w-full max-w-2xl max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData?.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                name="category"
                value={formData?.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="airpodes">Airpodes</option>
                <option value="camera">Camera</option>
                <option value="earphones">Earphones</option>
                <option value="mobiles">Mobiles</option>
                <option value="mouse">Mouse</option>
                <option value="printers">Printers</option>
                <option value="processor">Processor</option>
                <option value="refrigerator">Refrigerator</option>
                <option value="speakers">Speakers</option>
                <option value="trimmers">Trimmers</option>
                <option value="televisions">Televisions</option>
                <option value="watches">Watches</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={formData?.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="images" className="block text-gray-700">Images</label>
              <label htmlFor="productImages">
                <div className="flex items-center justify-center w-full h-32 p-2 border rounded cursor-pointer bg-slate-100">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                        <span className="text-4xl">
                            <IoMdCloudUpload />
                        </span>
                        <p className="text-sm">Upload Image</p>
                        <input type="file" onChange={handleImage} className="hidden" id="productImages" />
                    </div>
                </div>
              </label>
              <div>
                <img src='' width={80} height={80} className="border bg-slate-100" alt="product" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData?.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 mr-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductPopup;
