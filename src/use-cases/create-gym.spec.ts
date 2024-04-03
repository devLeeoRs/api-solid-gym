import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should to create gym", async () => {
    const { gym } = await sut.execute({
      title: "gym-01",
      description: "gym-description",
      phone: "9999999",
      latitude: -9.8595235,
      longitude: -51.4589685,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
