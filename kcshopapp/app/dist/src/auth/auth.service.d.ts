import { UserService } from './user/user.service';
import { AuthDto } from './dtos/auth.dto';
import { NextFunction } from 'express';
import { AuthenticationService } from '@kcshopapp/common';
export declare class AuthService {
    userService: UserService;
    authenticationService: AuthenticationService;
    constructor(userService: UserService, authenticationService: AuthenticationService);
    signup(createUserDto: AuthDto, errCallback: NextFunction): Promise<any>;
    signin(signinDto: AuthDto, errCallback: NextFunction): Promise<any>;
}
export declare const authService: AuthService;
