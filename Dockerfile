# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install uv
RUN pip install uv

# Copy the pyproject.toml and uv.lock files to the working directory
COPY pyproject.toml uv.lock ./

# Install any needed packages specified in pyproject.toml
RUN uv pip install --system --no-cache --compile -r pyproject.toml

# Copy the rest of the application code to the working directory
COPY ./app /app/app

# Command to run the application
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
