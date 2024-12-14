import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState({
    product_name: '',
    category: '',
    product_stock: '',
    buying_price: '',
    selling_price: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the product details by ID and categories
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://192.168.1.2/apiiny/get_product_by_id.php?id=${id}`);
        if (response.data.success) {
          setProduct({
            product_name: response.data.product.product_name || '',
            category: response.data.product.category_id || '',
            product_stock: response.data.product.product_stock || '',
            buying_price: response.data.product.buying_price || '',
            selling_price: response.data.product.selling_price || '',
          });
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Error fetching product data.');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.1.2/apiiny/get_categories.php');
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          setError('No categories found.');
        }
      } catch (err) {
        setError('Error fetching categories.');
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  // Handle form submission for updating the product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://192.168.1.2/apiiny/update_product.php', {
        product_id: id,
        product_name: product.product_name,
        category_id: product.category,
        product_stock: product.product_stock,
        buying_price: product.buying_price,
        selling_price: product.selling_price,
      });

      if (response.data.success) {
        alert('Product updated successfully!');
        navigate('/products');
      } else {
        setError('Failed to update product.');
      }
    } catch (err) {
      setError('Error updating product.');
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={styles.container}>
      <aside className="side" style={styles.side}>
        <h1 className="sideHeader" style={styles.sideHeader}>Inventory System</h1>
        <ul className="sideList" style={styles.sideList}>
          <li className="sideListItem" style={styles.sideListItem}><a href="/dashboard">DASHBOARD</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/usermanage">USER MANAGEMENT</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/category">CATEGORY</a></li>
          <li className="sideListItem" style={styles.sideListItem}><a href="/products">PRODUCTS</a></li>
        </ul>
        <a className="logout" href="/login" onClick={() => window.confirm('Are you sure?')} style={styles.logout}>LogOut</a>
      </aside>

      <div className="center" style={styles.center}>
        <div className="main" style={styles.main}>
          <div className="header" style={styles.header}><h1>UPDATE PRODUCT</h1></div>
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleUpdateProduct} className="update-product-form" style={styles.updateProductForm}>
            <div style={styles.formGroup}>
              <label htmlFor="product_name" style={styles.label}>Product Name:</label>
              <input
                type="text"
                id="product_name"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="category" style={styles.label}>Category:</label>
              <select
                id="category"
                name="category"
                value={product.category || ''}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="product_stock" style={styles.label}>Stock:</label>
              <input
                type="number"
                id="product_stock"
                name="product_stock"
                value={product.product_stock}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="buying_price" style={styles.label}>Buying Price:</label>
              <input
                type="number"
                id="buying_price"
                name="buying_price"
                value={product.buying_price}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="selling_price" style={styles.label}>Selling Price:</label>
              <input
                type="number"
                id="selling_price"
                name="selling_price"
                value={product.selling_price}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <button type="submit" style={styles.submitButton}>Update Product</button>
          </form>
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
      backgroundColor: '#f4f4f9',
    },
    side: {
      position: 'relative',
      height: '100vh',
      flexDirection: 'column',
      width: '17vw',
      padding: '2rem',
      backgroundColor: '#292929',
    },
    sideHeader: {
      fontSize: '1.5em',
      marginBottom: '20px',
      color: '#ffffff',
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
      color: '#ffffff',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    center: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '20px',
      width: '80%',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
    main: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9f9f9',
      height: '855px',
      width: '100%',
      padding: '20px',
      borderRadius: '10px',
    },
    header: {
      marginBottom: '20px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '1em',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginTop: '5px',
    },
    submitButton: {
      backgroundColor: '#59a895',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
    },
  };
  

export default UpdateProduct;
