import { useEffect } from "react";
import React from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import axios from "axios";

function Home() {
  const [csrf, setCsrf] = React.useState();
  const getToken = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/users/guest-token"
    );
    const tokens = await response.data;
    setCsrf(tokens.csrfToken);
    console.log("response headers", response);
    return tokens.token;
  };

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: "a2bf6189-3c5e-446f-bb93-555bfba93d94", // given by the Superset embedding UI
        supersetDomain: "https://superset.acruxtek.net/",
        mountPoint: document.getElementById("dashboard"), // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
        },
        filters: {
          expanded: true,
        },
        headers: {
          "X-CSRF-TOKEN": csrf,
        },
      });
    };
    if (document.getElementById("dashboard")) {
      embed();
    }
  }, []);

  return (
    <div className="App">
      <h1>Superset Dashboard </h1>
      <div style={{ width: "800px", height: "800px" }} id="dashboard" />
    </div>
  );
}

export default Home;
