import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function CreatePost() {
  const [formData, setFormData] = useState({});
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fixTextDirection = () => {
      const editor = document.querySelector(".ql-editor");
      if (editor) {
        editor.style.direction = "ltr";
        editor.style.textAlign = "left";
        editor.style.unicodeBidi = "normal";
      }
    };

    // Fix immediately and after a short delay to ensure ReactQuill is mounted
    fixTextDirection();
    const timer = setTimeout(fixTextDirection, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("/server/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          setImageUploading(false);
          return;
        }
        setFormData({ ...formData, image: data.imageUrl });
        setImageUploading(false);
      } catch (error) {
        setError(error.message);
        setImageUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !content || !formData.category) {
      return setError("Please fill all required fields");
    }

    try {
      setLoading(true);
      setError(null);
      const postData = {
        ...formData,
        content,
        userId: currentUser._id,
      };

      const res = await fetch("/server/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setLoading(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Create a Post
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Post Title" />
            <TextInput
              id="title"
              type="text"
              placeholder="Enter post title"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="category" value="Category" />
            <Select id="category" required onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="image" value="Featured Image" />
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
                dark:file:bg-gray-700 dark:file:text-purple-400
                dark:hover:file:bg-gray-600"
            />
            {imageUploading && <Spinner size="sm" className="mt-2" />}
            {formData.image && !imageUploading && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 rounded-lg max-h-60 object-cover"
              />
            )}
          </div>

          <div>
            <Label value="Post Content" />
            <div className="quill-wrapper">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                style={{
                  direction: "ltr",
                  textAlign: "left",
                }}
                className="bg-white dark:bg-gray-700 rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              disabled={loading || imageUploading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Publishing...
                </>
              ) : (
                "Publish Post"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Custom CSS to fix text direction */}
      <style jsx>{`
        .quill-wrapper .ql-container {
          direction: ltr !important;
        }

        .quill-wrapper .ql-editor {
          direction: ltr !important;
          text-align: left !important;
          unicode-bidi: normal !important;
        }

        .quill-wrapper .ql-editor p {
          direction: ltr !important;
          text-align: left !important;
        }

        .quill-wrapper .ql-editor * {
          direction: ltr !important;
        }
      `}</style>
    </div>
  );
}
