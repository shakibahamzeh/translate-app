type RequestBody = object | null
type Params = object | undefined
type reqId = string

interface Request {
    method ?: "get" | "post" | "put" |"delete" | "patch"
    url : string
    reqObj ?: RequestBody
    params ?: Params
    contentType ?: "application/json" | "multipart/form-data",
    baseRoute ?: "root" | "chat"
}

interface ReqApi {
    params ?: object,
    body ?: object
}

interface Response {
    type : boolean;
    message : string;
    data : any;
}

export type { Request, Response, RequestBody, Params, ReqApi, reqId }