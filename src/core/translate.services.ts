import requestModel from "./apiHandlers";
import { ReqApi, Request } from "../types/services.types";

class Translate {
  url: string;

  constructor() {
    this.url = "get";
  }

  async getTranslate({ params }: ReqApi) {
    const apiObj: Request = {
      url: this.url,
      method: "get", 
      params,       
      contentType: "application/json"
    };

    return await requestModel.response(apiObj);
  }
}

export default Translate;
