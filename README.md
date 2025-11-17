# Kochi Newsletter

A local-news aggregator and newsletter for Kochi, India.

This project is scaffolded by an AI coding tool based on the provided `spec.md`.

## Development

This project uses `uv` for package and project management.

### Setup

1.  Install `uv`:
    ```bash
    pip install uv
    ```

2.  Create a virtual environment and install dependencies:
    ```bash
    uv venv
    uv pip install -r requirements.txt
    ```

### Running the application

```bash
uv run uvicorn app.main:app --reload
```

### Running tests

```bash
uv run pytest
```
