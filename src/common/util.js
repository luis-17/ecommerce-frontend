/* eslint-disable */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ServerError extends Error {
    constructor(e) {
        if (e.response) {
            if (e.response.data) {
                super(e.response.data.message);
                this.data = e.response.data.data;
            }
            else {
                super(e.message);
            }
            this.status = e.response.status;
        }
        else {
            super(e.message);
            this.status = 500;
        }
        this.name = 'ServerError';
        this.type = `${this.status}`.startsWith('4') ? 'warning' : 'error';
    }
}
export function mapTaco(actions) {
    const mappings = {};
    for (const [action, option] of Object.entries(actions)) {
        mappings[action] = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const self = this;
                const isValid = yield self.$validator.validateAll(option.form);
                if (isValid) {
                    try {
                        self.$wait.start(option.waiter);
                        return yield option.action.apply(this, args);
                    }
                    catch (e) {
                        if (e instanceof ServerError) {
                            self.$swal({ type: e.type, text: e.message });
                            if (e.status === 403) {
                                self.$router.push({ name: option.fv });
                            }
                        }
                        else {
                            throw e;
                        }
                    }
                    finally {
                        self.$wait.end(option.waiter);
                    }
                }
                return option.rwf;
            });
        };
    }
    return mappings;
}

