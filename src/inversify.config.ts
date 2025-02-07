import { Container } from "inversify";

// Create an IoC Container for Dependency Injection with Inversify
const container = new Container({
	defaultScope: "Singleton",
	autoBindInjectable: true,
});

export { container };
