import jwt from 'jsonwebtoken';

export function verifyToken(request, response, next) {
    // read the token value from request header : Authorization
    const authHeader = request.get('Authorization'); // this get() will return the data for the mentioned header name
    // check if value is existing or not 
    if (authHeader) {
        // "Bearer ey6dsf77345345.df634dfgdfg" the value for authHeader
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "hello123", (error, payload) => {
            if (error) {
                response.status(401).json({ message: 'Unauthorized Access. Token is invalid' });
            }
            else {
                request.user = payload;
                next();
            }
        });

    }
    else {
        // when authHeader is not available
        response.status(401).json({ message: 'Unauthorized Access. Token is missing' });
    }  
}