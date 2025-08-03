import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log("Tab from URL:", tabFromUrl);
  }, [location.search]);
  return (
    <div>
      <div>{/* Sidebar */}</div>
      {/* Sections */}
    </div>
  );
};

export default Dashboard;
