import React, { useState } from 'react';

function User() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dob, setDob] = useState('');
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddUser = () => {
    if (!name || !email || !role || !dob || !id) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const newUser = {
      name: name,
      email: email,
      role: role,
      dob: dob,
      id: id,
    };
    setUsers([...users, newUser]);
    setShowPopup(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-slate-50 p-6">
      <h1 className="text-3xl font-semibold mb-6">User Management</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowPopup(true)}
      >
        Add User
      </button>
      {showPopup && (
        <div className="popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="popup_inner bg-white rounded p-8 w-96">
            <h2 className="text-xl font-semibold mb-4">Add User</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label htmlFor="role" className="block mb-2">
              Role:
            </label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label htmlFor="dob" className="block mb-2">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <label htmlFor="id" className="block mb-2">
              ID:
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleAddUser}
              >
                Add
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="userList mt-8">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border py-2 px-4">Name</th>
              <th className="border py-2 px-4">Email</th>
              <th className="border py-2 px-4">Role</th>
              <th className="border py-2 px-4">Date of Birth</th>
              <th className="border py-2 px-4">ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={(index + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border py-2 px-4">{user.name}</td>
                <td className="border py-2 px-4">{user.email}</td>
                <td className="border py-2 px-4">{user.role}</td>
                <td className="border py-2 px-4">{user.dob}</td>
                <td className="border py-2 px-4">{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;