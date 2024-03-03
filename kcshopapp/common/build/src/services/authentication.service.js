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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Express already has a crypto package installed
const crypto_1 = require("crypto");
const util_1 = require("util");
const scryptAsync = (0, util_1.promisify)(crypto_1.scrypt);
class AuthenticationService {
    generateJwt(payload, JWT_KEY) {
        return jsonwebtoken_1.default.sign(payload, JWT_KEY);
    }
    // This will return a hash from the password
    // the buffer will be generated with the async package
    pwdToHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = (0, crypto_1.randomBytes)(8).toString('hex');
            const buf = (yield scryptAsync(password, salt, 64));
            return `${buf.toString('hex')}.${salt}`;
        });
    }
    pwdCompare(storedPassword, suppliedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hashedPassword, salt] = storedPassword.split('.');
            const buf = (yield scryptAsync(suppliedPassword, salt, 64));
            // compare the hashedPassword with the storedPassword
            return buf.toString('hex') === hashedPassword;
        });
    }
    verifyJwt(jwtToken, JWT_KEY) {
        return jsonwebtoken_1.default.verify(jwtToken, JWT_KEY);
    }
}
exports.AuthenticationService = AuthenticationService;
