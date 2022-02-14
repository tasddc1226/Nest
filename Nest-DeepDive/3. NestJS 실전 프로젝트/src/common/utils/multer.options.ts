
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {

	try {
		console.log('💾 Create a root uploads folder...');
		fs.mkdirSync(path.join(__dirname, '..', `uploads`));
	} catch (error) {
		console.log('The folder already exists...');
	}

	try {
		console.log(`💾 Create a ${folder} uploads folder...`);
		fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
	} catch (error) {
		console.log(`The ${folder} folder already exists...`);
	}
};


// 폴더명을 인자로 받아와서 createFolder를 통해 upload 폴더에 새로운 폴더를 만든다
const storage = (folder: string): multer.StorageEngine => {

	createFolder(folder);
	return multer.diskStorage({
		destination(req, file, cb) {
			//* 어디에 저장할 지
			const folderName = path.join(__dirname, '..', `uploads/${folder}`);
			cb(null, folderName);
		},

		filename(req, file, cb) {
			//* 어떤 이름으로 올릴 지
			const ext = path.extname(file.originalname); // 확장자 추출

			const fileName = `${path.basename(
				file.originalname,
				ext,
			)}${Date.now()}${ext}`; // 파일업로드 시 시각을 찍어서 filename을 만든다
			cb(null, fileName);
		},
	});
};


// multer 모듈의 2번째 인자에 대한 options
export const multerOptions = (folder: string) => { // upload 폴더안에 폴더를 추가

	const result: MulterOptions = {
		storage: storage(folder),
	};
	return result;

};