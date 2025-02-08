import { inject, injectable } from "inversify";
import { Controller } from "../../lib/models/classes/controller";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { PostLogInDto, PostSignUpDto } from "./auth.dtos";
import { AuthService } from "./auth.service";

@injectable()
export class AuthController extends Controller {
	readonly routerPath = "/auth";

	constructor(@inject(AuthService) private readonly authService: AuthService) {
		super();
	}

	public mountRoutes() {
		this.router.post(
			"/log-in",
			openAPIRoute(
				{
					summary: "Log-in user",
					description: "Log-in into the service with user credentials",
					...PostLogInDto,
				},
				async (req) => this.authService.logIn(req.body),
			),
		);
		this.router.post(
			"/sign-up",
			openAPIRoute(
				{
					summary: "Sign-up new user",
					description: "Create a new user",
					...PostSignUpDto,
				},
				async (req) => this.authService.signUp(req.body),
			),
		);
	}
}
