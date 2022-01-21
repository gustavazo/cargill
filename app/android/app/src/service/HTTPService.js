import axios from "axios";
import config from "../service/config";

class HTTPService {
    constructor(model) {
        this.api = axios.create();
        this.setDefaultBaseUrl();
        this.http = axios.create();
        this.http.defaults.baseURL = config.backendUrl;
    }

    setDefaultHeader(header, value) {
        this.api.defaults.headers.common[header] = value;
    }

    setDefaultBaseUrl(url = "") {
        this.api.defaults.baseURL = config.backendUrl + url + "/";
    }

};

export default HTTPService;