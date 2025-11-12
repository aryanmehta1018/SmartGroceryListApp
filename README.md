# 🛒 Smart Grocery Inventory App  
> AI-Powered Grocery Detection and Inventory Management  

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?logo=fastapi)
![Expo](https://img.shields.io/badge/Frontend-React%20Native%20(Expo)-61DBFB?logo=react)
![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-orange?logo=pytorch)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📖 Overview  

**Smart Grocery Inventory App** is a cross-platform mobile application that uses **computer vision (YOLOv8)** and **FastAPI** to automatically detect grocery items from images, update stock levels, and generate a grocery list when items run low — all **offline**.  

This project demonstrates the integration of **AI + Mobile Development**, showing how deep learning models can enhance everyday life tasks like grocery management.

---

## 🌟 Features  

- 🤖 **AI Object Detection** — detects fruits and groceries using **YOLOv8n (Ultralytics)**.  
- 📸 **Camera Scanning** — capture groceries directly through the app.  
- 🧾 **Smart Inventory Management** — groups and counts detected items automatically.  
- 🛒 **Auto-Generated Grocery List** — lists low-stock items for restocking.  
- ✅ **Restock Button** — instantly increases quantity for purchased items.  
- 💾 **Offline Support** — uses AsyncStorage for local persistence.  
- 🎨 **Modern UI** — designed with React Native Paper (Material Design).  

---

## 🧱 Project Structure  

```
smart-grocery-offline/
├── backend/                   # FastAPI + YOLOv8 (Python)
│   ├── app.py                 # Main API server
│   ├── model_runner.py        # YOLO model loader and detection
│   └── requirements.txt       # Python dependencies
│
└── mobile/                    # React Native + Expo app
    ├── App.js
    ├── screens/
    │   ├── CameraScanScreen.js
    │   ├── InventoryScreen.js
    │   ├── GroceryListScreen.js
    │   └── SettingsScreen.js
    └── package.json
```

---

## ⚙️ Tech Stack  

| Layer | Tools & Frameworks |
|-------|--------------------|
| 🧠 **AI / Detection** | YOLOv8n (Ultralytics), PyTorch |
| ⚙️ **Backend** | FastAPI, Uvicorn, Python |
| 📱 **Frontend** | React Native, Expo, React Native Paper |
| 💾 **Storage** | AsyncStorage (local) |

---

## 🚀 How It Works  

1. The user scans groceries using the app’s camera.  
2. The image is sent to the **FastAPI backend** (`/detect` endpoint).  
3. The backend runs **YOLOv8n** to detect items in the image.  
4. The backend sends a JSON response (e.g. `[{ "label": "apple" }, { "label": "banana" }]`).  
5. The app updates the **Inventory Screen**, grouping similar items and updating quantities.  
6. If items fall below a threshold, they appear in the **Grocery List**.  
7. Restocking adds items back to inventory.

---

## 🧰 Installation & Setup  

### 1️⃣ Clone the repository
```bash
git clone https://github.com/aryanmehta/smart-grocery-offline.git
cd smart-grocery-offline
```

---

### 2️⃣ Backend Setup (FastAPI + YOLOv8)
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
# or: source venv/bin/activate (Mac/Linux)

pip install -r requirements.txt
# or manually:
pip install fastapi uvicorn ultralytics opencv-python pillow numpy
```

Run the backend:
```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Access the API docs at:  
👉 http://127.0.0.1:8000/docs  

---

### 3️⃣ Mobile App Setup (Expo)
```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go** (Android/iOS app).  

---

## 📸 Example Flow  

| Step | Description |
|------|--------------|
| 🖼️ 1 | Capture grocery image using the mobile app |
| 🧠 2 | Backend detects objects via YOLOv8 |
| 📋 3 | Detected items are saved into the inventory |
| 🛒 4 | Low-quantity items appear in the grocery list |
| ✅ 5 | Restock updates quantities instantly |

---

## 📊 Future Improvements  

- 🔄 Cloud sync with Firebase for multiple devices  
- 🧠 Train a custom YOLO model for local grocery datasets  
- 📈 Add analytics and consumption graphs  
- 🎙️ Voice-assisted grocery logging  

---

## 👨‍💻 Contributors  

| Name | Role |
|------|------|
| **Aryan Mehta** | Mobile App Development (React Native) |
| **Ajitesh Shukla** | Backend & AI Integration (FastAPI + YOLOv8) |

---

## 📜 License  

This project is licensed under the [MIT License](LICENSE).  
Feel free to use and modify for educational purposes.

---

## 💬 Acknowledgements  

- [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics)  
- [FastAPI](https://fastapi.tiangolo.com/)  
- [React Native](https://reactnative.dev/)  
- [Expo](https://expo.dev/)  

---

> _“Empowering everyday life with computer vision and AI.”_
