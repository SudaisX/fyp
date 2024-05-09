import React, { useEffect } from "react";
// import { useProfile } from '; // Adjust the path based on your project structure
import { useProfile } from "../profileContext";
import ProfileTop from "../components/ProfileTop";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ProfilePage = () => {
  const { profile, loading, error, getCurrentProfile } = useProfile();

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {profile ? (
        <div>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
          </div>
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </div>
  );
};

export default ProfilePage;
