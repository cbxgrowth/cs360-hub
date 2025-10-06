# CS360 Hub - Makefile for Development and Production Operations
.PHONY: help install dev build test lint clean deploy-staging deploy-prod monitor docker-build docker-run

# Default target
.DEFAULT_GOAL := help

# Variables
NODE_ENV ?= development
PORT ?= 8080
DOCKER_IMAGE = cs360-hub
DOCKER_TAG ?= latest

# Colors for output
BLUE = \033[0;34m
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

## Help
help: ## Show this help message
	@echo "$(BLUE)CS360 Hub - Available Commands$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Usage: make $(GREEN)<target>$(NC)\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

## Development
install: ## Install dependencies
	@echo "$(BLUE)📦 Installing dependencies...$(NC)"
	npm ci
	@echo "$(GREEN)✅ Dependencies installed$(NC)"

dev: ## Start development server
	@echo "$(BLUE)🚀 Starting development server...$(NC)"
	npm run dev

dev-https: ## Start development server with HTTPS
	@echo "$(BLUE)🔒 Starting development server with HTTPS...$(NC)"
	HTTPS=true npm run dev

## Quality Assurance
lint: ## Run ESLint
	@echo "$(BLUE)🔍 Running ESLint...$(NC)"
	npm run lint

lint-fix: ## Run ESLint and fix issues
	@echo "$(BLUE)🔧 Running ESLint with fixes...$(NC)"
	npm run lint -- --fix

test: ## Run tests
	@echo "$(BLUE)🧪 Running tests...$(NC)"
	npm test

test-watch: ## Run tests in watch mode
	@echo "$(BLUE)👀 Running tests in watch mode...$(NC)"
	npm run test:watch

test-coverage: ## Run tests with coverage
	@echo "$(BLUE)📊 Running tests with coverage...$(NC)"
	npm run test:coverage

audit: ## Run security audit
	@echo "$(BLUE)🔒 Running security audit...$(NC)"
	npm audit
	@echo "$(GREEN)✅ Security audit complete$(NC)"

audit-fix: ## Fix security vulnerabilities
	@echo "$(BLUE)🔧 Fixing security vulnerabilities...$(NC)"
	npm audit fix
	@echo "$(GREEN)✅ Vulnerabilities fixed$(NC)"

## Build & Bundle
build: ## Build for production
	@echo "$(BLUE)🏗️ Building for production...$(NC)"
	NODE_ENV=production npm run build
	@echo "$(GREEN)✅ Build complete$(NC)"
	@echo "$(YELLOW)📊 Bundle analysis:$(NC)"
	@ls -lh dist/assets/ | head -10

build-analyze: ## Build and analyze bundle size
	@echo "$(BLUE)📊 Building and analyzing bundle...$(NC)"
	NODE_ENV=development npm run build
	@echo "$(GREEN)✅ Build analysis complete - check dist/stats.html$(NC)"

preview: ## Preview production build
	@echo "$(BLUE)👀 Starting preview server...$(NC)"
	npm run preview

## Docker Operations
docker-build: ## Build Docker image
	@echo "$(BLUE)🐳 Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .
	@echo "$(GREEN)✅ Docker image built: $(DOCKER_IMAGE):$(DOCKER_TAG)$(NC)"

docker-run: ## Run Docker container
	@echo "$(BLUE)🚀 Running Docker container...$(NC)"
	docker run -d --name cs360-hub-container -p $(PORT):8080 $(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo "$(GREEN)✅ Container running on http://localhost:$(PORT)$(NC)"

docker-stop: ## Stop Docker container
	@echo "$(BLUE)🛑 Stopping Docker container...$(NC)"
	docker stop cs360-hub-container || true
	docker rm cs360-hub-container || true
	@echo "$(GREEN)✅ Container stopped$(NC)"

docker-logs: ## View Docker container logs
	docker logs -f cs360-hub-container

docker-compose-up: ## Start with Docker Compose
	@echo "$(BLUE)🐳 Starting with Docker Compose...$(NC)"
	docker-compose -f docker-compose.prod.yml up -d
	@echo "$(GREEN)✅ Services started$(NC)"

docker-compose-down: ## Stop Docker Compose services
	@echo "$(BLUE)🛑 Stopping Docker Compose services...$(NC)"
	docker-compose -f docker-compose.prod.yml down
	@echo "$(GREEN)✅ Services stopped$(NC)"

## Deployment
deploy-staging: ## Deploy to staging
	@echo "$(BLUE)🚀 Deploying to staging...$(NC)"
	./scripts/deploy.sh staging latest
	@echo "$(GREEN)✅ Staging deployment complete$(NC)"

deploy-prod: ## Deploy to production
	@echo "$(RED)⚠️ PRODUCTION DEPLOYMENT$(NC)"
	@echo "$(YELLOW)This will deploy to production. Are you sure?$(NC)"
	@read -p "Type 'yes' to continue: " confirm; \
	if [ "$$confirm" = "yes" ]; then \
		echo "$(BLUE)🚀 Deploying to production...$(NC)"; \
		./scripts/deploy.sh production latest; \
		echo "$(GREEN)✅ Production deployment complete$(NC)"; \
	else \
		echo "$(YELLOW)Deployment cancelled$(NC)"; \
	fi

## Monitoring & Health
health: ## Check application health
	@echo "$(BLUE)🏥 Checking application health...$(NC)"
	@curl -f http://localhost:$(PORT)/health || echo "$(RED)❌ Health check failed$(NC)"

monitor-start: ## Start monitoring stack
	@echo "$(BLUE)📊 Starting monitoring stack...$(NC)"
	docker-compose -f docker-compose.prod.yml --profile monitoring up -d
	@echo "$(GREEN)✅ Monitoring started$(NC)"
	@echo "$(BLUE)📊 Grafana: http://localhost:3000$(NC)"
	@echo "$(BLUE)📈 Prometheus: http://localhost:9090$(NC)"

monitor-stop: ## Stop monitoring stack
	@echo "$(BLUE)🛑 Stopping monitoring stack...$(NC)"
	docker-compose -f docker-compose.prod.yml --profile monitoring down
	@echo "$(GREEN)✅ Monitoring stopped$(NC)"

logs: ## View application logs
	@echo "$(BLUE)📋 Viewing application logs...$(NC)"
	docker-compose -f docker-compose.prod.yml logs -f cs360-hub

## Maintenance
clean: ## Clean build artifacts and node_modules
	@echo "$(BLUE)🧹 Cleaning build artifacts...$(NC)"
	rm -rf dist/
	rm -rf node_modules/
	rm -rf .next/
	rm -f npm-debug.log*
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

clean-docker: ## Clean Docker images and containers
	@echo "$(BLUE)🧹 Cleaning Docker resources...$(NC)"
	docker system prune -f
	@echo "$(GREEN)✅ Docker cleanup complete$(NC)"

update-deps: ## Update dependencies
	@echo "$(BLUE)📦 Updating dependencies...$(NC)"
	npm update
	npm audit fix
	@echo "$(GREEN)✅ Dependencies updated$(NC)"

## Database
db-backup: ## Backup database (implement as needed)
	@echo "$(BLUE)💾 Creating database backup...$(NC)"
	# Implement your backup strategy here
	@echo "$(YELLOW)⚠️ Database backup not implemented$(NC)"

db-restore: ## Restore database (implement as needed)
	@echo "$(BLUE)🔄 Restoring database...$(NC)"
	# Implement your restore strategy here
	@echo "$(YELLOW)⚠️ Database restore not implemented$(NC)"

## CI/CD Support
ci-install: ## Install dependencies for CI
	npm ci --frozen-lockfile

ci-test: ## Run tests for CI
	@echo "$(BLUE)🧪 Running CI tests...$(NC)"
	npm run test
	npm run test:coverage

ci-build: ## Build for CI
	@echo "$(BLUE)🏗️ Running CI build...$(NC)"
	npm run build

ci-security: ## Run security checks for CI
	@echo "$(BLUE)🔒 Running security checks...$(NC)"
	npm audit --audit-level high

## Performance
perf-test: ## Run performance tests
	@echo "$(BLUE)⚡ Running performance tests...$(NC)"
	# Add your performance testing tools here
	# Example: lighthouse, artillery, k6
	@echo "$(YELLOW)⚠️ Performance tests not implemented$(NC)"

bundle-analyzer: ## Analyze bundle size
	@echo "$(BLUE)📊 Analyzing bundle size...$(NC)"
	npm run build-analyze
	@echo "$(GREEN)✅ Check dist/stats.html for bundle analysis$(NC)"

## Environment Setup
setup-dev: install ## Setup development environment
	@echo "$(BLUE)🛠️ Setting up development environment...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)⚠️ Creating .env file from template...$(NC)"; \
		cp .env.example .env || echo "$(RED)❌ .env.example not found$(NC)"; \
	fi
	@echo "$(GREEN)✅ Development environment ready$(NC)"

setup-prod: ## Setup production environment
	@echo "$(BLUE)🛠️ Setting up production environment...$(NC)"
	chmod +x scripts/deploy.sh
	@echo "$(GREEN)✅ Production environment ready$(NC)"

## Status
status: ## Show system status
	@echo "$(BLUE)📊 CS360 Hub System Status$(NC)"
	@echo ""
	@echo "$(YELLOW)Node.js Version:$(NC) $(shell node --version)"
	@echo "$(YELLOW)npm Version:$(NC) $(shell npm --version)"
	@echo "$(YELLOW)Project Version:$(NC) $(shell node -p "require('./package.json').version")"
	@echo "$(YELLOW)Environment:$(NC) $(NODE_ENV)"
	@echo "$(YELLOW)Port:$(NC) $(PORT)"
	@echo ""
	@if docker --version > /dev/null 2>&1; then \
		echo "$(GREEN)✅ Docker available$(NC)"; \
	else \
		echo "$(RED)❌ Docker not available$(NC)"; \
	fi
	@if command -v kubectl > /dev/null 2>&1; then \
		echo "$(GREEN)✅ kubectl available$(NC)"; \
	else \
		echo "$(YELLOW)⚠️ kubectl not available$(NC)"; \
	fi

