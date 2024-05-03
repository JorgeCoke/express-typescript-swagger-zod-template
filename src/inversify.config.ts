import { Container } from 'inversify';
import { AuthController } from './api/auth/auth.controller';
import { AuthService } from './api/auth/auth.service';
import { MonitoringController } from './api/monitoring/monitoring.controller';
import { INVERSIFY_TYPES } from './inversify.types';

const container = new Container({
  defaultScope: 'Singleton',
  autoBindInjectable: true
});
container.bind<AuthController>(INVERSIFY_TYPES.AuthController).to(AuthController);
container.bind<AuthService>(INVERSIFY_TYPES.AuthService).to(AuthService);
container.bind<MonitoringController>(INVERSIFY_TYPES.MonitoringController).to(MonitoringController);

export { container };
