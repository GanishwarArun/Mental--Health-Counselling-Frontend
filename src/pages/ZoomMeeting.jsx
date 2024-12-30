import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For page navigation

const ZoomMeetingsPage = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const zoomClientId = import.meta.env.VITE_ZOOM_CLIENT_ID;
  const zoomClientSecret = import.meta.env.VITE_ZOOM_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_ZOOM_REDIRECT_URI;

  // Step 1: Redirect User to Zoom OAuth Login Page
  const handleLogin = () => {
    const zoomAuthUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomClientId}&redirect_uri=${redirectUri}`;
    window.location.href = zoomAuthUrl;
  };

  // Step 2: Handle OAuth Callback to Fetch Access Token
  useEffect(() => {
    const fetchZoomAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (!code) {
        console.log("No code in URL");
        return;
      }

      try {
        const response = await axios.post(
          "https://zoom.us/oauth/token",
          `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
          {
            headers: {
              Authorization: `Basic ${btoa(`${zoomClientId}:${zoomClientSecret}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const token = response.data.access_token;
        setAccessToken(token);
        localStorage.setItem("zoomAccessToken", token);
      } catch (error) {
        console.error("Error fetching Zoom token:", error.response ? error.response.data : error.message);
      }
    };

    if (window.location.search.includes("code=")) {
      fetchZoomAccessToken();
    }
  }, []);

  // Step 3: Fetch Zoom Meetings Using Access Token
  useEffect(() => {
    const fetchMeetings = async () => {
      const zoomAccessToken = localStorage.getItem("zoomAccessToken") || accessToken;

      if (!zoomAccessToken) {
        console.log("No access token found");
        setError("No access token found");
        return;
      }

      try {
        const response = await axios.get("https://api.zoom.us/v2/users/me/meetings", {
          headers: {
            Authorization: `Bearer ${zoomAccessToken}`,
          },
        });
        setMeetings(response.data.meetings);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      }
    };

    if (accessToken || localStorage.getItem("zoomAccessToken")) {
      fetchMeetings();
    }
  }, [accessToken]);

  const navigateToEmailPage = () => {
    navigate("/email"); // Change this route to navigate to your email page
  };

  // Default meeting data to display if no meetings are found
  const defaultMeeting = {
    id: 1,
    topic: "Zoom Meeting",
    start_time: new Date().toISOString(),
    join_url: "https://zoom.us/j/1234567890",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Zoom Meetings</h1>

      {/* {!accessToken && !localStorage.getItem("zoomAccessToken") && (
        <button onClick={handleLogin} style={styles.button}>
          Login with Zoom
        </button>
      )} */}

      {error && <div style={styles.error}>Error: {error}</div>}

      <ul style={styles.meetingList}>
        {(meetings.length === 0 ? [defaultMeeting] : meetings).map((meeting) => (
          <li key={meeting.id} style={styles.meetingItem}>
            <strong style={styles.meetingTitle}>{meeting.topic}</strong>
            <p style={styles.meetingText}>
              Start Time: {new Date(meeting.start_time).toLocaleString()}
            </p>
            <p style={styles.meetingText}>
              Join URL:{" "}
              <a href={meeting.join_url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Join
              </a>
            </p>
          </li>
        ))}
      </ul>

      <button onClick={navigateToEmailPage} style={styles.nextButton}>
        Go to Email
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2d87f0",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    margin: "20px auto",
    display: "block",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1.2rem",
  },
  meetingList: {
    listStyleType: "none",
    padding: 0,
  },
  meetingItem: {
    backgroundColor: "#fff",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  meetingTitle: {
    fontSize: "1.4rem",
    color: "#333",
  },
  meetingText: {
    fontSize: "1rem",
    color: "#555",
  },
  link: {
    color: "#2d87f0",
    textDecoration: "none",
  },
  nextButton: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    display: "block",
    margin: "30px auto 0",
  },
};

export default ZoomMeetingsPage;

