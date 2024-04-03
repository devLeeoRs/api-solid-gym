import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "src/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsUseCase;

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsUseCase(checkInsRepository);
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      userId: "user-01",
      gymId: "gym-01",
    });
    await checkInsRepository.create({
      userId: "user-01",
      gymId: "gym-02",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-01" }),
      expect.objectContaining({ gymId: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId: "user-01",
        gymId: `gym-${i}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" }),
    ]);
  });
});
