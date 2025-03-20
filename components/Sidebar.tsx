"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import ActivityFeed from "@/components/ActivityFeed";


type Activity = {
  id: string;
  timestamp: string;
  title: string;
  activity: string;
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const router = useRouter();

  const navigateTo = (path: string) => {
    console.log("Navigating to", path); // Debug log
    router.push(path);
  };

  /*
  useEffect(() => {
    if (expanded) {
      const fetchActivities = async () => {
        try {
          const response = await fetch("/api/activities?page=1");
          const data = await response.json();

          setActivities(data.activities);
        } catch (error) {
          console.error("Failed to Fetch Activities:", error);
        }
      };
      fetchActivities();
    }
  }, [expanded]);
  */

  return (
    <aside className={`bg-guru-dark-teal min-h-screen transition-all ${expanded ? "expanded" : "collapsed"}`}
    onMouseEnter={() => setExpanded(true)}
    onMouseLeave={() => setExpanded(false)}
    >
      <nav className="flex flex-col ml-4 mt-2">
        <ul className="flex flex-col gap-4 items-start">
          <li>
            <button
                onClick={() => navigateTo("/")}
                className="w-full flex items-center justify-start"
              >
                <Image className="mr-2" src="/Icons/solidfolder.svg" alt="Icon" width={25} height={25} />
                {expanded && <span>Home</span>}
            </button>
          </li>
          <li>
            <button
                onClick={() => navigateTo("/favorites")}
                className="w-full rounded text-white flex items-center"
              >
                <Image className="mr-2" src="/Icons/solidStar.svg" alt="Icon" width={25} height={25} />
                {expanded && <span>Favorites</span>}
            </button>
          </li>
          <li>
            <button
                onClick={() => navigateTo("/watch-later")}
                className="w-full rounded text-white flex items-center"
              >
                <Image className="mr-2" src="/Icons/solidClock.svg" alt="Icon" width={25} height={25} />
                {expanded && <span>Watch Later</span>}
            </button>
          </li>
        </ul>
      </nav>
      {expanded && <ActivityFeed />}
    </aside>
  )
}