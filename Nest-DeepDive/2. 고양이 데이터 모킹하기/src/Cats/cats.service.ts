import { Request, Response } from "express";
import { Cat, CatType } from "./cats.model";

//** Create & Read */
// * READ 모든 고양이 Data 조회
export const readAllcats = (req: Request, res: Response) => {
	try {
		// error 강제 발생
		//throw new Error("DB connect error!");

		const cats = Cat;
		res.status(200).send({
			success: true,
			data: {
				cats,
			}
		})
	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}

// * READ 특정 고양이 Data 조회
export const readCat = (req: Request, res: Response) => {
	try {
		const params = req.params;
		console.log(params);
		const cat = Cat.find((cat) => {
			return cat.id === params.id;
		});
		if (cat) {
			res.status(200).send({
				success: true,
				data: {
					cat,
				}
			})
		} else {
			throw new Error(`Not found with cats id ${params.id}!`);
		}
	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}

// * CREATE 새로운 고양이 추가 api
export const createCat = (req: Request, res: Response) => {
	try {
		const data = req.body;
		console.log(data);

		Cat.push(data);
		res.status(200).send({
			success: true,
			data: { data },
		})

	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}

//** UPDATE * DELETE */
// * UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
	try {
		const params = req.params;
		const body = req.body;
		let result;
		Cat.forEach((cat) => {
			if (cat.id === params.id) {
				cat = body;
				result = cat;
			}
		})
		if (result) {
			res.status(200).send({
				success: true,
				data: {
					result,
				}
			})
		}
	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}

// * UPDATE 고양이 데이터를 부분적으로 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
	try {
		const params = req.params;
		const body = req.body;
		let result;
		Cat.forEach((cat) => {
			if (cat.id === params.id) {
				// 구조분해 할당으로 부분적으로 Data update
				cat = { ...cat, ...body }; // 중복된 key에 대한 내용만 수정
				result = cat;
			}
		})
		if (result) {
			res.status(200).send({
				success: true,
				data: {
					result,
				}
			})
		}
	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}

// * DELETE 고양이 데이터를 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
	try {
		const params = req.params;
		// 기존에 존재하던 cat을 순회하면서, params로 온 id랑 같지 않은 경우만 새로운 Cat에 대한 data만 return
		const newCat = Cat.filter((cat) => cat.id !== params.id);

		if (newCat) {
			res.status(200).send({
				success: true,
				data: {
					newCat,
				}
			})
		}
	} catch (error: any) {
		res.status(400).send({
			success: false,
			error: error.message,
		})
	}
}
