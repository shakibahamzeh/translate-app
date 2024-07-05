// <import handler
import axios,{ AxiosResponse } from "axios";
import requestModel from "./apiHandlers";
// import handler>
import { Request } from "@/types/services.types";
interface TranslateParams {
  [key: string]: any;
}

interface TranslateRequest {
  params: TranslateParams;
}
class Translate {
  private requestObj: Request;
  private url: string;
    constructor(requestObj : Request) {
        this.requestObj = requestObj;
        this.url = "get";
    }

    async getTranslate({ params }: TranslateRequest): Promise<AxiosResponse<any>> {

        const apiObj = {
            url : this.url,
            params
        };

        return await requestModel.response(apiObj);
    };

};

export default Translate;

