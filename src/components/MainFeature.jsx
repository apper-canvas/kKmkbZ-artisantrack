import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Tag, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  XCircle,
  Image as ImageIcon,
  Upload,
  Plus,
  Users
} from 'lucide-react';

// Sample artwork data
const initialArtworks = [
  {
    id: 1,
    title: "Sunset Horizon",
    artist: "Elena Cortez",
    medium: "Oil on Canvas",
    dimensions: { width: 36, height: 24, depth: 1.5 },
    price: 1200,
    status: "available",
    dateCreated: "2023-05-15",
    dateAcquired: "2023-06-20",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
    location: "Main Gallery",
    description: "A vibrant sunset landscape with warm orange and purple tones reflecting on the water.",
    tags: ["landscape", "sunset", "contemporary"]
  },
  {
    id: 2,
    title: "Urban Rhythm",
    artist: "Marcus Chen",
    medium: "Acrylic on Canvas",
    dimensions: { width: 48, height: 36, depth: 1 },
    price: 1850,
    status: "on_display",
    dateCreated: "2023-03-10",
    dateAcquired: "2023-04-05",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
    location: "Front Window",
    description: "Abstract cityscape capturing the energy and movement of urban life.",
    tags: ["abstract", "cityscape", "modern"]
  },
  {
    id: 3,
    title: "Serene Forest",
    artist: "Amelia Johnson",
    medium: "Watercolor",
    dimensions: { width: 18, height: 24, depth: 0 },
    price: 750,
    status: "sold",
    dateCreated: "2023-01-22",
    dateAcquired: "2023-02-15",
    image: "https://images.unsplash.com/photo-1518717202715-9fa9d099f58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
    location: "Storage",
    description: "Delicate watercolor painting of a misty forest scene with soft greens and blues.",
    tags: ["landscape", "forest", "watercolor"]
  },
  {
    id: 4,
    title: "Geometric Harmony",
    artist: "David Park",
    medium: "Mixed Media",
    dimensions: { width: 30, height: 30, depth: 2 },
    price: 1400,
    status: "on_consignment",
    dateCreated: "2023-04-18",
    dateAcquired: "2023-05-10",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350",
    location: "East Wall",
    description: "Bold geometric patterns in vibrant colors creating a sense of balance and harmony.",
    tags: ["geometric", "abstract", "contemporary"]
  }
];

