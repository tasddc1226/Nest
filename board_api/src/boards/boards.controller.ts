import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private BoardsService: BoardsService) { }

    @Get()
    getAllboard(): Board[] {
        return this.BoardsService.getAllBoards();
    }

}
