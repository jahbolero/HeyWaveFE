// components
import {toast} from 'react-toastify';

// hooks
import {useState} from 'react';

const useFileReader = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            return;
        }
        
        if (selectedFile.type !== 'image/jpeg' && selectedFile.type !== 'image/png' && selectedFile.type !== 'image/webp') {
            toast.error('File type not supported.');
            return;
        }

        // Store the actual File object
        setFile(selectedFile);

        // Create preview
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadstart = () => setLoading(true);
        reader.onloadend = () => {
            setPreview(reader.result);
            setLoading(false);
        };
        reader.onerror = () => {
            toast.error('Something went wrong. Please try again.');
            setFile(null);
            setPreview(null);
        }

        return selectedFile;  // Return the file for immediate use
    }

    return { 
        file,           // This is the actual File object
        setFile, 
        preview,        // This is the data URL for preview
        setPreview, 
        handleFile, 
        loading 
    };
}

export default useFileReader;