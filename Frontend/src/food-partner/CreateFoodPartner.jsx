import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import '../css/create-food.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { reelsvideo } from '../context/Reelsvideo';

const CreateFood = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const{url} = useContext(reelsvideo)

  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      toast.promise(
        axios.post(`${url}/api/auth/food-partner/log-out`,{}, { withCredentials: true }),
        {
          loading: "Logging out...",
          success: "Logged out successfully",
          error: "Logout failed",
        }
      ).then(() => {
        navigate("/user/login");
      });
    } catch (err) {
      toast.error("Logout error");
    }
  };

  useEffect(() => {
    if (!videoFile) return;

    const previewURL = URL.createObjectURL(videoFile);
    return () => URL.revokeObjectURL(previewURL);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setFileError('Please select a valid video file.');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];

    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setFileError('Please drop a valid video file.');
      return;
    }

    setFileError('');
    setVideoFile(file);
  };

  const onDragOver = (e) => e.preventDefault();
  const openFileDialog = () => fileInputRef.current?.click();

  // Submit Handler
  const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('video', videoFile);

  try {
    await toast.promise(
      axios.post(`${url}/api/food`, formData, { withCredentials: true }),
      {
        loading: "Uploading...",
        success: "Uploaded Successfully",
        error: "Upload failed",
      }
    );

    // RESET ALL FIELDS AFTER SUCCESS
    setName('');
    setDescription('');
    setVideoFile(null);
    setFileError('');

    // also clear file input manually
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  } catch (error) {
    toast.error("Upload error");
  }
};


  const isDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

  return (
    <div className="create-food-page">

      {/* LOGOUT BUTTON */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="create-food-card">
        <header className="create-food-header">
          <h1 className="create-food-title">Create Food</h1>
          <p className="create-food-subtitle">Upload a short video, give it a name, and add a description.</p>
        </header>

        <form className="create-food-form" onSubmit={onSubmit}>
          <div className="field-group">
            <label htmlFor="foodVideo">Food Video</label>

            <input
              id="foodVideo"
              ref={fileInputRef}
              className="file-input-hidden"
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            <div
              className="file-dropzone"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openFileDialog()}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="file-dropzone-inner">
                <svg className="file-icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.8 3.2a1 1 0 0 1 .4-.08h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v1.6h1.6a1 1 0 0 1 1 1v7.2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6.4a1 1 0 0 1 1-1h1.6V3.2a1 1 0 0 1 1-1h1.6a1 1 0 0 1 .6.2z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="file-dropzone-text">
                  <strong>Tap to upload</strong> or drag and drop
                </div>
                <div className="file-hint">MP4, WebM, MOV • Up to ~100MB</div>
              </div>
            </div>

            {fileError && <p className="error-text">{fileError}</p>}

            {videoFile && (
              <div className="file-chip">
                <span className="file-chip-name">{videoFile.name}</span>
                <span className="file-chip-size">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>

                <div className="file-chip-actions">
                  <button type="button" className="btn-ghost" onClick={openFileDialog}>
                    Change
                  </button>
                  <button
                    type="button"
                    className="btn-ghost danger"
                    onClick={() => setVideoFile(null)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="foodName">Name</label>
            <input
              id="foodName"
              type="text"
              placeholder="e.g., Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="foodDesc">Description</label>
            <textarea
              id="foodDesc"
              rows={4}
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="btn-primary" type="submit" disabled={isDisabled}>
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
