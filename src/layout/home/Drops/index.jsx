const Drops = () => {
    return (
        <NavLink 
            to="/explore/item" 
            state={{ 
                zoomImage: item.cover,
                title: item.title,
                author: item.author,
                text: item.text
            }}
        >
            {/* Component content */}
        </NavLink>
    );
}; 