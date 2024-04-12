import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "~config/env.config";
import { UserEntity } from "~users/entities/user.entity";
// import { UserService } from "~users/services/user.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
    // constructor(private userService: UserService) {
    //     super({
    //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //         ignoreExpiration: false,
    //         secretOrKey: env.JWT.SECRET
    //     });
    // }

    // async validate(payload: { id: string }): Promise<UserEntity> {
    //     const user = await this.userService.findByIdNotFail(payload.id);
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }
}