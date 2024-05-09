import React from "react";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    major,
    disease,
    batch,
    pfp,
    social,
    website,
    birthday,
  },
}) => {
  function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();

    // Calculate difference in years
    let age = today.getFullYear() - dob.getFullYear();

    // Check if the birthday has occurred this year
    const thisYearsBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today < thisYearsBirthday) {
      age--; // The birthday has not occurred yet this year
    }

    return age;
  }
  return (
    <div className='profile-top' style={{ backgroundColor: "#3A3B3C" }}>
      <img className='mt-1' src={avatar} alt='' />
      <h1 className='mt-3' style={{ color: "#edd5bd" }}>
        {name}
      </h1>
      <p className='lead'>{disease} Disease</p>
      {birthday && (
        <p>
          <span>{calculateAge(birthday)} years old</span>
        </p>
      )}
    </div>
  );
};

export default ProfileTop;
