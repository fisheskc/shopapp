import { UserModel } from '@kcshopapp/common';
import { AuthDto } from '../dtos/auth.dto';
export declare class UserService {
    userModel: UserModel;
    constructor(userModel: UserModel);
    create(createUserDto: AuthDto): Promise<any>;
    findOneByEmail(email: string): Promise<any>;
}
export declare const userService: UserService;
