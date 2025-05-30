import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.getArgByIndex(0);
    const userAgent = req.headers['user-agent'];

    const isAllow = userAgent !== 'google/chrome';

    if (!isAllow)
      throw new HttpException('BROWSER_AGENT_INVALID', HttpStatus.BAD_REQUEST);

    return isAllow;
  }
}

// Este Guard se encarga de verificar el navegador desde el cual se hace la petición.
// Puede utilizarse para restringir ciertas acciones o rutas a navegadores específicos (por ejemplo, solo permitir accesos desde Firefox o Chrome).
// La información del navegador se puede obtener desde `req.headers`, lo que permite establecer condiciones personalizadas.
// Por ahora no está en uso, pero podría aplicarse, por ejemplo, para permitir la inserción de cursos únicamente desde navegadores específicos.
