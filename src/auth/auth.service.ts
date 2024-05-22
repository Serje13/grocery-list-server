import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserService } from '../user/user.service';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private userservice: UserService,
    ) {}

    async signupLocal(dto: AuthDto): Promise<Tokens> {
        const hash = await argon.hash(dto.password);
        const user = await this.userservice.create(dto, hash);
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens;
    }

    async signinLocal(dto: AuthDto): Promise<Tokens> {
        const user = await this.userservice.findOne(dto);

        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await argon.verify(user.hash, dto.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return {...tokens, userId: user.id};
    }

    async logout(userId: number): Promise<boolean> {
        await this.userservice.updateManyItems(userId);
        return true;
    }

    async refreshTokens(userId: number, rt: string): Promise<Tokens> {
        const user = await this.userservice.findOneById(userId);
        if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches) throw new ForbiddenException('Access Denied');

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return {...tokens, userId: user.id};
    }

    async updateRtHash(userId: number, rt: string): Promise<void> {
        const hash = await argon.hash(rt);
        await this.userservice.update(userId, hash);
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const jwtPayload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
            secret: this.config.get<string>('AT_SECRET'),
            expiresIn: '60m',
        }),
        this.jwtService.signAsync(jwtPayload, {
            secret: this.config.get<string>('RT_SECRET'),
            expiresIn: '7d',
        }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
            userId
        };
    }
}
