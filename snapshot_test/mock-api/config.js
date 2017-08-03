module.exports = {
  authUnless: {
    path: [
      { url: '/api/v1/plans', methods: ['GET'] },
      { url: '/api/v1/transactions', methods: ['GET'] },
      { url: '/api/v1/users/sign_in', methods: ['POST'] },
      { url: '/api/v1/users/sign_up', methods: ['POST'] },
      { url: '/api/v1/password/forgot_password', methods: ['GET'] },
      { url: '/api/v1/password/token_verification', methods: ['GET'] }
    ],
  },
};
