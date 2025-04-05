from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and tokenizer
model_name = "Apizhai/Albert-IT-JobRecommendation"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Define job categories
job_categories = [
    "Software Engineer", "Data Scientist", "ML Engineer", "Cloud Engineer", "Security Engineer",
    "DevOps Engineer", "Product Manager", "Data Analyst", "AI Researcher", "Backend Developer",
    "Frontend Developer", "Full Stack Developer", "Mobile Developer", "System Administrator"
]

# Define input schema
class JobInput(BaseModel):
    user_profile: str
    job_description: str

@app.get("/")
def home():
    return {"message": "Job Recommendation API is running"}

@app.post("/recommend")
def recommend(input_data: JobInput):
    combined_text = f"{input_data.user_profile} [SEP] {input_data.job_description}"
    inputs = tokenizer(combined_text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1).tolist()[0]

    # Create a dictionary with job categories and scores
    recommendations = {job_categories[i]: probs[i] for i in range(len(job_categories))}
    
    # Sort jobs by highest recommendation score
    sorted_recommendations = dict(sorted(recommendations.items(), key=lambda x: x[1], reverse=True))

    return {"recommendations": sorted_recommendations}
