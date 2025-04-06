# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project (including the ml/ folder)
COPY . /app/

# Expose the port
EXPOSE 3000

# Run the FastAPI app located in the ml folder
CMD ["uvicorn", "ml.main:app", "--host", "0.0.0.0", "--port", "3000"]
