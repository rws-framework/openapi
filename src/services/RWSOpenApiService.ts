import { EmbeddingsInterface } from '@langchain/core/embeddings';
import { Injectable } from '@rws-framework/server/nest';  
import { RWSConfigService } from '@rws-framework/server';  
import { IHTTProute, IPrefixedHTTProutes } from '@rws-framework/server/src/routing/routes';  
import { DiscoveryService } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { OpenAPISpec, OpenAPIPath, OpenApiParameter } from '../types/openapi';

@Injectable()
export class RWSOpenApiService
{
    constructor(private configService: RWSConfigService){}

    private getRWSRoutes(): IPrefixedHTTProutes[]
    {
        return this.configService.get('http_routes');
    }
 
    generateOpenAPI(): OpenAPISpec {
      const routes = this.getRWSRoutes();
      
      const openApiSpec: OpenAPISpec = {
        openapi: "3.0.0",
        info: {
          title: "RWS API Documentation",
          version: "1.0.0",
          description: "API documentation generated from RWS routes"
        },
        paths: {}
      };
  
      // Process each prefixed route group
      if (Array.isArray(routes)) {
        routes.forEach((prefixedRoute: IPrefixedHTTProutes) => {
          const { prefix, controllerName, routes: subRoutes } = prefixedRoute;
          
          // Process each route in the group
          subRoutes.forEach((route: IHTTProute) => {
            const fullPath = `${prefix}${route.path}`;
            const method = route.method.toLowerCase();
  
            // Create path if it doesn't exist
            if (!openApiSpec.paths[fullPath]) {
              openApiSpec.paths[fullPath] = {};
            }
  
            // Add method specification
            openApiSpec.paths[fullPath][method] = {
              tags: [controllerName],
              summary: route.name,
              responses: {
                '200': {
                  description: 'Successful operation',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object'
                      }
                    }
                  }
                }
              }
            };
  
            // Add parameters if route has them and they're not explicitly disabled
            if (!route.noParams) {
              const parameters: OpenApiParameter[] = [];
              
              // Extract path parameters
              const pathParams = route.path.match(/\{(\w+)\}/g);
              if (pathParams) {
                pathParams.forEach(param => {
                  const paramName = param.replace(/[{}]/g, '');
                  parameters.push({
                    name: paramName,
                    in: 'path',
                    required: true,
                    schema: {
                      type: 'string'
                    }
                  });
                });
              }
  
              // // Add route options if they exist
              // if (route.options) {
              //   // Add query parameters if defined in options
              //   if (route.options.queryParams) {
              //     Object.entries(route.options.queryParams).forEach(([paramName, paramConfig]) => {
              //       parameters.push({
              //         name: paramName,
              //         in: 'query',
              //         required: false,
              //         schema: {
              //           type: 'string' // You might want to make this dynamic based on paramConfig
              //         }
              //       });
              //     });
              //   }
              // }
  
              if (parameters.length > 0) {
                openApiSpec.paths[fullPath][method].parameters = parameters;
              }
            }
          });
        });
      }
  
      return openApiSpec;
    }
}