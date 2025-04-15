export interface OpenAPIPath {
    [key: string]: {
        [method: string]: OpenAPIMethodSpec;
    };
}

export interface OpenAPIMethodSpec {
    tags: string[];
    summary?: string;
    parameters?: any[];
    requestBody: {
        required: boolean,
        content: {
            [key: string]: OpenApiSpecRequest
        }
    }
    responses: {
        [statusCode: string]: OpenApiSpecResponse;
    };
}

export interface OpenApiSpecRequest {
    schema: {
        type: string,
        properties: { [key: string]: any },
        required?: string[]
    }
}
export interface OpenApiSpecResponse {
    description: string;
    content?: {
        [contentType: string]: {
        schema: any;
        };
    };
}
  
export interface OpenAPISpec {
    openapi: string;
    info: {
        title: string;
        version: string;
        description?: string;
    };
    servers: [
        {
          url: string
        }
    ],
    paths: OpenAPIPath;
}

export interface OpenApiParameter {
    name: string,
    in: string,
    required: boolean,
    schema?: {
      type?: string
    }
  }

export type OpenApiRouteParamTypes = {
    [key: string]: {                
        type: string,
        name?: string,
        description?: string,     
        required?: boolean,
        properties?: OpenApiRouteParamTypes           
    }
}

export type OpenApiRouteParamResponseType = {
    returnParams: OpenApiRouteParamTypes,
    description?: string
}

export interface IOpenApiRouteParams {
    openapi: {
        payload?: OpenApiRouteParamTypes,
        responses?: {
            [responseCode: number]: OpenApiRouteParamResponseType
        }
    }
} 

export interface IOpenApiGenerateParams {
    title: string;
    version: string;
    description?: string;
    server?: string
}