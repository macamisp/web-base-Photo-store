import { useState } from 'react';
import { X, Link as LinkIcon, Check, Mail, MessageCircle } from 'lucide-react';
import './Modal.css';

export default function ShareModal({ photo, onClose }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = photo.url;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleEmailShare = () => {
        const subject = encodeURIComponent(`Check out this photo: ${photo.title || 'Untitled'}`);
        const body = encodeURIComponent(`I wanted to share this photo with you:\n\n${shareUrl}`);
        window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    };

    const handleWhatsAppShare = () => {
        const text = encodeURIComponent(`Check out this photo: ${shareUrl}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Share Photo</h2>
                    <button onClick={onClose} className="modal-close">
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="share-preview">
                        <img src={photo.url} alt={photo.title || 'Photo'} />
                    </div>

                    <div className="share-link-container">
                        <label className="input-label">Photo Link</label>
                        <div className="share-link-input">
                            <input
                                type="text"
                                value={shareUrl}
                                readOnly
                                className="input"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="btn btn-primary"
                            >
                                {copied ? (
                                    <>
                                        <Check size={18} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon size={18} />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="share-options">
                        <p className="share-options-title">Share via</p>
                        <div className="share-buttons">
                            <button
                                onClick={handleEmailShare}
                                className="share-button"
                            >
                                <Mail size={24} />
                                <span>Email</span>
                            </button>
                            <button
                                onClick={handleWhatsAppShare}
                                className="share-button"
                            >
                                <MessageCircle size={24} />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
