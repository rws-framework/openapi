# @rws-framework/openapi

OpenAPI 3.0 spec generator for RWS (NestJS-based) backends.

---

## Setup

Register the module in your NestJS app:

```typescript
import { RWSOpenApiModule } from '@rws-framework/openapi';

@Module({
  imports: [RWSOpenApiModule],
})
export class AppModule {}
```

Expose a docs endpoint using `RWSOpenApiService.generateOpenAPI()`.

---

## Annotating routes

Routes are annotated via the `plugins.openapi` field on each `IHTTProute` definition.

### Basic example

```typescript
{
  method: 'get',
  path: '/users',
  name: 'user.list',
  plugins: {
    openapi: {
      description: 'List all users',
      responses: {
        '200': {
          description: 'User list',
          returnParams: {
            data: { type: 'array', items: { type: 'object' } }
          }
        }
      }
    }
  }
}
```

---

## Payload (request body)

Use `payload` to describe the request body for `POST`, `PUT`, `PATCH` methods.

Each field is an entry of `OpenApiRouteParamTypes`. Set `required: true` to mark a field as required in the schema.

```typescript
plugins: {
  openapi: {
    payload: {
      name:  { type: 'string', description: 'User name', required: true },
      email: { type: 'string', format: 'email', required: true },
      role:  { type: 'string', enum: ['admin', 'user'], required: false },
      notes: { type: 'string' }  // optional — omit required or set false
    }
  }
}
```

Pass a raw schema directly via the `body` key:

```typescript
plugins: {
  openapi: {
    payload: {
      body: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id']
      }
    }
  }
}
```

---

## Query parameters

Use `queryParams` to describe URL query string parameters (`?key=value`).  
Set `required: true` for mandatory params; omit or set `false` for optional ones.

```typescript
plugins: {
  openapi: {
    queryParams: {
      page:   { type: 'integer', description: 'Page number', required: false },
      limit:  { type: 'integer', description: 'Items per page', required: false },
      status: { type: 'string', enum: ['active', 'inactive'], required: false },
      search: { type: 'string', description: 'Search query' }  // optional by default
    }
  }
}
```

---

## Route parameters

Path parameters (e.g. `/users/:id`) are detected automatically from the route path.  
Use `routeParams` to override their type, description, or `required` flag (defaults to `true`).

```typescript
// Route path: /users/:id/posts/:postId
plugins: {
  openapi: {
    routeParams: {
      id:     { type: 'string', description: 'User UUID', required: true },
      postId: { type: 'integer', description: 'Post ID (optional override)', required: false }
    }
  }
}
```

---

## Responses

```typescript
plugins: {
  openapi: {
    responses: {
      '200': {
        description: 'Success',
        returnParams: {
          data:    { type: 'object' },
          success: { type: 'boolean' }
        }
      },
      '404': {
        description: 'Not found'
      }
    }
  }
}
```

Or use `content` for full control:

```typescript
responses: {
  '200': {
    description: 'File download',
    content: {
      'application/octet-stream': {
        schema: { type: 'string', format: 'binary' }
      }
    }
  }
}
```

---

## Type reference

| Field | Type | Description |
|---|---|---|
| `payload` | `OpenApiRouteParamTypes` | Request body fields. Set `required: true` per field to mark as required. |
| `queryParams` | `{ [name]: OpenApiQueryParamDef }` | Query string params. `required` defaults to `false`. |
| `routeParams` | `{ [name]: OpenApiRouteParamDef }` | Path param overrides. `required` defaults to `true`. |
| `responses` | `{ [code]: OpenApiRouteParamResponseType }` | Response definitions per status code. |
| `description` | `string` | Operation description. |


AI tools for Realtime Web Suit