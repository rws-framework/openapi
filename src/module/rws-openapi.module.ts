import { Module } from '@nestjs/common';
import { RWSConfigService } from '@rws-framework/server';
import { RWSOpenApiService } from '../services/RWSOpenApiService';
import { DiscoveryService } from '@nestjs/core';

@Module({    
    providers: [
        DiscoveryService,
        RWSConfigService,
        RWSOpenApiService
    ],
    exports: [
        RWSOpenApiService
    ]
  })
export class RWSOpenApiModule {}
