import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RWSOpenApiService } from '../services/RWSOpenApiService';
import { DiscoveryService } from '@nestjs/core';

@Module({    
    providers: [
        DiscoveryService,
        ConfigService,
        RWSOpenApiService
    ],
    exports: [
        RWSOpenApiService
    ]
  })
export class RWSOpenApiModule {}
