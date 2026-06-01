// import { asynchandler } from "../utils/asynchandler.js";

// const registerUser = asynchandler(async (req, res) => {
//     console.log("BODY:", req.body);

//     return res.status(200).json({
//         success: true,
//         message: "Route working"
//     });
// });

// export { registerUser };

// import { asynchandler } from "../utils/asynchandler.js";

// const registerUser = asynchandler(async (req, res) => {
//     console.log("BODY:", req.body);
    
//     // Destructure with correct property names
//     const { username, email, fullname, avatar, password } = req.body;

//     // Validate that fields exist
//     if (!username || !email || !fullname || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields are required"
//         });
//     }

//     return res.status(200).json({
//         success: true,
//         message: "Route working",
//         data: { username, email, fullname, avatar, password }
//     });
// });

// export { registerUser };

// const registerUser = asynchandler(async(req, res) => {
//     res.status(200).json({
//         message: "ok"
//     })
// })


// export {registerUser}
import { asynchandler } from "../utils/asynchandler.js";

const registerUser = asynchandler(async (req, res) => {
    res.status(200).json({
        message: "chai aur code"
    });
});

export { registerUser };