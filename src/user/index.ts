import { dataSource } from '@src/database';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { User } from '@user/entity/user.entity';
import { PasswordUtils } from '@common/utils/password.utils';

const repository = dataSource.getRepository(User);
export const userService = new UserService(repository, new PasswordUtils());
export const userController = new UserController(userService);
