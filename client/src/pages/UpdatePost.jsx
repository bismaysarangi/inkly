import {
  Alert,
  Button,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [formData, setFormData] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const { postId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoadingPost(true);
        const res = await fetch(
          `https://inkly-server-v564.onrender.com/post/getposts?postId=${postId}`
        );
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          setLoadingPost(false);
          return;
        }

        if (res.ok) {
          setFormData(data.posts[0]);
          setLoadingPost(false);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch(
          "https://inkly-server-v564.onrender.com/upload",
          {
            method: "POST",
            body: formData,
          }
        );
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
    if (!formData.title || !formData.content || !formData.category) {
      return setError("Please fill all required fields");
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://inkly-server-v564.onrender.com/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (loadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Update Post
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        {error && (
          <Alert color="failure" className="mb-6 border-l-4 border-red-500">
            <div className="font-medium text-red-800 dark:text-red-200">
              {error}
            </div>
          </Alert>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title" value="Post Title" />
            <TextInput
              id="title"
              type="text"
              placeholder="Enter post title"
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title || ""}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="category" value="Category" />
            <Select
              id="category"
              required
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category || "uncategorized"}
              disabled={loading}
            >
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
            <ReactQuill
              theme="snow"
              value={formData.content || ""}
              onChange={(value) => {
                setFormData({ ...formData, content: value });
              }}
              modules={modules}
              className="bg-white dark:bg-gray-700 rounded-lg h-64 mb-16"
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              color="gray"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              disabled={loading || imageUploading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
