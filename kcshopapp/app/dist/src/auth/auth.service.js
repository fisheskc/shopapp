"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const user_service_1 = require("./user/user.service");
// import { BadRequestError,  AuthenticationService} from '@kcshopapp/common/build/src/errors/bad-request-error'
const common_1 = require("@kcshopapp/common");
// when saving user into the DB, the password for that user has been hashed
class AuthService {
    constructor(userService, authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }
    signup(createUserDto, errCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userService.findOneByEmail(createUserDto.email);
            if (existingUser)
                return errCallback(new common_1.BadRequestError('this email is taken'));
            const newUser = yield this.userService.create(createUserDto);
            const jwt = this.authenticationService.generateJwT({ email: createUserDto.email, userId: newUser.id }, process.env.JWT_KEY);
            return jwt;
        });
    }
    signin(signinDto, errCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findOneByEmail(signinDto.email);
            if (!user)
                return errCallback(new common_1.BadRequestError('Wrong credientials'));
            const samePwd = this.authenticationService.pwdCompare(user.password, signinDto.password);
            if (!samePwd)
                return errCallback(new common_1.BadRequestError('Wrong credientials'));
            // payload from the user.email & user from the user.id
            const jwt = this.authenticationService.generateJwT({ email: user.email, userId: user.id }, process.env.JWT_KEY);
            return jwt;
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService(user_service_1.userService, new common_1.AuthenticationService());
