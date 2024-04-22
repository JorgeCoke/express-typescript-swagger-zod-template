import { Container } from 'inversify';
import { AuthController } from './api/auth/auth.controller';
import { AuthRouter } from './api/auth/auth.router';
import { AuthService } from './api/auth/auth.service';
import { MonitoringRouter } from './api/monitoring/monitoring.router';
import { UsersRepository } from './api/users/users.repository';
import { INVERSIFY_TYPES } from './inversify.types';

const container = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true
});
container.bind<AuthRouter>(INVERSIFY_TYPES.AuthRouter).to(AuthRouter);
container.bind<AuthController>(INVERSIFY_TYPES.AuthController).to(AuthController);
container.bind<AuthService>(INVERSIFY_TYPES.AuthService).to(AuthService);
container.bind<UsersRepository>(INVERSIFY_TYPES.UsersRepository).to(UsersRepository);
container.bind<MonitoringRouter>(INVERSIFY_TYPES.MonitoringRouter).to(MonitoringRouter);

export { container };
