import * as express from "express";

// app은 express의 인스턴스 즉, server
const app: express.Express = express()
const port: number = 8000;

app.get('/', (req: express.Request, res: express.Response) => {
	console.log(req); // req는 요청에 대한 정보를 담고 있음
	res.send({ hello: 'world' })
})

app.post('/', (req: express.Request, res: express.Response) => {
	console.log(req); // req는 요청에 대한 정보를 담고 있음
	res.send({ person: 'yang' })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})