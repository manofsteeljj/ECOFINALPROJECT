import React, { useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '20px',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  inputText: {
    marginBottom: '10px',
    padding: '10px',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '20px',
  },
};

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        product: '',
        category: '', // This should be a category name (not ID)
        product_stock: '',
        buying_price: '',
        selling_price: '',
      });
      
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.2/apiiny/add_product.php', newProduct);
      if (response.data.success) {
        setSuccess('Product added successfully!');
        setNewProduct({ product: '', category: '', product_stock: '', buying_price: '', selling_price: '' });
        setError('');
      } else {
        setError('Failed to add product.');
        setSuccess('');
      }
    } catch (err) {
      console.error('Add Product Error:', err);
      setError('An error occurred while adding the product.');
      setSuccess('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Admin Panel</h2>
        <ul>
          <li>Home</li>
          <li>Products</li>
          <li>Add Product</li>
        </ul>
      </div>
      <div style={styles.mainContent}>
        <div style={styles.header}>Add New Product</div>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '20px' }}>{success}</div>}
        <form onSubmit={handleAddProduct} style={styles.form}>
          <input
            type="text"
            name="product"
            value={newProduct.product}
            onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
            placeholder="Product Name"
            style={styles.inputText}
          />
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            placeholder="Category"
            style={styles.inputText}
          />
          <input
            type="number"
            name="product_stock"
            value={newProduct.product_stock}
            onChange={(e) => setNewProduct({ ...newProduct, product_stock: e.target.value })}
            placeholder="Stock"
            style={styles.inputText}
          />
          <input
            type="number"
            name="buying_price"
            value={newProduct.buying_price}
            onChange={(e) => setNewProduct({ ...newProduct, buying_price: e.target.value })}
            placeholder="Buying Price"
            style={styles.inputText}
          />
          <input
            type="number"
            name="selling_price"
            value={newProduct.selling_price}
            onChange={(e) => setNewProduct({ ...newProduct, selling_price: e.target.value })}
            placeholder="Selling Price"
            style={styles.inputText}
          />
          <input type="submit" value="Add Product" style={styles.submitButton} />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
