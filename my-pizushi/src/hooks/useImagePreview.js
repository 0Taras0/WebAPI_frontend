import { useState } from "react";

const useImagePreview = (setFieldValue) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFieldValue("imageFile", file); // ← важливо
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
            setFieldValue("imageFile", null); // очищення
        }
    };

    return { previewImage, handleImageChange };
};

export default useImagePreview;