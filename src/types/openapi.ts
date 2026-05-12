export interface OpenAPIPath {
    [key: string]: {
        [method: string]: OpenAPIMethodSpec;
    };
}

export interface OpenAPIMethodSpec {
    tags: string[];
    summary?: string;
    parameters?: any[];
    description?: string;
    requestBody?: {
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
        type?: string,
        properties?: { [key: string]: any },
        required?: string[],
        items?: any,
        oneOf?: any[],
        enum?: any[],
        format?: string
    } | any
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
    description?: string,
    schema?: {
      type?: string,
      enum?: any[],
      format?: string
    }
  }

export type OpenApiQueryParamDef = {
    type?: string,
    description?: string,
    required?: boolean,
    enum?: any[],
    format?: string
}

export type OpenApiRouteParamDef = {
    type?: string,
    description?: string,
    required?: boolean
}

export type OpenApiRouteParamTypes = {
    [key: string]: {
        type?: string,
        name?: string,
        description?: string,
        required?: boolean,
        properties?: OpenApiRouteParamTypes,
        items?: any,
        oneOf?: any[],
        enum?: any[],
        format?: string
    } | any
}

export type OpenApiRouteParamResponseType = {
    returnParams?: OpenApiRouteParamTypes,
    description?: string,
    content?: {
        [contentType: string]: {
            description?: string,
            schema?: any,
            examples?: any
        }
    }
}

export interface IOpenApiRouteParams {
    openapi: {
        payload?: OpenApiRouteParamTypes | {
            body?: any;
            [key: string]: any;
        },
        description?: string,
        queryParams?: { [key: string]: OpenApiQueryParamDef },
        routeParams?: { [key: string]: OpenApiRouteParamDef },
        responses?: {
            [responseCode: string]: OpenApiRouteParamResponseType
        }
    }
} 

export interface IOpenApiGenerateParams {
    title: string;
    version: string;
    description?: string;
    server?: string
}