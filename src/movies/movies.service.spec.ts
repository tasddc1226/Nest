import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// jest라는 도구를 사용하여 실시간으로 유닛 테스트가 가능함
// >> npm run test:watch

describe('MoviesService', () => {
  let service: MoviesService;
  
  // 테스트를 수행하기 전에 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // it : individual test.. 개별 테스트
  it('should be defined', () => {
    expect(service).toBeDefined(); // MovieService가 정의 되어 있어야 함.
  });

  it('should be 4', () => {
    expect(2+3).toEqual(5); // 2 + 2가 4와 같기를 기대한다는 의미.
  })
});
