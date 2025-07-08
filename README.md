# 🌿 LeafCare – Plant Disease Detection Frontend

The **LeafCare** frontend is a React-based web interface for detecting plant diseases from uploaded leaf images. It connects to a Flask backend that processes the image using a trained deep learning model and returns the predicted disease.

---

## 🚀 About

- Built using **React** and communicates with a Flask backend via HTTP requests.
- Allows users to **upload leaf images** for disease detection.
- Displays the predicted **disease name and confidence score**.
- Clean and responsive user interface.

---

## 🛠️ Technologies Used

- **React** – Frontend framework  
- **Axios** – For making HTTP requests  
- **HTML, CSS** – Styling and layout  
- **Flask** – Python backend 

---

## ⚙️ How to Run the Frontend Locally

To run the LeafCare frontend on your local machine, follow the instructions below.

### 📦 Prerequisites

- Node.js (v14 or higher)
- npm or Yarn
- A running Flask backend server (must support CORS and accept image uploads)

---

### 📁 Setup Instructions

1. **Clone the repository**

   cd front-end

2. **Install Dependencies**

   npm install
   # or
   yarn install

3. **Configure the Backend URL**

   REACT_APP_API_URL=http://localhost:5000

4. **Start the Development Server**

   npm start
   # or
   yarn start




