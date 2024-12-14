import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);  // State to store categories
  const [newCategory, setNewCategory] = useState(''); // State to add new category
  const [error, setError] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);  // For tracking which category is being edited
  const [editCategoryName, setEditCategoryName] = useState('');  // For editing category name

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.1.2/apiiny/get_category.php');
        if (response.data.success) {
          setCategories(response.data.categories);
        } else {
          setError('No categories found.');
        }
      } catch (err) {
        setError('An error occurred while fetching categories.');
      }
    };
    fetchCategories();
  }, []);

  // Handle form submit for adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.2/apiiny/add_category.php', { category: newCategory });
      if (response.data.success) {
        setCategories((prevCategories) => [...prevCategories, { category: newCategory }]);
        setNewCategory(''); // Reset the input
      } else {
        setError('Failed to add category.');
      }
    } catch (err) {
      setError('An error occurred while adding the category.');
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    console.log("Deleting category ID:", categoryId); // Debugging line
  
    try {
      const response = await axios.post('http://192.168.1.2/apiiny/delete_category.php', { id: categoryId });
      console.log(response.data); // Log response for debugging
      if (response.data.success) {
        setCategories(categories.filter((category) => category.category_id !== categoryId));
      } else {
        setError('Failed to delete category.');
      }
    } catch (err) {
      console.error('Error:', err); // Log error for debugging
      setError('An error occurred while deleting the category.');
    }
  };
  

  // Handle edit category (set values for the form)
  const handleEditCategory = (categoryId, currentName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(currentName);  // Set the current name for editing
  };

  // Handle category name update
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (editCategoryName.trim() === '') {
      setError('Category name cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.2/apiiny/update_category.php', {
        id: editCategoryId,
        category: editCategoryName,
      });

      if (response.data.success) {
        // Update the category in the state after successful update
        const updatedCategories = categories.map((category) =>
          category.category_id === editCategoryId ? { ...category, category: editCategoryName } : category
        );
        setCategories(updatedCategories);
        setEditCategoryId(null); // Clear the edit mode
        setEditCategoryName(''); // Reset the category name field
      } else {
        setError('Failed to update category.');
      }
    } catch (err) {
      setError('An error occurred while updating the category.');
    }
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
    sideListItemLink: {
      color: '#ffffff',
      textDecoration: 'none',
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
    top: {
      flexGrow: 1,
      display: 'flex',
      backgroundColor: '#59A895',
      height: '300px',
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
    addCategoryForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '30px',
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
    submitButtonHover: {
      backgroundColor: '#4d8e7b',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      color: '#333',
      border: '1px solid #ddd', // Add border to the whole table
    },
    th: {
      border: '1px solid #ddd', // Border for table headers
      padding: '10px',
      backgroundColor: '#f4f4f4',
    },
    td: {
      border: '1px solid #ddd', // Border for table data cells
      padding: '10px',
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
  };

  return (
    <div className="container" style={styles.container}>
      {/* Sidebar */}
      <aside className="side" style={styles.side}>
        <h1 className="sideHeader" style={styles.sideHeader}>Inventory System</h1>
        <ul className="sideList" style={styles.sideList}>
          <li className="sideListItem" style={styles.sideListItem}>
            <a href="/dashboard" style={styles.sideListItemLink}>DASHBOARD</a>
          </li>
          <li className="sideListItem" style={styles.sideListItem}>
            <a href="/usermanage" style={styles.sideListItemLink}>USER MANAGEMENT</a>
          </li>
          <li className="sideListItem" style={styles.sideListItem}>
            <a href="/category" style={styles.sideListItemLink}>CATEGORY</a>
          </li>
          <li className="sideListItem" style={styles.sideListItem}>
            <a href="/product" style={styles.sideListItemLink}>PRODUCTS</a>
          </li>
        </ul>
        <a className="logout" href="/login" onClick={() => window.confirm('Are you sure?')} style={styles.logout}>
          LogOut
        </a>
      </aside>

      {/* Main content */}
      <div className="center" style={styles.center}>
        <div className="top" style={styles.top}></div>
        <div className="main" style={styles.main}>
          {/* Add Category Form */}
          <div className="header" style={styles.header}>
            <h1>ADD CATEGORY</h1>
          </div>
          <form onSubmit={handleAddCategory} className="add-category-form" style={styles.addCategoryForm}>
            <input
              type="text"
              name="category"
              value={newCategory || ''}  // Ensure it never becomes undefined or null
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category"
              style={styles.inputText}
            />
            <input type="submit" value="Submit" style={styles.submitButton} />
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Edit Category Form (display only if editing) */}
          {editCategoryId !== null && (
            <div>
              <h2>Edit Category</h2>
              <form onSubmit={handleUpdateCategory} style={styles.addCategoryForm}>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  style={styles.inputText}
                />
                <button type="submit" style={styles.submitButton}>Update</button>
              </form>
            </div>
          )}

          {/* Categories Table */}
          <div className="header" style={styles.header}>
            <h1>CATEGORIES</h1>
          </div>
          <table className="table user" style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>CATEGORY</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="3">No Category found</td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.category}</td>
                    <td>
                      <button
                        style={styles.removeButton}
                        onClick={() => handleDeleteCategory(category.category_id)}
                      >
                        REMOVE
                      </button>
                      <button
                        style={styles.updateButton}
                        onClick={() => handleEditCategory(category.category_id, category.category)} // Trigger edit mode
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

export default Category;
