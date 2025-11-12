import os
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from model_runner import YOLORunner
from pathlib import Path

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="SmartGrocery YOLO Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME = os.getenv("YOLO_MODEL", "yolov8n.pt")
yolo = YOLORunner(model_name=MODEL_NAME)

@app.post("/detect")
async def detect(image: UploadFile = File(...), conf: float = 0.35):
    if image.content_type.split("/")[0] != "image":
        raise HTTPException(status_code=400, detail="File must be an image.")
    filename = f"{uuid.uuid4().hex}_{image.filename}"
    out_path = UPLOAD_DIR / filename
    with open(out_path, "wb") as f:
        contents = await image.read()
        f.write(contents)
    detections = yolo.detect(str(out_path), conf=conf)
    return JSONResponse({"detections": detections})

@app.get("/health")
def health():
    return {"status": "ok"}
