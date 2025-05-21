import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { Model, Types } from 'mongoose';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from 'src/utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  public async register(userBody: RegisterAuthDto) {
    const { password, ...user } = userBody;
    const userParse = { ...user, password: await generateHash(password) };
    return this.UserModel.create(userParse);
  }

  public async login(userLoginBody: LoginAuthDto) {
    const userExist = await this.UserModel.findOne({
      email: userLoginBody.email,
    });

    const { password } = userLoginBody;
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isChech = await compareHash(password, userExist.password);
    if (!isChech)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject() as {
      _id: Types.ObjectId;
      password?: string;
      [key: string]: any;
    };
    delete userFlat.password;

    const payload = {
      id: userFlat._id.toString(),
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token: token,
      user: userFlat,
    };

    return data;
  }
}
