"use strict";
(() => {
var exports = {};
exports.id = 972;
exports.ids = [972];
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

/***/ 8746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
// EXTERNAL MODULE: ./lib/prismadb.ts + 1 modules
var prismadb = __webpack_require__(7414);
// EXTERNAL MODULE: ./lib/serverAuth.ts + 1 modules
var serverAuth = __webpack_require__(3983);
;// CONCATENATED MODULE: ./pages/api/favorite.ts



async function handler(req, res) {
    try {
        if (req.method === "POST") {
            const { currentUser  } = await (0,serverAuth/* default */.Z)(req);
            const { movieId  } = req.body;
            const existingMovie = await prismadb/* default.movie.findUnique */.Z.movie.findUnique({
                where: {
                    id: movieId
                }
            });
            if (!existingMovie) {
                throw new Error("Invalid ID");
            }
            const user = await prismadb/* default.user.update */.Z.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });
            return res.status(200).json(user);
        }
        if (req.method === "DELETE") {
            const { currentUser  } = await (0,serverAuth/* default */.Z)(req);
            const { movieId  } = req.body;
            const existingMovie = await prismadb/* default.movie.findUnique */.Z.movie.findUnique({
                where: {
                    id: movieId
                }
            });
            if (!existingMovie) {
                throw new Error("Invalid ID");
            }
            const updatedFavoriteIds = (0,external_lodash_namespaceObject.without)(currentUser.favoriteIds, movieId);
            const updateUser = await prismadb/* default.user.update */.Z.user.update({
                where: {
                    email: currentUser.email || ""
                },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            });
            return res.status(200).json(updateUser);
        }
        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8746));
module.exports = __webpack_exports__;

})();