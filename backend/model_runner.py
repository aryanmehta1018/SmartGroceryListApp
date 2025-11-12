from ultralytics import YOLO

class YOLORunner:
    def __init__(self, model_name='yolov8n.pt'):
        print(f"Loading YOLO model {model_name} ...")
        self.model = YOLO(model_name)
        print("Model loaded.")

    def detect(self, image_path, imgsz=640, conf=0.35):
        results = self.model.predict(source=image_path, imgsz=imgsz, conf=conf, verbose=False)
        out = []
        if len(results) == 0:
            return out
        r = results[0]
        boxes = r.boxes
        for box in boxes:
            xyxy = box.xyxy[0].tolist()
            conf_score = float(box.conf[0])
            cls_id = int(box.cls[0])
            label = self.model.names.get(cls_id, str(cls_id))
            out.append({
                "label": label,
                "confidence": conf_score,
                "bbox": [float(x) for x in xyxy]
            })
        return out
