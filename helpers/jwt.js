import  jwt  from "jsonwebtoken";



const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY_JWT, { expiresIn: '2h' }, (error, token) => {

            if (error) {
                console.log(error);
                reject('Error al crear el token');
            } else {
                resolve(token);
            }

        });
    });
};


export { 
    generarJWT 
};