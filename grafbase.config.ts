import { auth, connector, config, graph } from "@grafbase/sdk";

const g = graph.Standalone();

const pg = connector.Postgres("Postgres", {
  url: g.env("DATABASE_URL"),
});

g.datasource(pg);

const provider = auth.OpenIDConnect({
  issuer: g.env("DESCOPE_ISSUER_URL"),
});

export default config({
  graph: g,
  auth: {
    providers: [provider],
    rules: (rules) => {
      rules.private();
    },
  },
});
