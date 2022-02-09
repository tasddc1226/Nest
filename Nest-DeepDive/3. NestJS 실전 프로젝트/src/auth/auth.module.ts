import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    // Jwt token을 만들어줌!
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),

    // CatsModule, // 모듈 자체를 import 시켜서 exports된 내용을 사용하기 위함 -> 순환 참조 발생!
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
