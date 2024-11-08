const axios = require("axios");

class KongMergeUserInOrder {
  constructor(config) {
    this.config = config;
  }

  async response(kong) {
    console.log("Starting custom plugin execution");

    // Get the original response body
    const rawBody = await kong.service.response.getRawBody();
    const body = JSON.parse(rawBody.toString());

    console.log("Original body:", body);

    // Retrieve the request scheme, host, and port
    const scheme = await kong.request.getScheme();
    const hostname = await kong.request.getHost();
    const port = await kong.request.getPort();

    const userUrl = `${scheme}://${hostname}:${port}/auth/users/${body.userId}`;
    console.log("Fetching user data from:", userUrl);

    try {
      // Make the request to fetch the user data
      const userResponse = await axios.get(userUrl, {
        headers: {
          Authorization: "KOKO",
        },
      });

      // Add the user data to the response body
      body.user = userResponse.data;
      console.log("Updated body with user data:", body);

      // Set the modified body as the response
      await kong.response.exit(
        await kong.response.getStatus(),
        JSON.stringify(body),
        {
          ["Content-Type"]: "application/json",
        }
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Respond with an error if fetching user data fails
      await kong.response.exit(500, "Failed to fetch user data");
    }
  }
}

module.exports = {
  Plugin: KongMergeUserInOrder,
  Name: "merge-user-in-orders",
  Schema: [],
  Version: "0.1.0",
  Priority: 0,
};
