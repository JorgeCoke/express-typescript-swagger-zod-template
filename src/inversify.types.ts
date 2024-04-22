const INVERSIFY_TYPES = {
  AuthRouter: Symbol.for('AuthRouter'),
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  UsersRepository: Symbol.for('UsersRepository'),
  MonitoringRouter: Symbol.for('MonitoringRouter')
};

export { INVERSIFY_TYPES };
