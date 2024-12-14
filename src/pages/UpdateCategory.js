import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCategory = () => {
  const { id } = useParams();  // Get category ID from URL
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the category details by ID
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://192.168.1.2/apiiny/get_category_by_id.php?id=${id}`);
        if (response.data.success) {
          setCategoryName(response.data.category.name);
        } else {
          setError('Category not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching category details.');
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form submission for updating the category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.2/apiiny/update_category.php', {
        id,
        category_name: categoryName
      });
      
      if (response.data.success) {
        alert('Category updated successfully!');
        navigate('/category');  // Redirect to category list page
      } else {
        setError('Failed to update category.');
      }
    } catch (err) {
      setError('An error occurred while updating the category.');
    }
  };

  return (
    <div className="container" style={styles.container}>
      <div className="center" style={styles.center}>
        <div className="header" style={styles.header}>
          <h1>Update Category</h1>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleUpdateCategory} style={styles.form}>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            style={styles.inputText}
          />
          <button type="submit" style={styles.submitButton}>Update</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  center: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    width: '50%',
  },
  header: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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

export default UpdateCategory;
