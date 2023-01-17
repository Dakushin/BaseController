"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_auto_increment_ts_1 = require("mongoose-auto-increment-ts");
var BaseController = /** @class */ (function () {
    function BaseController(model) {
        var _this = this;
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currentmodel.find()
                            .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getbyId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currentmodel.findOne({ id: Number(req.params.id) })
                            .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.getbyAttribute = function (ForcedFilter) { return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var params, reqtab, schematab, isMatching;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        reqtab = Object.keys(req.query);
                        schematab = Object.keys(this.currentmodel.schema.paths);
                        isMatching = schematab.filter(function (val) { return reqtab.includes(val); });
                        if (!(isMatching.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.status(500).json("No matching keys")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        isMatching.every(function (key) {
                            params[key] = req.query[key];
                        });
                        if (ForcedFilter) {
                            Object.keys(ForcedFilter).every(function (key) {
                                params[key] = ForcedFilter[key];
                            });
                        }
                        return [4 /*yield*/, this.currentmodel.find(params)
                                .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }; };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var creation, reqtab, schematab, isMatching, index, _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        creation = {};
                        reqtab = Object.keys(req.body);
                        console.log(reqtab);
                        schematab = Object.keys(this.currentmodel.schema.paths);
                        console.log(schematab);
                        isMatching = schematab.filter(function (val) { return reqtab.includes(val); });
                        if (!(isMatching.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.status(500).json("No matching keys")];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                    case 2:
                        if (!schematab.includes("id")) return [3 /*break*/, 4];
                        index = isMatching.indexOf("id", 0);
                        if (index > -1) {
                            isMatching.splice(index, 1);
                        }
                        _a = creation;
                        _b = 'id';
                        return [4 /*yield*/, (0, mongoose_auto_increment_ts_1.Increment)(String(this.currentmodel.baseModelName))];
                    case 3:
                        _a[_b] = _c.sent();
                        _c.label = 4;
                    case 4:
                        console.log(isMatching);
                        isMatching.every(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                console.log(key);
                                creation[key] = req.body[key];
                                return [2 /*return*/];
                            });
                        }); });
                        console.log(creation);
                        return [4 /*yield*/, this.currentmodel.create(creation)
                                .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.compare = function (FindingField, FieldsToCompare) { return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var reqtab, schematab, isMatching, haveFindingKey, haveFieldToCompare, findingparams, find, good;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqtab = Object.keys(req.query);
                        schematab = Object.keys(this.currentmodel.schema.paths);
                        isMatching = schematab.filter(function (val) { return reqtab.includes(val); });
                        if (!(isMatching.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.status(500).json("No matching keys")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        haveFindingKey = isMatching.filter(function (val) { return FindingField.includes(val); });
                        if (!(haveFindingKey.length == 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, res.status(500).json("no Finding key corresponding")];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        haveFieldToCompare = isMatching.filter(function (val) { return FieldsToCompare.includes(val); });
                        if (!(haveFieldToCompare.length == 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, res.status(500).json("no Field to compare corresponding")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        findingparams = {};
                        haveFindingKey.every(function (key) {
                            findingparams[key] = req.query[key];
                        });
                        return [4 /*yield*/, this.currentmodel.findOne(findingparams)];
                    case 7:
                        find = _a.sent();
                        console.log(find);
                        good = false;
                        if (find) {
                            isMatching.every(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (FieldsToCompare.includes(key)) {
                                        good = req.query[key] == find[key];
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        if (good) {
                            res.status(200).json(find);
                        }
                        else {
                            res.status(500).json('no good');
                        }
                        return [2 /*return*/];
                }
            });
        }); }; };
        this.deletebyId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.currentmodel.deleteOne({ id: Number(req.params.id) })
                            .then(function (ret) { return res.status(200).json({ ret: ret }); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.deleteAllbyParam = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var params, reqtab, schematab, isMatching;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        reqtab = Object.keys(req.query);
                        schematab = Object.keys(this.currentmodel.schema.paths);
                        isMatching = schematab.filter(function (val) { return reqtab.includes(val); });
                        if (!(isMatching.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.status(500).json("No matching keys")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        isMatching.every(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                params[key] = req.query[key];
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, this.currentmodel.deleteMany(params)
                                .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.modify = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var params, id, reqtab, schematab, isMatching;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        id = req.params;
                        reqtab = Object.keys(req.body);
                        schematab = Object.keys(this.currentmodel.schema.paths);
                        isMatching = schematab.filter(function (val) { return reqtab.includes(val); });
                        if (!(isMatching.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, res.status(500).json("No matching keys")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        isMatching.every(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                params[key] = req.query[key];
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, this.currentmodel.findOneAndUpdate(id, params)
                                .then(function (ret) { return res.status(200).json(ret); })["catch"](function (error) { return res.status(500).json({ error: error }); })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.currentmodel = model;
    }
    return BaseController;
}());
exports["default"] = BaseController;
