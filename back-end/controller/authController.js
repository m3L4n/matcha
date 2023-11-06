class authContrroller {
  static handleConnectionDiscord = async (req, res) => {
    const params = new URLSearchParams();
    const code = req.query.code;
    params.append("client_id", process.env.CLIENT_ID);
    params.append("client_secret", process.env.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URL);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: params,
      };
      const options1 = {
        method: "GET",
        headers: {
          authorization: `${token_type} ${access_token}`,
        },
      };
      const response = await fetch("https://discord.com/api/oauth2/token", options);
      const { access_token, token_type } = response.data;
      const userDataResponse = await fetch("https://discord.com/api/users/@me", options);
      console.log("Data: ", userDataResponse.data);
      console.log(response);
    } catch (error) {}
  };
}
module.exports = {
  authContrroller,
};
