import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [admins, setAdmins] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://192.168.1.2/apiiny/get_admins.php');
        console.log(response.data);  // Log the response to check its structure

        if (response.data.success) {
          setAdmins(response.data.admins); // Use response.data.admins here
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error('Error fetching admins:', err);
        setError('An error occurred while fetching data.');
      }
    };

    fetchAdmins();
  }, []);

  const deleteAdmin = async (admin_id) => {
    try {
      const response = await axios.get(`http://192.168.1.2/apiiny/delete_admin.php?admin_id=${admin_id}`);
      const data = response.data;
  
      if (data.success) {
        alert(data.message); // Show success message
        // Optionally, you can re-fetch the list of admins here
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("An error occurred while deleting the admin.");
    }
  };

  return (
    <>
      {/* Inline CSS Styles */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Elbasan&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Readex+Pro:wght@160..700&display=swap');

          * {
            font-family: "Poppins", serif;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            height: 100vh;
          }

          h1 {
            font-size: 48px;
            color: #f7f7f7;
          }

          a {
            text-decoration: none;
            color: #f7f7f7;
          }

          .container {
            height: 100vh;
            display: flex;
          }

          .side {
            position: relative;
            height: 100vh;
            flex-direction: column;
            width: 17vw;
            padding: 2rem;
            background-color: #292929;
          }

          .sideHeader {
            font-size: 1.5em;
            margin-bottom: 20px;
            color: #f7f7f7;
          }

          .sideList {
            margin: 6rem 1rem;
          }

          .sideListItem {
            list-style: none;
            margin: 26px;
          }

          .sideListItem a {
            color: #f7f7f7;
            font-size: 20px;
          }

          .logout {
            font-size: 20px;
            position: absolute;
            bottom: 5rem;
            left: 6rem;
            color: #f7f7f7;
            background-color: transparent;
            border: none;
            cursor: pointer;
          }

          .center {
            display: flex;
            height: 100vh;
            background-color: #f7f7f7;
            flex-grow: 1;
            position: relative;
          }

          .top {
            flex-grow: 1;
            display: flex;
            background-color: #59A895;
            height: 300px;
          }

          .main {
            max-width: 100%;
            display: flex;
            background-color: #292929;
            height: 855px;
            width: 1350px;
            position: absolute;
            border-radius: 20px;
            top: 1.5rem;
            left: 6rem;
            flex-direction: column;
            padding: 20px;
          }

          .table {
            font-size: 20px;
            position: relative;
            display: flex;
            flex-direction: column;
            margin-top: 5rem;
          }

          .table th, .table td {
            padding: 10px 20px;
            color: black;
            text-align: start;
          }

          .table th {
            border-bottom: #f7f7f7 solid 1px;
          }

          .table td {
            margin: 10px 40px;
            max-width: 260px;
          }

          .table a {
            color: red;
            cursor: pointer;
          }
        `}
      </style>

      {/* Sidebar and Main content */}
      <div className="container">
        {/* Sidebar */}
        <aside className="side">
          <h1 className="sideHeader">Inventory System</h1>
          <ul className="sideList">
            <li className="sideListItem"><a href="/dashboard">DASHBOARD</a></li>
            <li className="sideListItem"><a href="/usermanage">USER MANAGEMENT</a></li>
            <li className="sideListItem"><a href="/category">CATEGORY</a></li>
            <li className="sideListItem"><a href="/mvc/app/views/Home/product.php">PRODUCTS</a></li>
          </ul>
          <a className="logout" href="/" onClick={() => window.confirm('Are you sure?')}>
            LogOut
          </a>
        </aside>

        {/* Main content */}
        <div className="center">
          <div className="top"></div>
          <div className="main">
            <h1>User Management</h1>
            {error && <p>{error}</p>}
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>USERNAME</th>
                  <th>CREATED</th>
                  <th>STATUS</th>
                  <th>MANAGE</th>
                </tr>
              </thead>
              <tbody>
                {admins && admins.length > 0 ? (
                  admins.map((admin, index) => (
                    <tr key={admin.admin_id}>
                      <td>{index + 1}</td>
                      <td>{admin.username}</td>
                      <td>{admin.created_at}</td>
                      <td>{admin.status === 'online' ? 'Online' : 'Offline'}</td>
                      <td>
                        <a href="javascript:void(0)" onClick={() => deleteAdmin(admin.admin_id)} style={{ color: 'red' }}>
                          Remove
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No admins found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
