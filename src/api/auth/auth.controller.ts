import { Router } from "express";
import { inject, injectable } from "inversify";
import { INVERSIFY_TYPES } from "../../inversify.types";
import { openAPIRoute } from "../../lib/zod-openapi/zod-openapi-route";
import { Injectable } from "../../shared/injectable";
import type { AuthService } from "./auth.service";
import {
	PostLogInBodyDto,
	PostLogInResponseDto,
	PostSignUpBodyDto,
	PostSignUpResponseDto,
} from "./auth.types";

@injectable()
export class AuthController extends Injectable {
	private authService: AuthService;
	public router: Router = Router();
	public routerPath = "/auth";

	constructor(@inject(INVERSIFY_TYPES.AuthService) _authService: AuthService) {
		super();
		this.authService = _authService;
		this.mountRoutes();
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
