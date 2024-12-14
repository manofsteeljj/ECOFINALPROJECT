import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]); // State for storing products
  const [error, setError] = useState(null); // State for error handling
  const [editProductId, setEditProductId] = useState(null); // For tracking which product is being edited
  const [editProductDetails, setEditProductDetails] = useState({}); // For editing product details

  const navigate = useNavigate(); // Initialize navigate function

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.2/apiiny/get_products.php');
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError('No products found.');
        }
      } catch (err) {
        setError('An error occurred while fetching products.');
      }
    };
    fetchProducts();
  }, []);

  // Handle product removal
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.get(`/api/delete_product?id=${productId}`);
      if (response.data.success) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== productId));
      } else {
        setError('Failed to delete product.');
      }
    } catch (err) {
      setError('An error occurred while deleting the product.');
    }
  };

  // Handle edit product (set values for the form)
  const handleEditProduct = (productId, currentDetails) => {
    setEditProductId(productId);
    setEditProductDetails(currentDetails); // Set current product details for editing
  };

  // Handle update product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.2/apiiny/update_product.php', {
        id: editProductId,
        ...editProductDetails,
      });
      if (response.data.success) {
        const updatedProducts = products.map((product) =>
          product.product_id === editProductId ? { ...product, ...editProductDetails } : product
        );
        setProducts(updatedProducts);
        setEditProductId(null); // Clear the edit mode
        setEditProductDetails({}); // Reset the product details
      } else {
        setError('Failed to update product.');
      }
    } catch (err) {
      setError('An error occurred while updating the product.');
    }
  };

  return (
    <div className="container" style={styles.container}>
      {/* Sidebar */}
      <aside className="side" style={styles.side}>
        <h1 className="sideHeader" style={styles.sideHeader}>Inventory System</h1>
        <ul className="sideList" style={styles.sideList}>
          <li className="sideListItem" style={styles.sideListItem}><a href="/dashboard">DASHBOARD</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/usermanage">USER MANAGEMENT</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/category">CATEGORY</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/product">PRODUCTS</a></li>
        </ul>
        <a className="logout" href="/login" onClick={() => window.confirm('Are you sure?')} style={styles.logout}>LogOut</a>
      </aside>

      {/* Main content */}
      <div className="center" style={styles.center}>
        <div className="top" style={styles.top}></div>
        <div className="main" style={styles.main}>
          {/* Header */}
          <div className="header" style={styles.header}><h1>PRODUCT</h1></div>

          {/* Add New Product Button */}
          <div className="add-but" style={styles.addButton}>
            <button
              onClick={() => navigate('/add_product')} // Navigate to AddProduct
              style={styles.addButtonLink}
            >
              ADD NEW PRODUCT
            </button>
          </div>

          {/* Error message */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Edit Product Form (display only if editing) */}
          {editProductId !== null && (
            <div>
              <h2>Edit Product</h2>
              <form onSubmit={handleUpdateProduct} style={styles.addCategoryForm}>
                <input
                  type="text"
                  value={editProductDetails.product}
                  onChange={(e) => setEditProductDetails({ ...editProductDetails, product: e.target.value })}
                  style={styles.inputText}
                  placeholder="Product Name"
                />
                <input
                  type="text"
                  value={editProductDetails.category}
                  onChange={(e) => setEditProductDetails({ ...editProductDetails, category: e.target.value })}
                  style={styles.inputText}
                  placeholder="Category"
                />
                <input
                  type="number"
                  value={editProductDetails.product_stock}
                  onChange={(e) => setEditProductDetails({ ...editProductDetails, product_stock: e.target.value })}
                  style={styles.inputText}
                  placeholder="Stock"
                />
                <input
                  type="number"
                  value={editProductDetails.buying_price}
                  onChange={(e) => setEditProductDetails({ ...editProductDetails, buying_price: e.target.value })}
                  style={styles.inputText}
                  placeholder="Buying Price"
                />
                <input
                  type="number"
                  value={editProductDetails.selling_price}
                  onChange={(e) => setEditProductDetails({ ...editProductDetails, selling_price: e.target.value })}
                  style={styles.inputText}
                  placeholder="Selling Price"
                />
                <button type="submit" style={styles.submitButton}>Update</button>
              </form>
            </div>
          )}

          {/* Products Table */}
          <table className="table prod" style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>PRODUCT</th>
                <th>CATEGORIES</th>
                <th>STOCK</th>
                <th>BUYING PRICE</th>
                <th>SELLING PRICE</th>
                <th>ADDED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="8">No Product found</td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product.product_id}>
                    <td>{index + 1}</td>
                    <td>{product.product}</td>
                    <td>{product.category}</td>
                    <td>{product.product_stock}</td>
                    <td>{product.buying_price}</td>
                    <td>{product.selling_price}</td>
                    <td>{product.created}</td>
                    <td>
                      <button
                        style={styles.removeButton}
                        onClick={() => handleDeleteProduct(product.product_id)}
                      >
                        REMOVE
                      </button>
                      <button
                        style={styles.updateButton}
                        onClick={() => handleEditProduct(product.product_id, product)} // Trigger edit mode
                      >
                        UPDATE
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9', // Light background color
  },
  side: {
    position: 'relative',
    height: '100vh',
    flexDirection: 'column',
    width: '17vw',
    padding: '2rem',
    backgroundColor: '#292929', // Sidebar background
  },
  sideHeader: {
    fontSize: '1.5em',
    marginBottom: '20px',
    color: '#ffffff', // White text color in the sidebar
  },
  sideList: {
    margin: '6rem 1rem',
  },
  sideListItem: {
    listStyle: 'none',
    margin: '26px',
  },
  logout: {
    fontSize: '20px',
    position: 'absolute',
    bottom: '5rem',
    left: '6rem',
    color: '#ffffff', // White text
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff', // Light background for the center content
    padding: '20px',
    borderRadius: '20px',
    width: '80%',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Light shadow for depth
  },
  top: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: '#59A895', // Light accent color
    height: '300px',
  },
  main: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9', // Lighter main content background
    height: '855px',
    width: '100%',
    padding: '20px',
    borderRadius: '10px',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
  },
  addButton: {
    marginBottom: '20px',
  },
  addButtonLink: {
    textDecoration: 'none',
    backgroundColor: '#59a895',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    color: '#333',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
  },
  updateButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#59A895',
    cursor: 'pointer',
  },
  inputText: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  submitButton: {
    backgroundColor: '#59a895',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Product;
