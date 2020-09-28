import { HttpRequest, HttpResponse } from './https'

export interface IController{
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
