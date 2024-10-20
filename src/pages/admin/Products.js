import React, { useState } from "react";
import Layout from "../../components/Layout";
import AddProductPopup from "../../components/AddProductPopup";

const Products = () => {

    const [isOpen,setIsModalOpen]=useState(false);
    const [data,setData]=useState()

    const handleChange = (product)=>{
        setData(product)
        setIsModalOpen(true)
    }
    const handleSave = (fromData)=>{
        console.log('save products fields')
    }


  return (
    <Layout>
      <div className="flex items-center justify-between w-full mb-4">
        {/* Title on the left */}
        <h1 className="text-2xl font-bold">Products List</h1>

        {/* Add Product button on the right */}
        <button  onClick={() => setIsModalOpen(prev => !prev)} className="px-3 py-1 text-red-600 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white">
          Add Product
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-collapse border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Sr.
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Email
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Role
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Created Date
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left text-gray-600 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows will go here */}
            <tr>
              <td className="px-6 py-4 border-b border-gray-300">1</td>
              <td className="px-6 py-4 border-b border-gray-300">John Doe</td>
              <td className="px-6 py-4 border-b border-gray-300">john@example.com</td>
              <td className="px-6 py-4 border-b border-gray-300">Admin</td>
              <td className="px-6 py-4 border-b border-gray-300">2024-09-29</td>
              <td className="px-6 py-4 border-b border-gray-300">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="ml-2 text-red-500 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

          {/* add edit product */}

          <AddProductPopup
          isOpen={isOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          data={data}
          >

          </AddProductPopup>


    </Layout>
  );
};

export default Products;