const statusOptions = [
  { value: "available", label: "Available", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  { value: "sold", label: "Sold", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  { value: "on_display", label: "On Display", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
  { value: "on_consignment", label: "On Consignment", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" }
];

const MainFeature = ({ activeTab }) => {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isAddingArtwork, setIsAddingArtwork] = useState(false);
  const [isEditingArtwork, setIsEditingArtwork] = useState(false);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    artist: "",
    medium: "",
    dimensions: { width: 0, height: 0, depth: 0 },
    price: 0,
    status: "available",
    dateCreated: "",
    dateAcquired: "",
    image: "",
    location: "",
    description: "",
    tags: []
  });
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [tagInput, setTagInput] = useState("");

  // Handle form input changes for new artwork
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewArtwork({
        ...newArtwork,
        [parent]: {
          ...newArtwork[parent],
          [child]: value
        }
      });
    } else {
      setNewArtwork({
        ...newArtwork,
        [name]: value
      });
    }
  };

  // Handle form input changes for editing artwork
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditingArtwork({
        ...editingArtwork,
        [parent]: {
          ...editingArtwork[parent],
          [child]: value
        }
      });
    } else {
      setEditingArtwork({
        ...editingArtwork,
        [name]: value
      });
    }
  };

  // Handle tag input for new artwork
  const handleAddTag = () => {
    if (tagInput.trim() && !newArtwork.tags.includes(tagInput.trim())) {
      setNewArtwork({
        ...newArtwork,
        tags: [...newArtwork.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  // Handle tag input for editing artwork
  const handleAddEditTag = () => {
    if (tagInput.trim() && !editingArtwork.tags.includes(tagInput.trim())) {
      setEditingArtwork({
        ...editingArtwork,
        tags: [...editingArtwork.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewArtwork({
      ...newArtwork,
      tags: newArtwork.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleRemoveEditTag = (tagToRemove) => {
    setEditingArtwork({
      ...editingArtwork,
      tags: editingArtwork.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle form submission for new artwork
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const artworkToAdd = {
      ...newArtwork,
      id: artworks.length + 1,
      // If no image is provided, use a placeholder
      image: newArtwork.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=350"
    };
    
    setArtworks([...artworks, artworkToAdd]);
    setIsAddingArtwork(false);
    
    // Reset form
    setNewArtwork({
      title: "",
      artist: "",
      medium: "",
      dimensions: { width: 0, height: 0, depth: 0 },
      price: 0,
      status: "available",
      dateCreated: "",
      dateAcquired: "",
      image: "",
      location: "",
      description: "",
      tags: []
    });
  };

  // Set up artwork for editing
  const handleEditArtwork = (artwork) => {
    setEditingArtwork({ ...artwork });
    setIsEditingArtwork(true);
    setSelectedArtwork(null);
  };

  // Handle form submission for updating artwork
  const handleUpdateArtwork = (e) => {
    e.preventDefault();
    
    const updatedArtworks = artworks.map(artwork => 
      artwork.id === editingArtwork.id ? { ...editingArtwork } : artwork
    );
    
    setArtworks(updatedArtworks);
    setIsEditingArtwork(false);
    setEditingArtwork(null);
  };

  // Handle artwork deletion
  const handleDeleteArtwork = (id) => {
    setArtworks(artworks.filter(artwork => artwork.id !== id));
    if (selectedArtwork && selectedArtwork.id === id) {
      setSelectedArtwork(null);
    }
  };

  // Get status label and color
  const getStatusInfo = (statusValue) => {
    return statusOptions.find(option => option.value === statusValue) || statusOptions[0];
  };

  if (activeTab !== 'inventory') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {activeTab === 'artists' ? (
              <Users className="h-8 w-8 text-primary" />
            ) : activeTab === 'sales' ? (
              <DollarSign className="h-8 w-8 text-primary" />
            ) : (
              <Tag className="h-8 w-8 text-primary" />
            )}
          </motion.div>
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </h2>
        <p className="text-surface-500 dark:text-surface-400 max-w-md">
          This section is under development. Please check the Inventory tab to see the main functionality.
        </p>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {isAddingArtwork ? (
          <motion.div
            key="add-artwork-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Artwork</h2>
              <button 
                onClick={() => setIsAddingArtwork(false)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XCircle className="h-5 w-5 text-surface-500" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div>
                    <label htmlFor="title" className="label">Artwork Title*</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newArtwork.title}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="artist" className="label">Artist Name*</label>
                    <input
                      type="text"
                      id="artist"
                      name="artist"
                      value={newArtwork.artist}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="medium" className="label">Medium</label>
                    <input
                      type="text"
                      id="medium"
                      name="medium"
                      value={newArtwork.medium}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="dimensions.width" className="label">Width (in)</label>
                      <input
                        type="number"
                        id="dimensions.width"
                        name="dimensions.width"
                        value={newArtwork.dimensions.width}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions.height" className="label">Height (in)</label>
                      <input
                        type="number"
                        id="dimensions.height"
                        name="dimensions.height"
                        value={newArtwork.dimensions.height}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions.depth" className="label">Depth (in)</label>
                      <input
                        type="number"
                        id="dimensions.depth"
                        name="dimensions.depth"
                        value={newArtwork.dimensions.depth}
                        onChange={handleInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="label">Price ($)*</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newArtwork.price}
                      onChange={handleInputChange}
                      className="input"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="status" className="label">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={newArtwork.status}
                      onChange={handleInputChange}
                      className="input"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="dateCreated" className="label">Date Created</label>
                      <input
                        type="date"
                        id="dateCreated"
                        name="dateCreated"
                        value={newArtwork.dateCreated}
                        onChange={handleInputChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateAcquired" className="label">Date Acquired</label>
                      <input
                        type="date"
                        id="dateAcquired"
                        name="dateAcquired"
                        value={newArtwork.dateAcquired}
                        onChange={handleInputChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="label">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={newArtwork.location}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image" className="label">Image URL</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={newArtwork.image}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newArtwork.description}
                      onChange={handleInputChange}
                      className="input min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-6">
                <label className="label">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newArtwork.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-200 dark:bg-surface-700"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1.5 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="input rounded-r-none"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 border-l-0 rounded-r-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingArtwork(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Artwork
                </button>
              </div>
            </form>
          </motion.div>
        ) : isEditingArtwork ? (
          <motion.div
            key="edit-artwork-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Artwork</h2>
              <button 
                onClick={() => setIsEditingArtwork(false)}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XCircle className="h-5 w-5 text-surface-500" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateArtwork}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div>
                    <label htmlFor="edit-title" className="label">Artwork Title*</label>
                    <input
                      type="text"
                      id="edit-title"
                      name="title"
                      value={editingArtwork?.title || ""}
                      onChange={handleEditInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-artist" className="label">Artist Name*</label>
                    <input
                      type="text"
                      id="edit-artist"
                      name="artist"
                      value={editingArtwork?.artist || ""}
                      onChange={handleEditInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-medium" className="label">Medium</label>
                    <input
                      type="text"
                      id="edit-medium"
                      name="medium"
                      value={editingArtwork?.medium || ""}
                      onChange={handleEditInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="edit-dimensions.width" className="label">Width (in)</label>
                      <input
                        type="number"
                        id="edit-dimensions.width"
                        name="dimensions.width"
                        value={editingArtwork?.dimensions?.width || 0}
                        onChange={handleEditInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-dimensions.height" className="label">Height (in)</label>
                      <input
                        type="number"
                        id="edit-dimensions.height"
                        name="dimensions.height"
                        value={editingArtwork?.dimensions?.height || 0}
                        onChange={handleEditInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-dimensions.depth" className="label">Depth (in)</label>
                      <input
                        type="number"
                        id="edit-dimensions.depth"
                        name="dimensions.depth"
                        value={editingArtwork?.dimensions?.depth || 0}
                        onChange={handleEditInputChange}
                        className="input"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="edit-price" className="label">Price ($)*</label>
                    <input
                      type="number"
                      id="edit-price"
                      name="price"
                      value={editingArtwork?.price || 0}
                      onChange={handleEditInputChange}
                      className="input"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-status" className="label">Status</label>
                    <select
                      id="edit-status"
                      name="status"
                      value={editingArtwork?.status || "available"}
                      onChange={handleEditInputChange}
                      className="input"
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="edit-dateCreated" className="label">Date Created</label>
                      <input
                        type="date"
                        id="edit-dateCreated"
                        name="dateCreated"
                        value={editingArtwork?.dateCreated || ""}
                        onChange={handleEditInputChange}
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-dateAcquired" className="label">Date Acquired</label>
                      <input
                        type="date"
                        id="edit-dateAcquired"
                        name="dateAcquired"
                        value={editingArtwork?.dateAcquired || ""}
                        onChange={handleEditInputChange}
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="edit-location" className="label">Location</label>
                    <input
                      type="text"
                      id="edit-location"
                      name="location"
                      value={editingArtwork?.location || ""}
                      onChange={handleEditInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-image" className="label">Image URL</label>
                    <input
                      type="text"
                      id="edit-image"
                      name="image"
                      value={editingArtwork?.image || ""}
                      onChange={handleEditInputChange}
                      className="input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-description" className="label">Description</label>
                    <textarea
                      id="edit-description"
                      name="description"
                      value={editingArtwork?.description || ""}
                      onChange={handleEditInputChange}
                      className="input min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-6">
                <label className="label">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editingArtwork?.tags?.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-200 dark:bg-surface-700"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveEditTag(tag)}
                        className="ml-1.5 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddEditTag())}
                    className="input rounded-r-none"
                    placeholder="Add a tag"
                  />
                  <button
                    type="button"
                    onClick={handleAddEditTag}
                    className="px-4 bg-surface-200 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 border-l-0 rounded-r-lg hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingArtwork(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update Artwork
                </button>
              </div>
            </form>
          </motion.div>
        ) : selectedArtwork ? (
          <motion.div
            key="artwork-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card"
          >
            <div className="md:flex">
              <div className="md:w-2/5 h-[300px] md:h-auto relative overflow-hidden">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`badge ${getStatusInfo(selectedArtwork.status).color}`}>
                    {getStatusInfo(selectedArtwork.status).label}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:w-3/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedArtwork.title}</h2>
                    <p className="text-surface-600 dark:text-surface-400">by {selectedArtwork.artist}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedArtwork(null)}
                    className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <XCircle className="h-5 w-5 text-surface-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Medium</p>
                    <p>{selectedArtwork.medium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Dimensions</p>
                    <p>{selectedArtwork.dimensions.width}" × {selectedArtwork.dimensions.height}" × {selectedArtwork.dimensions.depth}"</p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Price</p>
                    <p className="font-semibold">${selectedArtwork.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Location</p>
                    <p>{selectedArtwork.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Date Created</p>
                    <p>{selectedArtwork.dateCreated ? new Date(selectedArtwork.dateCreated).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">Date Acquired</p>
                    <p>{selectedArtwork.dateAcquired ? new Date(selectedArtwork.dateAcquired).toLocaleDateString() : 'Unknown'}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">Description</p>
                  <p className="text-surface-700 dark:text-surface-300">{selectedArtwork.description}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-surface-500 dark:text-surface-400 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedArtwork.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-200 dark:bg-surface-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => handleEditArtwork(selectedArtwork)}
                    className="btn btn-outline flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteArtwork(selectedArtwork.id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="artwork-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Add New Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="card flex flex-col items-center justify-center p-6 h-[320px] cursor-pointer border-2 border-dashed border-surface-300 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
                onClick={() => setIsAddingArtwork(true)}
              >
                <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Add New Artwork</h3>
                <p className="text-center text-surface-500 dark:text-surface-400 text-sm">
                  Upload details and images for a new piece in your collection
                </p>
              </motion.div>
              
              {/* Artwork Cards */}
              {artworks.map(artwork => (
                <motion.div
                  key={artwork.id}
                  whileHover={{ y: -5 }}
                  className="card overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedArtwork(artwork)}
                >
                  <div className="relative h-48">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`badge ${getStatusInfo(artwork.status).color}`}>
                        {getStatusInfo(artwork.status).label}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditArtwork(artwork);
                          }}
                          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteArtwork(artwork.id);
                          }}
                          className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{artwork.title}</h3>
                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-2">{artwork.artist}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-surface-500 dark:text-surface-400 text-sm">
                        <Tag className="h-3.5 w-3.5" />
                        <span>{artwork.medium}</span>
                      </div>
                      <p className="font-semibold">${artwork.price.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;