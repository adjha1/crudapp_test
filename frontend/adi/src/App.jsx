// frontend/src/App.js
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [editItem, setEditItem] = useState(null);

  // Fetch all items
  useEffect(() => {
    axios.get("https://crud-test-0fb8.onrender.com")
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Create a new item
  const handleCreate = () => {
    axios.post("https://crud-test-0fb8.onrender.com", newItem)
      .then((response) => setItems([...items, response.data]))
      .catch((error) => console.log(error));
     
  };

  // Update an item
  const handleUpdate = () => {
    axios.put(`https://crud-test-0fb8.onrender.com/${editItem._id}`, editItem)
      .then((response) => {
        const updatedItems = items.map(item =>
          item._id === editItem._id ? response.data : item
        );
        setItems(updatedItems);
        setEditItem(null);
      })
      .catch((error) => console.log(error));
  };

  // Delete an item
  const handleDelete = (id) => {
    axios.delete(`https://crud-test-0fb8.onrender.com/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch((error) => console.log(error));
  };

  return (
    <div style={{border:'5px solid red',padding:'10px', backgroundColor:'pink'}}>
      <h1 style={{color:'white', backgroundColor:'black',width:'100%',textAlign:"center"}}>CRUD APP</h1>

      <div style={{border:'2px solid red',padding:'10px'}}>
        <h2>Create Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <br/>

      <div style={{border:'2px solid red',padding:'10px'}}>
        <h2>Items List</h2>
        <ul >
          {items.map((item) => (
            <li key={item._id}>
              <p>{item.name} - {item.description}</p>
              <button onClick={() => setEditItem(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
            
          ))}
        
        </ul>
      </div>
      <br/>

      {editItem && (
        <div style={{border:'2px solid red',padding:'10px'}}>
          <h2>Edit Item</h2>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <input
            type="text"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
