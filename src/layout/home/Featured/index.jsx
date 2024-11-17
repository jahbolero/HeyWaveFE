const Featured = () => {
    return (
        <NavLink 
            to="/explore/item" 
            state={{ 
                zoomImage: item.media[0].full,  // Using first image as main
                thumbnails: item.media.map(m => m.thumbnail),
                fullImages: item.media.map(m => m.full),
                title: item.title,
                author: item.author
            }}
        >
            {/* Component content */}
        </NavLink>
    );
}; 