import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// implement JWT decoding to get user id
type DecodedToken = {
  id: string;
  exp: number;
  iat: number;
};

type ProfileType = {
  id: string;
  username: string;
  profileColor?: string;
  userId: string;
};

const Profile = () => {
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const navigate = useNavigate();

  // Implement profile fetching system

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) return;

        const decoded = jwtDecode(token) as DecodedToken;

        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles", error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-row">
        {profiles.map((profile) => (
          <UserProfile
            key={profile.id}
            username={profile.username}
            profileColor={profile.profileColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
