import React from "react";

const ProfilePage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const userData = {
    name: "Noman Ramzan",
    title: "Frontend Developer",
    designation: "Web Developer",
    skills: [
      { name: "Branding", level: 78 },
      { name: "Frontend Development", level: 75 },
      { name: "Web Design", level: 90 },
    ],
    picture: "noman2.jpeg",
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Left Section - Profile Image */}
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <img src={userData.picture} alt="Profile" className="profile-image" />
          </div>
        </div>

        {/* Right Section - Profile Details */}
        <div className="profile-details">
          <h1 className="profile-heading">Member Profile</h1>
          <h2 className="profile-name">{userData.name}</h2>
          <h3 className="profile-designation">{userData.designation}</h3>

          {/* Skills Section */}
          <h3 className="skills-title">Skills</h3>
          <p className="skills-description">
            This is a sample text. Insert your desired text here.
          </p>
          {userData.skills.map((skill, index) => (
            <div key={index} className="skill">
              <span>{skill.name}</span>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// CSS Styles (Inline for Single File)
const styles = `
  .profile-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    background-color: #f5f5f5;
  }

  .profile-card {
    display: flex;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 700px;
    overflow: hidden;
  }

  .profile-image-section {
    width: 35%;
    background:rgb(73, 75, 77);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-image-wrapper {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    background: white;
    padding: 5px;
  }

  .profile-image {
    width: 100%;
    border-radius: 50%;
  }

  .profile-details {
    padding: 20px;
    width: 65%;
  }

  .profile-heading {
    font-size: 22px;
    font-weight: bold;
  }

  .profile-name {
    font-size: 20px;
    color:rgb(28, 42, 56);
    font-weight: bold;
  }

  .profile-designation {
    font-size: 16px;
    color: #555;
  }

  .skills-title {
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
  }

  .skills-description {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
  }

  .skill {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }

  .skill-bar {
    flex: 1;
    height: 8px;
    background: #e0e0e0;
    border-radius: 5px;
    margin: 0 10px;
    overflow: hidden;
  }

  .skill-progress {
    height: 100%;
    background:rgb(73, 75, 77);
  }

  .skill-percentage {
    font-size: 14px;
    font-weight: bold;
  }
`;

// Injecting CSS into the document head
const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ProfilePage;
