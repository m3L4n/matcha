class authContrroller {
  static handleConnectionDiscord = async (req, res) => {
    const params = new URLSearchParams();
    const code = req.query.code;
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("scope", "identify, email");
    params.append("redirect_uri", process.env.REDIRECT_URL);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: params,
      };
      const response = await fetch("https://discord.com/api/oauth2/token", options);
      const responseJSON = await response.json();
      const { access_token, token_type } = responseJSON;
      const options1 = {
        method: "GET",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          authorization: `${token_type} ${access_token}`,
        },
      };
      const userDataResponse = await fetch("https://discord.com/api/users/@me", options1);
      const userDataResponseJSON = await userDataResponse.json();
      // if deja dans la db de auth on cree un new username etc et on le transverse dans la db user avec discord true et sans
      // enregister le user dans la db mettre discord a true
      //
      return res.status(200).redirect("http://localhost:3000/login");
    } catch (error) {
      return res.status(404).json({ status: 404, msg: "cant connect with discord" });
    }
  };
  static handleConnexion = async (req, res) => {
    //      const params = new URLSearchParams();
    //   const code = req.query.code;
    //   params.append("client_id", process.env.CLIENT_ID);
    //   params.append("client_secret", process.env.CLIENT_SECRET);
    //   params.append("grant_type", "authorization_code");
    //   params.append("code", code);
    //   params.append("scope", "identify, email");
    //   params.append("redirect_uri", process.env.REDIRECT_URL);
    //   try {
    //     const options = {
    //       method: "POST",
    //       headers: {
    //         "Content-type": "application/x-www-form-urlencoded",
    //       },
    //       body: params,
    //     };
    //     console.log(params);
    //     const response = await fetch("https://discord.com/api/oauth2/token", options);
    //     const responseJSON = await response.json();
    //     console.log(" coucou c'est la response test", responseJSON);
    //     const { access_token, token_type } = responseJSON;
    //     const options1 = {
    //       method: "GET",
    //       headers: {
    //         "Content-type": "application/x-www-form-urlencoded",
    //         authorization: `${token_type} ${access_token}`,
    //       },
    //     };
    //     const userDataResponse = await fetch("https://discord.com/api/users/@me", options1);
    //     const userDataResponseJSON = await userDataResponse.json();
  };
}
module.exports = {
  authContrroller,
};
