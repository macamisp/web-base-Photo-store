import { X, Edit, Share2, Trash2, Download } from 'lucide-react';
import './Modal.css';

export default function PhotoModal({ photo, onClose, onEdit, onShare, onDelete }) {
    const handleDownload = async () => {
        try {
            const response = await fetch(photo.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = photo.title || 'photo';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="photo-modal-content animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="photo-modal-close">
                    <X size={24} />
                </button>

                <div className="photo-modal-image">
                    <img src={photo.url} alt={photo.title || 'Photo'} />
                </div>

                <div className="photo-modal-actions">
                    <div className="photo-modal-info">
                        <h3>{photo.title || 'Untitled'}</h3>
                        <p>{new Date(photo.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    </div>

                    <div className="photo-modal-buttons">
                        <button
                            onClick={handleDownload}
                            className="btn btn-secondary btn-sm"
                            title="Download"
                        >
                            <Download size={18} />
                        </button>
                        <button
                            onClick={() => onEdit(photo)}
                            className="btn btn-secondary btn-sm"
                            title="Edit"
                        >
                            <Edit size={18} />
                        </button>
                        <button
                            onClick={() => onShare(photo)}
                            className="btn btn-secondary btn-sm"
                            title="Share"
                        >
                            <Share2 size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(photo)}
                            className="btn btn-danger btn-sm"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
