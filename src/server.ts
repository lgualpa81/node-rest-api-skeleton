
import express from "express"
import cors from 'cors'
import logger from 'morgan'

import { dbConnect } from "./config/mongo"
import { router } from "./routes"


class Server {
  public app: express.Application

  constructor() {
    this.app = express()

    this.config()
    this.connectDataBase()
    this.routes()
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 8000)

    //middlewares
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(logger('dev'));
  }

  async connectDataBase(): Promise<void> {
    await dbConnect();
  }

  public routes(): void {
    this.app.use(router);
  }

  public start(): void {
    const port: number = this.app.get('port')
    this.app.listen(port, () => {
      port
        ? console.log('Server is listening on port', this.app.get('port'))
        : console.log('Failed connection with server, please contact with administrator')
    });
  }
}

export { Server }