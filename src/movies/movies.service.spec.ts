import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// jest라는 도구를 사용하여 실시간으로 유닛 테스트가 가능함
// >> npm run test:watch

// 테스트 커버리지 확인
// >> npm run test:con

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

  // Unit Test : getAll()
  describe("getAll", () => {
    // 테스트 할 내용
    it("should return an array", () => {
      // Call getAll Func.
      const result = service.getAll();
      // getAll 함수가 배열을 리턴하는지 안하는지에 대한 test
      expect(result).toBeInstanceOf(Array);
    })
  })

  // 결과
  // MoviesService
  //   ✓ should be defined (20 ms)
  //   getAll
  //     ✓ should return an array (4 ms)

  // Test Suites: 1 passed, 1 total
  // Tests:       2 passed, 2 total

  // Unit Test : getOne()
  describe("getOne", () => {
  
    it("should find a movie", () => {
      // 임의의 더미 영화를 create 한다.
      service.create({
        title:"Test Movie",
        genres: ["test"],
        year: 2000,
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined(); // movie가 정의되어있어야 하고
      expect(movie.id).toEqual(1); // 해당 id 값이 1이어야 한다.
    });

    // error 가 정상적으로 발생하는지에 대한 여부 확인
    it("should throw 404 error", () => {
      try{
        service.getOne(999); // 없는 movie.id 값
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID: 999 not found.");
      }
    })
  });

});
