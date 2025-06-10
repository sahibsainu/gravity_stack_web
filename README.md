# gravitystack

Add .env file with below content 

```bash

VITE_SUPABASE_URL=''
VITE_SUPABASE_ANON_KEY=''
LOGIN_URL=https://keystone.openstack.svc.cluster.local/v3
COMPUTE_URL=https://nova.openstack.svc.cluster.local/v2
GRAVITY_USERNAME=admin
GRAVITY_PASSWORD=''
GRAVITY_PROJECT_ID=''

```


Need below ingress config in nginx


for Keystone:

```bash

    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
    nginx.ingress.kubernetes.io/cors-allow-headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization
    nginx.ingress.kubernetes.io/cors-allow-methods: PUT, GET, POST, OPTIONS, DELETE,PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: '*'
    nginx.ingress.kubernetes.io/cors-expose-headers: X
```
and for others 

```bash
    nginx.ingress.kubernetes.io/cors-allow-credentials: "true"
    nginx.ingress.kubernetes.io/cors-allow-headers: X-Auth-Token, Authorization, Content-Type,X-Requested-With
    nginx.ingress.kubernetes.io/cors-allow-methods: GET, POST, PUT, DELETE, OPTIONS,PATCH
    nginx.ingress.kubernetes.io/cors-allow-origin: '*'
    nginx.ingress.kubernetes.io/enable-cors: "true"
```

# gravitystack
# gravitystack
