export class User {
    constructor(public email: string,
        public id: string,
        private _tokenId: string,
        private _expiration: Date) { }

    get token() {
        if (!this._expiration || new Date() > this._expiration) {
            return null
        }
        return this._tokenId;
    }
}
