.PHONY: help dev test lint format clean

help:
	@echo "Commands:"
	@echo "  dev      : Start the development server."
	@echo "  test     : Run tests."
	@echo "  lint     : Lint the codebase."
	@echo "  format   : Format the codebase."
	@echo "  clean    : Clean up generated files."

dev:
	uv run uvicorn app.main:app --reload

test:
	uv run pytest

lint:
	uv run ruff check .

format:
	uv run ruff format .
	uv run black .
	uv run isort .

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
