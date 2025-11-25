import './PhotoGrid.css';

export default function PhotoGrid({ photos, onPhotoClick }) {
    return (
        <div className="photo-grid animate-fadeIn">
            {photos.map((photo) => (
                <div
                    key={photo.id}
                    className="photo-item"
                    onClick={() => onPhotoClick(photo)}
                >
                    <img
                        src={photo.url}
                        alt={photo.title || 'Photo'}
                        loading="lazy"
                    />
                    <div className="photo-overlay">
                        <span className="photo-title">{photo.title || 'Untitled'}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
