import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class RequestLogMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const start = Date.now();
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const elapsed = Date.now() - start;
      const { statusCode } = response;

      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${elapsed}ms`);
    });

    next();
  }
}
