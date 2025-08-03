import {
  User,
  LogOut,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [tab, setTab] = useState("");

  const user = currentUser?.user || currentUser;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/server/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuItems = [
    // Dashboard - only for admins
    ...(user && user.isAdmin
      ? [
          {
            title: "Dashboard",
            icon: BarChart3,
            url: "/dashboard?tab=dash",
            isActive: tab === "dash" || !tab,
          },
        ]
      : []),
    // Profile - for all users
    {
      title: "Profile",
      icon: User,
      url: "/dashboard?tab=profile",
      isActive: tab === "profile",
      badge: user?.isAdmin ? "Admin" : "User",
    },
    // Admin only items
    ...(user?.isAdmin
      ? [
          {
            title: "Posts",
            icon: FileText,
            url: "/dashboard?tab=posts",
            isActive: tab === "posts",
          },
          {
            title: "Users",
            icon: Users,
            url: "/dashboard?tab=users",
            isActive: tab === "users",
          },
          {
            title: "Comments",
            icon: MessageSquare,
            url: "/dashboard?tab=comments",
            isActive: tab === "comments",
          },
        ]
      : []),
  ];

  return (
    <div className="w-full md:w-56 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-2">
          {menuItems.length > 0 ? (
            menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <IconComponent className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant={user?.isAdmin ? "default" : "secondary"}
                      className={`ml-auto text-xs ${
                        user?.isAdmin
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              No menu items available
            </div>
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <button
          onClick={handleSignout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashSidebar;
