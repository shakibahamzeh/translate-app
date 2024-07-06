// <import handler
import requestModel from "./apiHandlers";
// import handler>

// <import types
import { ReqApi, Request } from "../types/services.types";
// import types>

class Translate {

    url: string;

    constructor() {
        this.url = "get";
    }

    async getTranslate({params} : ReqApi) {

        const apiObj : Request = {
            url : this.url ,
            params
        };

        return await requestModel.response(apiObj);
    };


};

export default Translate;