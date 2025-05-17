import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import slugify from "slugify";

const CategoriesAdd = () => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const generatedSlug = slugify(name, {
            lower: true,
            strict: true,
            locale: "uk",
            trim: true,
        });
        setSlug(generatedSlug);
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            alert("Будь ласка, заповніть всі поля.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("slug", slug);
        formData.append("image", image);

        try {
            setLoading(true);
            await axios.post("http://localhost:5066/api/Categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/categories");
        } catch (error) {
            console.error("Помилка при створенні категорії:", error);
            alert("Не вдалося створити категорію.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <form
                className="p-4 shadow rounded bg-light"
                style={{maxWidth: "600px", margin: "auto"}}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h4 className="mb-4">Створення категорії</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Назва категорії</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Введіть назву"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug (автоматично)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="slug"
                        value={slug}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Зображення</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? "Збереження..." : "Створити категорію"}
                </button>
            </form>
        </div>
    );
};

export default CategoriesAdd;
