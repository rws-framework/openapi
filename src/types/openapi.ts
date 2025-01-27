export interface OpenAPIPath {
    [key: string]: {
        [method: string]: {
        tags: string[];
        summary?: string;
        parameters?: any[];
        responses: {
            [statusCode: string]: {
            description: string;
            content?: {
                [contentType: string]: {
                schema: any;
                };
            };
            };
        };
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