import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initPassport = () => {
	passport.use(
		"jwt",
		new JWTStrategy(
			{
				jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
				secretOrKey: "coderhouse",
			},
			async (jwt_payload, done) => {
				try {
					return done(null, jwt_payload);
				} catch (error) {
					return done(null, error);
				}
			}
		)
	);
};

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["coderCookie"];
	}
	return token;
};

export default initPassport;
