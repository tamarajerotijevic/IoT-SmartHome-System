import axios from "axios";

const API_URL="http://127.0.0.1:5000";

export const getSensorData=()=>{
    return axios.get(`${API_URL}/sensor-data/`);
}

export const getDevices = () => {
    return axios.get(`${API_URL}/devices/`);
};


// Function to send a command to the Arduino
export const sendArduinoCommand = (command) => {

    return axios.post(
        "http://127.0.0.1:5001/arduino-command",
        {
            command: command
        }
    );

};

export const getEvents = () => {
    return axios.get(`${API_URL}/events/`);
};

export const getAuthorizedCards = () => {
    return axios.get(`${API_URL}/access/authorized-cards`);
};

export const getAccessLogs = () => {
    return axios.get(`${API_URL}/access/logs`);
};

export const login = (data) => {
    return axios.post(`${API_URL}/auth/login`, data);
};

export const addAuthorizedCard = (data) => {
    return axios.post(
        `${API_URL}/access/authorized-cards`,
        data
    );
};

export const register = (data) => {
    return axios.post(`${API_URL}/auth/register`, data);
};