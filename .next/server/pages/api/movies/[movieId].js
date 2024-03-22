"use strict";
(() => {
var exports = {};
exports.id = 989;
exports.ids = [989];
exports.modules = {

/***/ 7414:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ prismadb)
});

;// CONCATENATED MODULE: external "@prisma/client"
const client_namespaceObject = require("@prisma/client");
;// CONCATENATED MODULE: ./lib/prismadb.ts

const client = global.prismadb || new client_namespaceObject.PrismaClient();
if (true) global.prismadb = client;
/* harmony default export */ const prismadb = (client);


/***/ }),

/***/ 3983:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ lib_serverAuth)
});

;// CONCATENATED MODULE: external "next-auth/react"
const react_namespaceObject = require("next-auth/react");
// EXTERNAL MODULE: ./lib/prismadb.ts + 1 modules
var prismadb = __webpack_require__(7414);
;// CONCATENATED MODULE: ./lib/serverAuth.ts


const serverAuth = async (req)=>{
    const session = await (0,react_namespaceObject.getSession)({
        req
    });
    if (!session?.user?.email) {
        throw new Error("Not signed in");
    }
    const currentUser = await prismadb/* default.user.findUnique */.Z.user.findUnique({
        where: {
            email: session.user.email
        }
    });
    if (!currentUser) {
        throw new Error("Not signed in");
    }
    return {
        currentUser
    };
};
/* harmony default export */ const lib_serverAuth = (serverAuth);


/***/ }),

/***/ 3523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_prismadb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7414);
/* harmony import */ var _lib_serverAuth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3983);


async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        await (0,_lib_serverAuth__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(req);
        const { movieId  } = req.query;
        if (typeof movieId !== "string") {
            throw new Error("Invalid ID");
        }
        if (!movieId) {
            throw new Error("Invalid ID");
        }
        const movie = await _lib_prismadb__WEBPACK_IMPORTED_MODULE_0__/* ["default"].movie.findUnique */ .Z.movie.findUnique({
            where: {
                id: movieId
            }
        });
        if (!movie) {
            throw new Error("Invalid ID");
        }
        return res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3523));
module.exports = __webpack_exports__;

})();