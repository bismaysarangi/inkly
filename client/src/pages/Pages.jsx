import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture,
      });
      setLoading(false);
    }
  }, [currentUser]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/server/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setFormData((prev) => ({ ...prev, profilePicture: data.imageUrl }));
      setUploading(false);
    } catch (error) {
      setError(error.message);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/server/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Profile Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {error && (
          <Alert color="failure" className="mb-6">
            {error}
          </Alert>
        )}

        {success && (
          <Alert color="success" className="mb-6">
            {success}
          </Alert>
        )}

        <div className="flex flex-col items-center mb-8">
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          <div>
            <Label htmlFor="profilePicture" value="Change Profile Picture" />
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="mt-2 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100
                dark:file:bg-gray-700 dark:file:text-purple-400
                dark:hover:file:bg-gray-600"
            />
            {uploading && <Spinner size="sm" className="mt-2" />}
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              required
              onChange={handleChange}
              value={formData.username}
            />
          </div>

          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800"
              disabled={uploading || loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
