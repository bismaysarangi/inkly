import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setPublishError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      setPublishError(null);

      const res = await fetch("/server/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        setIsLoading(false);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setIsLoading(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong while creating the post");
      setIsLoading(false);
    }
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setImageUploadError("File must be less than 2MB");
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setImageUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // For demo purposes, we'll use a placeholder image service
      // In production, you would upload to a service like Firebase Storage or AWS S3
      setTimeout(() => {
        const imageUrl = `https://picsum.photos/800/600?random=${Date.now()}`;
        setFormData({ ...formData, image: imageUrl });
        setImageUploadProgress(100);
        setTimeout(() => {
          setImageUploadProgress(null);
        }, 1000);
        setImageUploadError(null);
      }, 1000);
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="p-3 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Create a New Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your thoughts and ideas with the world
        </p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Enter an engaging title..."
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            disabled={isLoading}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            disabled={isLoading}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="nodejs">Node.js</option>
            <option value="python">Python</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="devops">DevOps</option>
            <option value="design">Design</option>
            <option value="tutorials">Tutorials</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-dashed border-teal-400 dark:border-teal-600 rounded-lg p-6 bg-teal-50 dark:bg-teal-900/20">
          <div className="flex items-center gap-4 flex-1">
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={isLoading || imageUploadProgress}
              className="flex-1"
            />
            {file && (
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-xs">
                {file.name}
              </p>
            )}
          </div>
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={isLoading || imageUploadProgress || !file}
          >
            {imageUploadProgress ? (
              <div className="w-8 h-8">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                  styles={{
                    text: { fontSize: "24px", fontWeight: "bold" },
                    path: { stroke: "#8b5cf6" },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert color="failure" className="animate-pulse">
            {imageUploadError}
          </Alert>
        )}

        {formData.image && (
          <div className="relative">
            <img
              src={formData.image}
              alt="Upload preview"
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-2 right-2">
              <Button
                color="failure"
                size="xs"
                onClick={() => setFormData({ ...formData, image: null })}
              >
                Remove
              </Button>
            </div>
          </div>
        )}

        <div className="relative">
          <ReactQuill
            theme="snow"
            modules={modules}
            placeholder="Tell your story... Write something amazing!"
            className="h-80 mb-16"
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}
          />
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            color="gray"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            size="lg"
            disabled={isLoading || !formData.title || !formData.content}
            className="min-w-32"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Publishing...
              </>
            ) : (
              "Publish Post"
            )}
          </Button>
        </div>

        {publishError && (
          <Alert className="mt-5 animate-pulse" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
