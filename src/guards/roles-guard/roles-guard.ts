import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );

    const req = context.getArgByIndex(0);
    const user = req.user as { roles: string[] };
    const { roles } = user;

    const isAllow =
      Array.isArray(getRolMeta) &&
      roles.some((rol) => getRolMeta.includes(rol));
    return isAllow;
  }
}
