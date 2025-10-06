# 🔐 GitHub Secrets Configuration Guide

## Required Secrets for CS360 Hub CI/CD

### 📍 Navigate to Secrets
1. Go to: `https://github.com/cbxgrowth/cs360-hub/settings/secrets/actions`
2. Click "New repository secret" for each secret below

---

## 🛡️ Required Secrets

### **Container Registry**
```bash
# GitHub Container Registry (recommended)
REGISTRY_USERNAME = "cbxgrowth"  # or your GitHub username
REGISTRY_PASSWORD = "ghp_xxxxxxxxxxxx"  # GitHub Personal Access Token

# Or Docker Hub (alternative)
DOCKERHUB_USERNAME = "your-dockerhub-username"
DOCKERHUB_TOKEN = "your-dockerhub-token"
```

### **Deployment Secrets**
```bash
# Production Server SSH (if using VM/server deploy)
DEPLOY_HOST = "your-server-ip"
DEPLOY_USERNAME = "deploy-user"
DEPLOY_SSH_KEY = "-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----"

# Kubernetes (if using K8s)
KUBE_CONFIG = "base64-encoded-kubeconfig"

# Cloud Provider (if using AWS/GCP/Azure)
AWS_ACCESS_KEY_ID = "AKIAXXXXXXXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### **Application Secrets**
```bash
# Supabase Configuration
VITE_SUPABASE_URL = "https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Monitoring (optional)
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/YOUR_WORKSPACE/YOUR_CHANNEL/YOUR_TOKEN"
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN"
```

### **Security Tokens**
```bash
# For security scans and notifications
GITHUB_TOKEN = "ghp_xxxxxxxxxxxx"  # GitHub Personal Access Token
CODECOV_TOKEN = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # For coverage reports
```

---

## 🔑 How to Create GitHub Personal Access Token

1. **Go to**: GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. **Click**: "Generate new token (classic)"
3. **Select scopes**:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:packages` (Write packages to GitHub Package Registry)
   - ✅ `read:packages` (Read packages from GitHub Package Registry)
4. **Copy token** and use as `REGISTRY_PASSWORD`

---

## 📋 Minimal Required Secrets (for basic CI/CD)

If you want to start with minimal setup, these are **essential**:

```bash
REGISTRY_USERNAME = "cbxgrowth"
REGISTRY_PASSWORD = "ghp_xxxxxxxxxxxx"  # GitHub token
VITE_SUPABASE_URL = "https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIs..."
```

---

## ✅ Verification Steps

After adding secrets:

1. **Trigger workflow**: Make a small change and push
2. **Check Actions tab**: Verify workflow runs successfully
3. **Monitor build**: All jobs should pass (Quality → Tests → Build → Deploy)
4. **Check containers**: Verify images are pushed to GitHub Container Registry

---

## 🚨 Security Notes

- ✅ **Never commit secrets** to repository
- ✅ **Use environment-specific secrets** (staging vs production)
- ✅ **Rotate tokens regularly** (every 3-6 months)
- ✅ **Minimal permissions**: Only grant necessary scopes
- ✅ **Monitor usage**: Check for unauthorized access

---

## 🔄 Testing the Pipeline

After configuring secrets, test with:

```bash
# Make a small change and push
echo "# Test CI/CD" >> README.md
git add README.md
git commit -m "test: CI/CD pipeline activation"
git push origin main
```

Then check: `https://github.com/cbxgrowth/cs360-hub/actions`

---

**🎯 Goal**: Complete automated CI/CD from code push to production deployment!
