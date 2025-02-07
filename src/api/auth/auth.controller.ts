import { inject, injectable } from "inversify";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { Controller } from "../../shared/controller";
import { AuthService } from "./auth.service";
import {
	PostLogInBodyDto,
	PostLogInResponseDto,
	PostSignUpBodyDto,
	PostSignUpResponseDto,
} from "./auth.types";

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
					tag: this.routerPath,
					summary: "Log-in user",
					description: "Log-in into the service with user credentials",
					body: PostLogInBodyDto,
					response: PostLogInResponseDto,
				},
				async (_req, _res) => this.authService.logIn(_req.body),
			),
		);
		this.router.post(
			"/sign-up",
			openAPIRoute(
				{
					tag: this.routerPath,
					summary: "Sign-up new user",
					description: "Create a new user",
					body: PostSignUpBodyDto,
					response: PostSignUpResponseDto,
				},
				async (_req, _res) => this.authService.signUp(_req.body),
			),
		);
	}
}
