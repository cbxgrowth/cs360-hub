# CS360 Hub - API Documentation

## Authentication

All API requests require authentication using an API key. Include your API key in the `Authorization` header:

```
Authorization: Bearer cs360_your_api_key_here
```

## Rate Limits

- Default: 1000 requests per hour per API key
- Rate limit information is included in response headers:
  - `X-RateLimit-Limit`: Maximum requests per hour
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "per_page": 50,
    "total": 100,
    "rate_limit": {
      "limit": 1000,
      "remaining": 995,
      "reset_at": "2025-10-01T15:00:00Z"
    }
  }
}
```

## Error Responses

```json
{
  "success": false,
  "error": "Error message here"
}
```

## Endpoints

### Clients

#### List Clients
```
GET /api/clients
```

Query Parameters:
- `page` (number): Page number (default: 1)
- `per_page` (number): Items per page (default: 50, max: 100)
- `status` (string): Filter by status (Ativo, Risco, Inativo)
- `tier` (string): Filter by tier

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Client Name",
      "email": "client@example.com",
      "status": "Ativo",
      "health_score": 85,
      "mrr": 5000,
      "ltv": 150000,
      "cac": 3000
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 50,
    "total": 100
  }
}
```

#### Get Client
```
GET /api/clients/:id
```

#### Create Client
```
POST /api/clients
```

Required Scopes: `clients:write`

Body:
```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "company": "Company Name",
  "plan": "Enterprise",
  "mrr": 5000
}
```

#### Update Client
```
PUT /api/clients/:id
```

Required Scopes: `clients:write`

#### Delete Client
```
DELETE /api/clients/:id
```

Required Scopes: `clients:write`

### Campaigns

#### List Campaigns
```
GET /api/campaigns
```

#### Get Campaign
```
GET /api/campaigns/:id
```

#### Create Campaign
```
POST /api/campaigns
```

Required Scopes: `campaigns:write`

Body:
```json
{
  "name": "Campaign Name",
  "type": "email",
  "template_id": "uuid",
  "scheduled_at": "2025-10-01T10:00:00Z"
}
```

#### Send Campaign
```
POST /api/campaigns/:id/send
```

Required Scopes: `campaigns:write`

#### Get Campaign Analytics
```
GET /api/campaigns/:id/analytics
```

Response:
```json
{
  "success": true,
  "data": {
    "total_sent": 1000,
    "total_opened": 250,
    "total_clicked": 75,
    "open_rate": 25.0,
    "click_rate": 30.0,
    "conversion_rate": 5.0
  }
}
```

### Automations

#### List Automations
```
GET /api/automations
```

#### Get Automation
```
GET /api/automations/:id
```

#### Create Automation
```
POST /api/automations
```

Required Scopes: `automations:write`

Body:
```json
{
  "name": "Automation Name",
  "type": "trigger",
  "triggers": [
    {
      "type": "event",
      "event": "client.created"
    }
  ],
  "actions": [
    {
      "type": "email",
      "config": {
        "template_id": "uuid"
      }
    }
  ]
}
```

#### Execute Automation
```
POST /api/automations/:id/execute
```

Required Scopes: `automations:write`

### Analytics

#### Get LTV/CAC Metrics
```
GET /api/analytics/ltv-cac
```

Required Scopes: `analytics:read`

Query Parameters:
- `period` (string): day, week, month, year

Response:
```json
{
  "success": true,
  "data": {
    "current_ltv": 150000,
    "current_cac": 3000,
    "ltv_cac_ratio": 50.0,
    "payback_period": 6
  }
}
```

### Webhooks

#### List Webhooks
```
GET /api/webhooks
```

#### Create Webhook
```
POST /api/webhooks
```

Required Scopes: `webhooks:write`

Body:
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["client.created", "campaign.completed"],
  "secret": "your_webhook_secret"
}
```

## Webhook Events

Webhooks are sent as POST requests with the following structure:

```json
{
  "event": "client.created",
  "data": {
    "id": "uuid",
    "name": "Client Name",
    "email": "client@example.com"
  },
  "timestamp": "2025-10-01T10:00:00Z"
}
```

### Available Events

- `client.created`
- `client.updated`
- `client.deleted`
- `campaign.completed`
- `automation.executed`
- `nps.score_received`
- `churn.risk_detected`

## Error Codes

- `400` - Bad Request
- `401` - Unauthorized (Invalid API key)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (Rate limit exceeded)
- `500` - Internal Server Error

## Code Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

const apiKey = 'cs360_your_api_key';
const baseURL = 'https://api.cs360hub.com';

const client = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
});

// List clients
const getClients = async () => {
  try {
    const response = await client.get('/api/clients');
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};

// Create client
const createClient = async () => {
  try {
    const response = await client.post('/api/clients', {
      name: 'New Client',
      email: 'newclient@example.com',
      mrr: 5000
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Python

```python
import requests

api_key = 'cs360_your_api_key'
base_url = 'https://api.cs360hub.com'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

# List clients
response = requests.get(f'{base_url}/api/clients', headers=headers)
print(response.json())

# Create client
data = {
    'name': 'New Client',
    'email': 'newclient@example.com',
    'mrr': 5000
}
response = requests.post(f'{base_url}/api/clients', json=data, headers=headers)
print(response.json())
```

### cURL

```bash
# List clients
curl -X GET https://api.cs360hub.com/api/clients \
  -H "Authorization: Bearer cs360_your_api_key"

# Create client
curl -X POST https://api.cs360hub.com/api/clients \
  -H "Authorization: Bearer cs360_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Client",
    "email": "newclient@example.com",
    "mrr": 5000
  }'
```

## Support

For API support, contact: api-support@cs360hub.com
