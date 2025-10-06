#!/bin/bash

# CS360 Hub - Script de Deploy Automatizado
# Usage: ./scripts/deploy.sh [environment] [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="cs360-hub"
REGISTRY="ghcr.io"
REPO="your-org/cs360-hub"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_usage() {
    echo "Usage: $0 [environment] [version]"
    echo ""
    echo "Environments:"
    echo "  staging    - Deploy to staging environment"
    echo "  production - Deploy to production environment"
    echo ""
    echo "Version:"
    echo "  latest     - Deploy latest version"
    echo "  v1.0.0     - Deploy specific version tag"
    echo "  main-abc123 - Deploy specific commit"
    echo ""
    echo "Examples:"
    echo "  $0 staging latest"
    echo "  $0 production v1.0.0"
    exit 1
}

validate_environment() {
    local env=$1
    if [[ "$env" != "staging" && "$env" != "production" ]]; then
        log_error "Invalid environment: $env"
        show_usage
    fi
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker is required but not installed"
        exit 1
    fi
    
    # Check kubectl (for Kubernetes deployments)
    if ! command -v kubectl &> /dev/null; then
        log_warning "kubectl not found - skipping Kubernetes checks"
    fi
    
    # Check if logged into registry
    if ! docker info | grep -q "Username"; then
        log_warning "Not logged into Docker registry"
    fi
    
    log_success "Prerequisites check completed"
}

run_pre_deploy_checks() {
    local env=$1
    local version=$2
    
    log_info "Running pre-deploy checks for $env environment..."
    
    # Health check current deployment (if exists)
    if [[ "$env" == "production" ]]; then
        log_info "Checking current production health..."
        if curl -f https://cs360hub.com/health &> /dev/null; then
            log_success "Current production is healthy"
        else
            log_warning "Current production health check failed"
        fi
    fi
    
    # Check image exists
    log_info "Verifying Docker image exists..."
    if docker manifest inspect "$REGISTRY/$REPO:$version" &> /dev/null; then
        log_success "Docker image $REGISTRY/$REPO:$version found"
    else
        log_error "Docker image $REGISTRY/$REPO:$version not found"
        exit 1
    fi
    
    log_success "Pre-deploy checks completed"
}

deploy_docker_compose() {
    local env=$1
    local version=$2
    
    log_info "Deploying with Docker Compose..."
    
    # Create environment-specific docker-compose file
    local compose_file="docker-compose.${env}.yml"
    
    if [[ ! -f "$compose_file" ]]; then
        log_error "Docker Compose file not found: $compose_file"
        exit 1
    fi
    
    # Set environment variables
    export CS360_VERSION=$version
    export CS360_ENV=$env
    
    # Pull latest image
    log_info "Pulling Docker image..."
    docker-compose -f "$compose_file" pull
    
    # Deploy
    log_info "Starting deployment..."
    docker-compose -f "$compose_file" up -d --remove-orphans
    
    log_success "Docker Compose deployment completed"
}

deploy_kubernetes() {
    local env=$1
    local version=$2
    
    log_info "Deploying to Kubernetes..."
    
    # Set kubectl context
    local context="cs360-${env}"
    kubectl config use-context "$context" || {
        log_error "Failed to set kubectl context: $context"
        exit 1
    }
    
    # Update deployment
    kubectl set image deployment/${APP_NAME} \
        ${APP_NAME}="$REGISTRY/$REPO:$version" \
        --namespace="${env}" || {
        log_error "Failed to update Kubernetes deployment"
        exit 1
    }
    
    # Wait for rollout
    log_info "Waiting for deployment rollout..."
    kubectl rollout status deployment/${APP_NAME} \
        --namespace="${env}" \
        --timeout=300s || {
        log_error "Deployment rollout failed"
        
        # Rollback on failure
        log_info "Rolling back deployment..."
        kubectl rollout undo deployment/${APP_NAME} --namespace="${env}"
        exit 1
    }
    
    log_success "Kubernetes deployment completed"
}

run_post_deploy_checks() {
    local env=$1
    
    log_info "Running post-deploy checks..."
    
    # Determine URL based on environment
    local url
    if [[ "$env" == "production" ]]; then
        url="https://cs360hub.com"
    else
        url="https://staging.cs360hub.com"
    fi
    
    # Wait for service to be ready
    log_info "Waiting for service to be ready..."
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f "$url/health" &> /dev/null; then
            log_success "Health check passed"
            break
        fi
        
        log_info "Attempt $attempt/$max_attempts - waiting..."
        sleep 10
        ((attempt++))
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        log_error "Health check failed after $max_attempts attempts"
        exit 1
    fi
    
    # Basic functionality tests
    log_info "Running smoke tests..."
    
    # Test main page loads
    if curl -f "$url" &> /dev/null; then
        log_success "Main page accessible"
    else
        log_error "Main page not accessible"
        exit 1
    fi
    
    # Test API endpoint (if applicable)
    if curl -f "$url/api/health" &> /dev/null; then
        log_success "API endpoint accessible"
    else
        log_warning "API endpoint not accessible or not implemented"
    fi
    
    log_success "Post-deploy checks completed"
}

send_notification() {
    local env=$1
    local version=$2
    local status=$3
    
    local message
    if [[ "$status" == "success" ]]; then
        message="✅ CS360 Hub deployment to $env completed successfully!"
    else
        message="❌ CS360 Hub deployment to $env failed!"
    fi
    
    message="$message\n"
    message="${message}🏷️ Version: $version\n"
    message="${message}🕒 Time: $(date)\n"
    message="${message}👤 User: $(whoami)\n"
    
    # Slack notification (if webhook configured)
    if [[ -n "${SLACK_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\"}" \
            "$SLACK_WEBHOOK_URL" || log_warning "Failed to send Slack notification"
    fi
    
    # Discord notification (if webhook configured)
    if [[ -n "${DISCORD_WEBHOOK_URL:-}" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"content\":\"$message\"}" \
            "$DISCORD_WEBHOOK_URL" || log_warning "Failed to send Discord notification"
    fi
    
    echo -e "$message"
}

# Main deployment function
main() {
    local environment=${1:-}
    local version=${2:-latest}
    
    # Show usage if no arguments
    if [[ -z "$environment" ]]; then
        show_usage
    fi
    
    # Validate inputs
    validate_environment "$environment"
    
    log_info "Starting CS360 Hub deployment"
    log_info "Environment: $environment"
    log_info "Version: $version"
    log_info "Time: $(date)"
    
    # Confirmation for production
    if [[ "$environment" == "production" ]]; then
        echo ""
        log_warning "You are about to deploy to PRODUCTION!"
        read -p "Are you sure you want to continue? (yes/no): " -r
        if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
            log_info "Deployment cancelled"
            exit 0
        fi
    fi
    
    # Execute deployment steps
    check_prerequisites
    run_pre_deploy_checks "$environment" "$version"
    
    # Choose deployment method (modify based on your infrastructure)
    if [[ -f "docker-compose.${environment}.yml" ]]; then
        deploy_docker_compose "$environment" "$version"
    elif command -v kubectl &> /dev/null; then
        deploy_kubernetes "$environment" "$version"
    else
        log_error "No deployment method available"
        exit 1
    fi
    
    run_post_deploy_checks "$environment"
    send_notification "$environment" "$version" "success"
    
    log_success "Deployment completed successfully!"
}

# Trap errors and send failure notification
trap 'send_notification "${1:-unknown}" "${2:-unknown}" "failure"' ERR

# Run main function with all arguments
main "$@"

