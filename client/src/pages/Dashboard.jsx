import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

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
          `https://inkly-server-v564.onrender.com/post/getposts?userId=${currentUser._id}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
        setUserPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) fetchPosts();
  }, [currentUser]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(
        `https://inkly-server-v564.onrender.com/post/deletepost/${postId}/${currentUser._id}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete post");

      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/create-post">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            Create Post
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {loading ? "..." : userPosts.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {loading
                ? "..."
                : userPosts.reduce((acc, post) => acc + post.numberOfLikes, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-green-100 text-green-700">
              Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-6">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : userPosts.length === 0 ? (
            <div className="text-center text-gray-500">
              You haven’t created any posts yet.{" "}
              <Link
                to="/create-post"
                className="text-purple-600 hover:underline"
              >
                Create one now
              </Link>
              .
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Likes</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPosts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell>
                        <Link
                          to={`/post/${post.slug}`}
                          className="font-medium hover:underline"
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.numberOfLikes}</TableCell>
                      <TableCell>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link to={`/update-post/${post._id}`}>
                            <Button size="sm" variant="outline">
                              <Pencil className="mr-1 h-4 w-4" /> Edit
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(post._id)}
                          >
                            <Trash className="mr-1 h-4 w-4" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
