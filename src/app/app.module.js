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
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const token_interceptor_1 = require("./auth/token.interceptor");
const app_component_1 = require("./app.component");
const home_component_1 = require("./components/home/home.component");
const navbar_component_1 = require("./components/navbar/navbar.component");
const edit_component_1 = require("./components/edit/edit.component");
const new_component_1 = require("./components/new/new.component");
const details_component_1 = require("./components/details/details.component");
const login_component_1 = require("./auth/login/login.component");
const register_component_1 = require("./auth/register/register.component");
const auth_guard_1 = require("./auth/auth.guard");
const profile_component_1 = require("./components/profile/profile.component");
const edit_profile_component_1 = require("./components/edit-profile/edit-profile.component");
const admin_component_1 = require("./components/admin/admin.component");
const routes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'create', component: new_component_1.NewComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'edit/:id', component: edit_component_1.EditComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'details/:id',
        component: details_component_1.DetailsComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    {
        path: 'editProfile/:id',
        component: edit_profile_component_1.EditProfileComponent,
        canActivate: [auth_guard_1.AuthGuard],
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', redirectTo: '' },
];
let AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                navbar_component_1.NavbarComponent,
                edit_component_1.EditComponent,
                new_component_1.NewComponent,
                details_component_1.DetailsComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                profile_component_1.ProfileComponent,
                edit_profile_component_1.EditProfileComponent,
                admin_component_1.AdminComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes),
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_1.TokenInterceptor,
                    multi: true,
                },
            ],
            bootstrap: [app_component_1.AppComponent],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = _classThis = class {
    };
    __setFunctionName(_classThis, "AppModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
})();
exports.AppModule = AppModule;
