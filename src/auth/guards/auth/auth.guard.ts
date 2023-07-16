import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from 'src/auth/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}
  
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const [prefix, token] = request.headers.authorization?.split(' ');

    if (!token) {
      throw new UnauthorizedException;
    }

    return this.firebaseService.verifyToken(token);
  }
}
