import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { photosAPI, STORAGE_LIMIT, formatBytes } from '../lib/api';
import { X, Upload, Image, AlertCircle, CheckCircle } from 'lucide-react';
import './Modal.css';

export default function UploadModal({ onClose, onUploadComplete, currentStorageUsed }) {
    const { user } = useAuth();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = Array.from(e.dataTransfer.files).filter(file =>
            file.type.startsWith('image/')
        );

        if (files.length > 0) {
            setSelectedFiles(files);
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setError('');
        setUploading(true);

        try {
            // Calculate total size
            const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

            // Check storage limit
            if (currentStorageUsed + totalSize > STORAGE_LIMIT) {
                throw new Error(
                    `Upload would exceed storage limit. Available: ${formatBytes(STORAGE_LIMIT - currentStorageUsed)}`
                );
            }

            // Upload each file
            for (const file of selectedFiles) {
                await photosAPI.uploadPhoto(file);
            }

            // Update storage usage (handled by backend, but we update local state via onUploadComplete)
            // The parent component refetches storage usage.

            setSuccess(true);
            setTimeout(() => {
                onUploadComplete();
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to upload photos');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Upload Photos</h2>
                    <button onClick={onClose} className="modal-close">
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="error-banner animate-slideIn">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="success-banner animate-slideIn">
                        <CheckCircle size={20} />
                        <span>Photos uploaded successfully!</span>
                    </div>
                )}

                <div className="modal-body">
                    <div
                        className={`upload-dropzone ${dragActive ? 'active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                        />

                        {selectedFiles.length === 0 ? (
                            <>
                                <Upload size={48} strokeWidth={1.5} />
                                <h3>Drag & drop photos here</h3>
                                <p>or click to browse files</p>
                                <span className="upload-hint">Supports: JPG, PNG, GIF, WebP</span>
                            </>
                        ) : (
                            <>
                                <Image size={48} strokeWidth={1.5} />
                                <h3>{selectedFiles.length} file(s) selected</h3>
                                <p>Total size: {formatBytes(selectedFiles.reduce((acc, f) => acc + f.size, 0))}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFiles([]);
                                    }}
                                    className="btn btn-ghost btn-sm"
                                >
                                    Clear selection
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={onClose}
                        className="btn btn-secondary"
                        disabled={uploading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        className="btn btn-primary"
                        disabled={selectedFiles.length === 0 || uploading || success}
                    >
                        {uploading ? (
                            <>
                                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload size={20} />
                                Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
