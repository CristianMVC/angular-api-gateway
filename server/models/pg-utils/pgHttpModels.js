export class pgResponse {
    /**
     *
     * @param {Number} status
     * @param {Object} headers
     * @param {String} body
     */
    constructor(status, headers, body) {
        this._status = status
        this._headers = headers
        this._body = body
    }
    get status() {
        return this._status
    }
    get headers() {
        return this._headers ? this._headers : {}
    }
    get body() {
        return this._body ? this._body : ''
    }
}


export class pgRequest {
    /**
     *
     * @param {Object} headers
     * @param {Object} query
     * @param {String} body
     * @param {String} method
     * @param {String} endpoint
     */
    constructor(headers, query, body, method, endpoint = '') {
        this._headers = headers
        this._query = query
        this._body = body
        this._endpoint = endpoint
        this._method = method
    }
    get headers() {
        return this._headers ? this._headers : {}
    }
    get body() {
        return this._body ? this._body : ''
    }
    get query() {
        return this._query ? this._query : {}
    }
    get endpoint() {
        return this._endpoint ? this._endpoint : ''
    }
    get method() {
        return this._method ? this._method : ''
    }
}