import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner, Table } from "flowbite-react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/server/post/getposts?userId=${currentUser._id}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }
        setUserPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchPosts();
    }
  }, [currentUser]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(
        `/server/post/deletepost/${postId}/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete post");
      }

      setUserPosts(userPosts.filter((post) => post._id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <Link to="/create-post">
          <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
            Create Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Total Posts
            </h3>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {loading ? "..." : userPosts.length}
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Total Likes
            </h3>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {loading
                ? "..."
                : userPosts.reduce((acc, post) => acc + post.numberOfLikes, 0)}
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Account Status
            </h3>
            <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Active
            </span>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Your Posts
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-400">
            {error}
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            You haven't created any posts yet.{" "}
            <Link to="/create-post" className="text-purple-600 hover:underline">
              Create one now
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {userPosts.map((post) => (
                  <Table.Row
                    key={post._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      <Link
                        to={`/post/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>{post.numberOfLikes}</Table.Cell>
                    <Table.Cell>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Link to={`/update-post/${post._id}`}>
                          <Button size="xs" gradientMonochrome="info">
                            <HiOutlinePencil className="mr-1" /> Edit
                          </Button>
                        </Link>
                        <Button
                          size="xs"
                          gradientMonochrome="failure"
                          onClick={() => handleDelete(post._id)}
                        >
                          <HiOutlineTrash className="mr-1" /> Delete
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
