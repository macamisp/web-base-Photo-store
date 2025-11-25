import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { X, RotateCw, Crop, Sliders, Save } from 'lucide-react';
import './Modal.css';

export default function EditPhotoModal({ photo, onClose, onSaveComplete }) {
    const [title, setTitle] = useState(photo.title || '');
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [saturation, setSaturation] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [saving, setSaving] = useState(false);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        loadImage();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [brightness, contrast, saturation, rotation]);

    const loadImage = () => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = photo.url;
        img.onload = () => {
            imageRef.current = img;
            applyFilters();
        };
    };

    const applyFilters = () => {
        if (!canvasRef.current || !imageRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = imageRef.current;

        // Set canvas size
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply rotation
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        // Apply filters
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);
        ctx.restore();
    };

    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360);
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            // Update title in database
            const { error } = await supabase
                .from('photos')
                .update({ title })
                .eq('id', photo.id);

            if (error) throw error;

            onSaveComplete({ ...photo, title });
        } catch (error) {
            console.error('Error saving photo:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const resetFilters = () => {
        setBrightness(100);
        setContrast(100);
        setSaturation(100);
        setRotation(0);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="edit-modal-content animate-scaleIn" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        <Sliders size={24} />
                        Edit Photo
                    </h2>
                    <button onClick={onClose} className="modal-close">
                        <X size={24} />
                    </button>
                </div>

                <div className="edit-modal-body">
                    <div className="edit-preview">
                        <canvas ref={canvasRef} className="edit-canvas" />
                    </div>

                    <div className="edit-controls">
                        <div className="input-group">
                            <label htmlFor="photo-title" className="input-label">
                                Photo Title
                            </label>
                            <input
                                id="photo-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input"
                                placeholder="Enter photo title"
                            />
                        </div>

                        <div className="edit-section">
                            <h4>Adjustments</h4>

                            <div className="slider-group">
                                <label>
                                    Brightness: {brightness}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={brightness}
                                    onChange={(e) => setBrightness(e.target.value)}
                                    className="slider"
                                />
                            </div>

                            <div className="slider-group">
                                <label>
                                    Contrast: {contrast}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={contrast}
                                    onChange={(e) => setContrast(e.target.value)}
                                    className="slider"
                                />
                            </div>

                            <div className="slider-group">
                                <label>
                                    Saturation: {saturation}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={saturation}
                                    onChange={(e) => setSaturation(e.target.value)}
                                    className="slider"
                                />
                            </div>
                        </div>

                        <div className="edit-section">
                            <h4>Transform</h4>
                            <button
                                onClick={handleRotate}
                                className="btn btn-secondary"
                                style={{ width: '100%' }}
                            >
                                <RotateCw size={20} />
                                Rotate 90°
                            </button>
                        </div>

                        <div className="edit-actions">
                            <button
                                onClick={resetFilters}
                                className="btn btn-ghost"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleSave}
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
