import fetch from "isomorphic-unfetch";
import { response } from "express";

export default async (req, res) => {
  const {
    query: { route },
  } = req;

  try {
    // construct the request to WMATA
    const apiKey = process.env.WMATA_API_KEY;

    // send request to WMATA
    // note - double awaits were important
    const route_response = await fetch(
      `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`
    );
    const response_data = await route_response.json();

    res.json(response_data);
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
