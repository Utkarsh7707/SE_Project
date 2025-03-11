import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Account.module.css"; // Importing the CSS module

const Account = () => {
    const [user, setUser] = useState(null);
    const [analysisHistory, setAnalysisHistory] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/user/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("Fetched user data:", res.data); // Debugging

                if (res.data) {
                    setUser(res.data);
                    setUpdatedData({ name: res.data.name, email: res.data.email });
                    setAnalysisHistory(res.data.analysisHistory || []);
                }
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:3000/user/update-profile", updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(updatedData);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.accountBox}>
                <h2 className={styles.heading}>Account Details</h2>
                
                {user ? (
                    <div className={styles.accountInfo}>
                        {editMode ? (
                            <div className={styles.editContainer}>
                            <input
                                type="text"
                                value={updatedData.name}
                                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                className={styles.input}
                            />
                            <input
                                type="email"
                                value={updatedData.email}
                                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                                className={styles.input}
                            />
                        
                            {/* Wrap buttons inside a div for styling */}
                            <div className={styles.buttonContainer}>
                                <button onClick={handleUpdate} className={styles.saveBtn}>Save</button>
                                <button onClick={() => setEditMode(false)} className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </div>
                        
                        ) : (
                            <div className={styles.infoContainer}>
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <button onClick={() => setEditMode(true)} className={styles.editBtn}>Edit</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={styles.loading}>Loading user details...</p>
                )}

                <h2 className={styles.heading}>Analysis Dashboard</h2>
                <div className={styles.dashboard}>
                    {analysisHistory.length === 0 ? (
                        <p className={styles.noHistory}>No analysis history found.</p>
                    ) : (
                        <canvas id="emotionChart"></canvas>
                    )}
                </div>
            </div>

            {/* Space for animation */}
            <div className={styles.animationBox}></div>
        </div>
    );
};

export default Account;
