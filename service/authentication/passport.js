const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('config');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get("jwt").secret,
    issuer: 'localhost',
    audience: 'localhost'
}

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    
    return done(err, false)
    return done(null, user);
    return done(null, false);
}));