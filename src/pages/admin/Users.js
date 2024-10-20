import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import backendApis from "../../common/BackendRoutesPath";
import EditUserPopup from "../../components/EditUserPopup";
import { toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // Store the user being edited
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    

    // Fetch users from backend
    const getData = async () => {
        try {
            const response = await fetch(backendApis.users.url, {
                method: backendApis.users.method,
                credentials: "include",
            });

            const data = await response.json();
            if (data.status === true) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // handle user edit request
    const handleEdit = async (user) => {
       setEditingUser(user)
       setIsModalOpen(true)
    }
    const handleSave = async (updatedUser) => {
        try {
          // Making API call to update the user
          const response = await fetch(backendApis.updateUser.url, {
            method: backendApis.updateUser.method,
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          });
      
          // Check if the response is ok (status code 200-299)
          if (!response.ok) {
            throw new Error('Server error, please try again later');
          }
      
          const data = await response.json();
      
          if (data.status === true) {
            const updatedUsers = users.map((user) =>
              user._id === updatedUser._id ? updatedUser : user
            );
            setUsers(updatedUsers);
            setIsModalOpen(false); // Close the modal
            toast.success(data.message);
          } else {
            toast.error('Error updating user: ' + (data.message || 'Unknown error'));
          }
        } catch (error) {
          // Handle network or server errors here
          toast.error('Error updating user: ' + error.message);
        }
      };
      const handleDelete = async (id) => {
        try {
          // Making API call to update the user
          const response = await fetch(backendApis.deleteUser.url, {
            method: backendApis.deleteUser.method,
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({id:id}),
          });
      
          // Check if the response is ok (status code 200-299)
          if (!response.ok) {
            throw new Error('Server error, please try again later');
          }
      
          const data = await response.json();
      
          if (data.status === true) {
            setUsers(users.filter((user) => user._id !== id));
            setIsModalOpen(false); // Close the modal
            toast.success(data.message);
          } else {
            toast.error('Error updating user: ' + (data.message || 'Unknown error'));
          }
        } catch (error) {
          // Handle network or server errors here
          toast.error('Error updating user: ' + error.message);
        }
      };
      

    useEffect(() => {
        getData();
    }, []); // Adding [] ensures this effect runs only once (on mount)

    return (
        <Layout>
            <h1 className="w-full mb-4 text-2xl font-bold text-center">Users List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-collapse border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Sr.</th>
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Name</th>
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Email</th>
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Role</th>
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Created Date</th>
                            <th className="px-6 py-3 text-sm leading-4 text-left text-gray-600 uppercase border-b border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b border-gray-200">{index + 1}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{user.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{user.role}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        <button
                                        onClick={() => handleEdit(user)}
                                        className="px-3 py-1 mr-2 text-white bg-blue-500 rounded"
                                        >
                                        <FaUserEdit />
                                        </button>
                                        {
                                        user.role !== 'admin' ? (
                                        <button
                                        onClick={() => handleDelete(user._id)}
                                        className="px-3 py-1 mr-2 text-white bg-red-500 rounded"
                                        >
                                        <MdDelete />
                                        </button>
                                        ) :''
                                         }
                                       
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center border-b border-gray-200">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* edit user model */}
            
            <EditUserPopup
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             user={editingUser}
             onSave={handleSave}
            >

            </EditUserPopup>
        </Layout>
    );
};

export default Users;
