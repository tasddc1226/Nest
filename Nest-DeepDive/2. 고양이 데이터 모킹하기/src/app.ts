import * as express from "express";
import { Cat, CatType } from "./app.model";

const app: express.Express = express()
const port: number = 8000;

// 미들웨어 생성
// : app.use로 모든 라우터를 관리해주는 미들웨어를 만들기 위함
// : endpoint를 찾기 전에 수행되어야 하기 때문에 가장 끝에 있다면 수행되어지지 않음.
// : 하지만 항상 최상단에 존재하지 않아도 됨.
app.use((req, res, next) => {
	// logging을 수행하는 로직
	// 각 라우터에서 중복 수행하는 부분을 미들웨어로 추출
	console.log(req.rawHeaders[1]);

	// do somthing
	console.log('this is logging middleware');

	// 다음 라우터로 이동시키기
	next();

})

// 특정 라우터에 대한 미들웨어 생성
app.get('/cats/som', (req, res, next) => {
	// do somthing
	console.log('this is /cats/som middleware');
	next();

})

app.get('/', (req: express.Request, res: express.Response) => {
	//console.log(req.rawHeaders[1]);
	res.send({ Cats: Cat })
})

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
	//console.log(req.rawHeaders[1]);
	res.send({ blue: Cat[0] })
})

app.get('/cats/som', (req: express.Request, res: express.Response) => {
	//console.log(req.rawHeaders[1]);
	res.send({ som: Cat[1] })
})

// 요청한 endpoint를 찾지 못한 경우 동작되어지는 미들웨어
app.use((req, res, next) => {
	console.log('this is not found middleware');
	res.send({ error: "404 Not Found Error!" })
})

app.listen(port, () => {
	console.log(`app server listening on http://localhost:${port}`)
})