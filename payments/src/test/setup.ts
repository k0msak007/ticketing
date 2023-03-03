import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest"
import { app } from "../app";
import jwt from 'jsonwebtoken'

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper.ts')

process.env.STRIPE_KEY = "sk_test_51LeAmnEkbdIGrWpaQ7cKS1xU393IdlpO2Cg8mp7yTLQcwPhUdqOjttsxVSCzCjGbGCpQe9uSSMTAFdIjo4VDbHrQ00vnSfrD84"

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = "komsak007"

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // console.log(base64);

  return [`jwt=${token}; Path=/`]
}
