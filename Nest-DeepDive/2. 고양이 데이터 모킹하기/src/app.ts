import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
	public app: express.Application

	constructor() {
		const app: express.Application = express();
		this.app = app;
	}

	// 각각의 Route에 관련된 middleware
	private setRoute() {
		this.app.use(catsRouter);
	}

	private setMiddleware() {

		// * logging middleware
		this.app.use((req, res, next) => {
			console.log('this is logging middleware');
			next();
		})

		// * req의 body에 있는 json 객체를 읽을 수 있도록 하는 json middleware
		this.app.use(express.json());

		this.setRoute();

		// 404 middleware
		this.app.use((req, res, next) => {
			console.log('this is error middleware');
			res.send({ error: "404 Not Found Error!" })
		})
	}

	public listen() {
		// setting middleware
		this.setMiddleware();
		const port: number = 8000;
		this.app.listen(port, () => {
			console.log(`app server listening on http://localhost:${port}`)
		})
	}
}

function init() {
	// Server 싱글톤 인스턴스 생성
	const server = new Server();
	server.listen();
}

init();



