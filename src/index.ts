import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";
import { loadConfig } from "./config";

const config = loadConfig();

const stack = pulumi.getStack();

const backendImageName = "backend";
const frontendImageName = "frontend";
const databaseImageName = "mongoImage";

// Pull the backend image
const backend = new docker.RemoteImage(`${backendImageName}Image`, {
  // the name of the remote image to pull down
  name: "pulumi/tutorial-pulumi-fundamentals-backend:latest",
});

// Pull the frontend image
const frontend = new docker.RemoteImage(`${frontendImageName}Image`, {
  name: "pulumi/tutorial-pulumi-fundamentals-frontend:latest",
});

// Pull the MongoDB image
const mongoImage = new docker.RemoteImage(databaseImageName, {
  name: "pulumi/tutorial-pulumi-fundamentals-database-local:latest",
});

// Create a Docker network
const network = new docker.Network("network", {
  name: `services-${stack}`,
});

// Create the MongoDB container
const mongoContainer = new docker.Container("mongoContainer", {
  image: mongoImage.repoDigest,
  name: `mongo-${stack}`,
  ports: [
    {
      internal: config.mongoPort,
      external: config.mongoPort,
    },
  ],
  networksAdvanced: [
    {
      name: network.name,
      aliases: ["mongo"],
    },
  ],
});

// Create the backend container
const backendContainer = new docker.Container(
  "backendContainer",
  {
    name: `backend-${stack}`,
    image: backend.repoDigest,
    ports: [
      {
        internal: config.backendPort,
        external: config.backendPort,
      },
    ],
    envs: [
      `DATABASE_HOST=${config.mongoHost}`,
      `DATABASE_NAME=${config.database}`,
      `NODE_ENV=${config.nodeEnvironment}`,
    ],
    networksAdvanced: [
      {
        name: network.name,
      },
    ],
  },
  { dependsOn: [mongoContainer] }
);

// Create the frontend container
const frontendContainer = new docker.Container("frontendContainer", {
  image: frontend.repoDigest,
  name: `frontend-${stack}`,
  ports: [
    {
      internal: config.frontendPort,
      external: config.frontendPort,
    },
  ],
  envs: [
    `PORT=${config.frontendPort}`,
    `HTTP_PROXY=backend-${stack}:${config.backendPort}`,
    `PROXY_PROTOCOL=${config.protocol}`,
  ],
  networksAdvanced: [
    {
      name: network.name,
    },
  ],
});
