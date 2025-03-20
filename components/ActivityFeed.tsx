"use client";

import { useState, useEffect } from "react";

export type Activity = {
  id: string;
  timestamp: string;
  title: string;
  type: "Favorited" | "Watch Later";
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setError(null);
      try {
        const response = await fetch("/api/activities");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Activities:", data.activities);
        setActivities(data.activities || []);
      } catch (err: any) {
        console.error("Error fetching activities:", err);
        setError(err.message);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="mt-4 p-2 m-2 border rounded-2xl border-guru-dark-teal bg-guru-teal">
      <div className="text-guru-navy">
        <h3 className="text-center font-bold text-sm">Latest Activity</h3>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <ul className="text-xs mt-2 space-y-1">
          {activities.length === 0 ? (
            <p className="text-xs">No recent activity.</p>
          ) : (
            activities.map((activity) => (
              <li key={activity.id} className="flex flex-col pb-1">
                <span className="text-xs">{new Date(activity.timestamp).toLocaleString()}</span>
                <span>
                {activity.type === "Favorited"
                  ? <>Favorited <span className="font-bold">{activity.title}</span></>
                  : <>Added <span className="font-bold">{activity.title}</span> to Watch Later</>}
              </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
