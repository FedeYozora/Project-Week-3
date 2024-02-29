"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const environment_1 = require("src/environments/environment");
const rxjs_1 = require("rxjs");
const angular_jwt_1 = require("@auth0/angular-jwt");
let AuthService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        constructor(http, router) {
            this.http = http;
            this.router = router;
            this.jwtHelper = new angular_jwt_1.JwtHelperService();
            this.apiURL = environment_1.environment.apiURL;
            this.authSubj = new rxjs_1.BehaviorSubject(null);
            this.user$ = this.authSubj.asObservable();
        }
        login(data) {
            return this.http.post(`${this.apiURL}/login`, data).pipe((0, rxjs_1.tap)((loggato) => {
                this.authSubj.next(loggato);
                this.utente = loggato;
                localStorage.setItem('user', JSON.stringify(loggato));
                this.router.navigate(['/']);
            }), (0, rxjs_1.catchError)(this.errors));
        }
        restore() {
            const user = localStorage.getItem('user');
            if (!user) {
                this.router.navigate(['login']);
                return;
            }
            const userData = JSON.parse(user);
            if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
                this.router.navigate(['login']);
                return;
            }
            this.authSubj.next(userData);
            this.router.navigate(['/']);
        }
        register(data) {
            return this.http.post(`${this.apiURL}/register`, data).pipe((0, rxjs_1.tap)(() => {
                this.router.navigate(['login']), (0, rxjs_1.catchError)(this.errors);
            }));
        }
        updateUserInfo(updatedInfo, id) {
            return this.http.put(`${this.apiURL}/users/${id}`, updatedInfo).pipe((0, rxjs_1.tap)(() => {
                this.utente = Object.assign(Object.assign({}, this.utente), updatedInfo);
            }), (0, rxjs_1.catchError)(this.errors));
        }
        logout() {
            this.authSubj.next(null);
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        }
        errors(err) {
            switch (err.error) {
                case 'Email already exists':
                    return (0, rxjs_1.throwError)('Email già registrata');
                    break;
                case 'Email format is invalid':
                    return (0, rxjs_1.throwError)('Formato mail non valido');
                    break;
                case 'Cannot find user':
                    return (0, rxjs_1.throwError)('Utente inesistente');
                    break;
                default:
                    return (0, rxjs_1.throwError)('Errore nella chiamata');
                    break;
            }
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
