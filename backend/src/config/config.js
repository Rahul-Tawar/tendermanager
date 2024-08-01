export default {
    secret: process.env.JWT_SECRET || 'default_secret',
    port: process.env.PORT || 3000,
};